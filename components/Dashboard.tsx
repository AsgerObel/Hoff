import React, { useState, useMemo } from 'react';
import { ProjectTask, User, ProjectStatus } from '../types';
import ProjectCard from './ProjectCard';
import AddProjectModal from './AddProjectModal';
import { ArrowDownUp, Search, X, Bell, Square, Grid2x2, LayoutGrid, Plus } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface Notification {
  id: string;
  type: 'COMMENT' | 'STATUS' | 'ASSET';
  taskId: string;
  taskTitle: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface DashboardProps {
  title: string;
  tasks: ProjectTask[];
  currentUser: User;
  onAddComment: (taskId: string, text: string, attachments?: string[]) => void;
  onApprove: (taskId: string) => void;
  onUndoApprove: (taskId: string) => void;
  onFocusTask: (taskId: string) => void;
  onAddProject?: (data: { title: string; category: string; figmaUrl: string }) => void;
}

type SortOrder = 'NEWEST' | 'OLDEST';

const Dashboard: React.FC<DashboardProps> = ({ title, tasks, currentUser, onAddComment, onApprove, onUndoApprove, onFocusTask, onAddProject }) => {
  const [filter, setFilter] = useState<ProjectStatus | 'ALL'>('ALL');
  const [gridCols, setGridCols] = useState<1 | 2 | 4>(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>('NEWEST');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [readNotificationIds, setReadNotificationIds] = useState<Set<string>>(new Set());
  const [initialized, setInitialized] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const { darkMode } = useTheme();

  // Theme classes
  const bgColor = darkMode ? 'bg-[#1b1b1b]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-white/20' : 'border-[#EBE9E9]';
  const inputBgColor = darkMode ? 'bg-[#2a2a2a]' : 'bg-white';
  const inputBorderColor = darkMode ? 'border-white/20' : 'border-black';
  const controlHover = darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-50';
  const activeButton = darkMode ? 'bg-white text-black' : 'bg-black text-white';
  const inactiveButton = darkMode ? 'bg-[#1b1b1b] text-white border-white/20 hover:bg-white/10' : 'bg-white text-black border-black hover:bg-[#EBE9E9]';

  // Derive notifications from tasks (Mock logic for demo)
  const notifications: Notification[] = useMemo(() => {
    const notifs: Notification[] = [];
    
    tasks.forEach(task => {
        // Mock: Latest comment is a notification
        if (task.comments.length > 0) {
            const lastComment = task.comments[task.comments.length - 1];
            const notifId = `n-c-${lastComment.id}`;
            // Only show if not from current user (simulated)
            if (lastComment.userId !== currentUser.id) {
                notifs.push({
                    id: notifId,
                    type: 'COMMENT',
                    taskId: task.id,
                    taskTitle: task.title,
                    message: `Ny kommentar: "${lastComment.text.substring(0, 40)}${lastComment.text.length > 40 ? '...' : ''}"`,
                    timestamp: lastComment.timestamp,
                    isRead: readNotificationIds.has(notifId)
                });
            }
        }
        
        // Mock: If status is PENDING, show "Ready for review"
        if (task.status === ProjectStatus.PENDING) {
             const notifId = `n-s-${task.id}`;
             notifs.push({
                id: notifId,
                type: 'STATUS',
                taskId: task.id,
                taskTitle: task.title,
                message: 'Opgaven venter på din godkendelse',
                timestamp: task.lastUpdated,
                isRead: readNotificationIds.has(notifId)
            });
        }
    });

    const sortedNotifs = notifs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);
    
    // Pre-mark items as read for demo (Keep only top 2 unread)
    if (!initialized && sortedNotifs.length > 2) {
        const idsToMarkRead = sortedNotifs.slice(2).map(n => n.id);
        setReadNotificationIds(new Set(idsToMarkRead));
        setInitialized(true);
    }

    return sortedNotifs;
  }, [tasks, currentUser.id, readNotificationIds, initialized]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setReadNotificationIds(prev => new Set(prev).add(id));
  };

  const markAllAsRead = () => {
    const allIds = notifications.map(n => n.id);
    setReadNotificationIds(prev => {
        const next = new Set(prev);
        allIds.forEach(id => next.add(id));
        return next;
    });
  };

  // Filter then Sort
    const filteredAndSortedTasks = tasks
        .filter(t => {
            const matchesStatus = filter === 'ALL' || t.status === filter;
            const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesSearch;
        })
        .sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === 'NEWEST' ? dateB - dateA : dateA - dateB;
        });

    const toggleSort = () => {
    setSortOrder(prev => prev === 'NEWEST' ? 'OLDEST' : 'NEWEST');
  };

  return (
    <div className={`w-full relative ${textColor} transition-colors duration-300`}>
      
      {/* Header Area 
          Calculated Height for Alignment:
          Sidebar Header (128px) + Dashboard NavItem (77px) = 205px Total Top Offset.
          Sticky Bar Content is approx 95px high.
          Header Height = 205px - 95px = 110px to align borders.
      */}
      <div className={`w-full`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 pt-8 md:pt-0 mb-0 flex flex-col justify-end md:h-[110px]">
            <div className="md:pb-4 text-center md:text-left flex items-center justify-between relative">
                <h1 className="text-4xl md:text-5xl font-black uppercase mb-2 md:mb-0 tracking-[-0.05em] leading-none">
                {title}
                </h1>
            </div>
        </div>
      </div>

      {/* Sticky Controls & Filters - Full Width Background */}
      <div className={`sticky top-0 z-40 ${bgColor} border-b ${borderColor} transition-colors duration-300`}>
        {/* Changed items-center to items-end for bottom alignment */}
        <div className={`mx-auto py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 transition-all duration-500 ease-in-out ${gridCols === 1 ? 'max-w-[1600px] px-4 md:px-12' : 'max-w-[1600px] px-4 md:px-12'}`}>
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 md:gap-2">
            <FilterButton 
                label="Alle Opgaver" 
                active={filter === 'ALL'} 
                onClick={() => setFilter('ALL')} 
                darkMode={darkMode}
            />
            <FilterButton 
                label="Afventer Dig" 
                status={ProjectStatus.PENDING}
                active={filter === ProjectStatus.PENDING} 
                onClick={() => setFilter(ProjectStatus.PENDING)} 
                darkMode={darkMode}
            />
            <FilterButton 
                label="Igangværende" 
                status={ProjectStatus.IN_PROGRESS}
                active={filter === ProjectStatus.IN_PROGRESS} 
                onClick={() => setFilter(ProjectStatus.IN_PROGRESS)} 
                darkMode={darkMode}
            />
            <FilterButton 
                label="Godkendt" 
                status={ProjectStatus.APPROVED}
                active={filter === ProjectStatus.APPROVED} 
                onClick={() => setFilter(ProjectStatus.APPROVED)} 
                darkMode={darkMode}
            />
            </div>

            {/* Right Side: Search + Sort + Notifications + Grid Toggle */}
            <div className="relative flex items-center gap-2 self-end md:self-auto w-full md:w-auto justify-end z-50">
                {/* Search Input */}
                <div className="relative group flex items-stretch">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors flex items-center h-full pointer-events-none z-10">
                        <Search size={14} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="SØG..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-[110px] md:w-[130px] pl-8 pr-6 h-9 border ${inputBorderColor} ${inputBgColor} text-[10px] font-bold uppercase placeholder-gray-400 focus:outline-none transition-colors tracking-[-0.05em] ${darkMode ? 'text-white focus:bg-[#333]' : 'text-black focus:bg-gray-50'}`}
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors flex items-center h-full"
                        >
                            <X size={12} />
                        </button>
                    )}
                </div>

                {/* View Toggles */}
                <div className={`hidden md:flex ${bgColor} border ${inputBorderColor} h-9 items-center`}>
                    <button 
                        onClick={() => setGridCols(1)}
                        className={`px-2.5 h-full flex items-center justify-center transition-colors ${gridCols === 1 ? activeButton : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black')}`}
                        title="Enkeltvisning"
                    >
                        <Square size={14} />
                    </button>
                    <button 
                        onClick={() => setGridCols(2)}
                        className={`px-2.5 h-full flex items-center justify-center transition-colors ${gridCols === 2 ? activeButton : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black')}`}
                        title="2 kolonner"
                    >
                        <Grid2x2 size={14} />
                    </button>
                    <button 
                        onClick={() => setGridCols(4)}
                        className={`px-2.5 h-full flex items-center justify-center transition-colors ${gridCols === 4 ? activeButton : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black')}`}
                        title="4 kolonner"
                    >
                        <LayoutGrid size={14} />
                    </button>
                </div>

                {/* Sort Toggle */}
                <button 
                    onClick={toggleSort}
                    className={`flex items-center gap-2 px-3 h-9 border ${inputBorderColor} ${controlHover} transition-colors uppercase font-bold text-[10px] tracking-[-0.05em] whitespace-nowrap`}
                >
                    <ArrowDownUp size={14} />
                    <span className="hidden sm:inline">{sortOrder === 'NEWEST' ? 'Nyeste' : 'Ældste'}</span>
                </button>

                {/* Notification Bell */}
                <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`flex items-center justify-center px-3 h-9 border ${inputBorderColor} ${controlHover} transition-colors relative active:scale-95 duration-100 cursor-pointer z-[60]`}
                >
                    <Bell size={16} className={textColor} />
                    {unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF3B30] text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">
                            {unreadCount}
                        </div>
                    )}
                </button>

                {/* Dropdown Panel */}
                {showNotifications && (
                    <>
                        <div className="fixed inset-0 z-40 bg-transparent cursor-default" onClick={() => setShowNotifications(false)} />
                        
                        <div className={`absolute top-full mt-2 w-full left-0 ${bgColor} border ${inputBorderColor} z-50 animate-in slide-in-from-top-2 fade-in duration-200 origin-top cursor-default`}>
                            <div className={`p-4 border-b ${borderColor} ${darkMode ? 'bg-white text-black' : 'bg-black text-white'} flex justify-between items-center`}>
                                <h3 className="font-bold uppercase tracking-[-0.05em] text-sm">Notifikationer</h3>
                                <span className="text-xs text-gray-400">{unreadCount} Nye</span>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notif) => (
                                        <div 
                                            key={notif.id}
                                            onClick={() => {
                                                markAsRead(notif.id);
                                                onFocusTask(notif.taskId);
                                                setShowNotifications(false);
                                            }}
                                            className={`p-5 border-b ${borderColor} cursor-pointer transition-colors flex flex-col gap-3 group ${notif.isRead ? `${bgColor} ${darkMode ? 'hover:bg-white/5' : 'hover:bg-[#F9F9F9]'} opacity-60` : `${bgColor} ${darkMode ? 'hover:bg-white/5' : 'hover:bg-[#F9F9F9]'}`}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                                        {notif.type === 'COMMENT' ? 'NY KOMMENTAR' : 
                                                         notif.type === 'STATUS' ? 'STATUS OPDATERING' : 
                                                         'NYT MATERIALE'}
                                                    </span>
                                                    <span className={`font-black text-base uppercase tracking-[-0.05em] ${notif.isRead ? 'text-gray-500' : textColor}`}>{notif.taskTitle}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                                        {new Date(notif.timestamp).toLocaleDateString('da-DK', { day: 'numeric', month: 'short' }).replace('.', '')}
                                                    </span>
                                                    {!notif.isRead && (
                                                        <div className="w-2.5 h-2.5 bg-[#FF3B30]"></div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <p className={`text-sm leading-relaxed mt-1 ${notif.isRead ? 'text-gray-400' : `${textColor} font-medium`}`}>
                                                {notif.message}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-400 text-xs uppercase font-medium">
                                        Ingen nye notifikationer
                                    </div>
                                )}
                            </div>
                            <div className={`p-3 ${darkMode ? 'bg-[#2a2a2a]' : 'bg-[#F9F9F9]'} text-center border-t ${borderColor}`}>
                                <button 
                                    onClick={markAllAsRead}
                                    className={`text-[10px] font-bold uppercase tracking-wide text-gray-500 hover:${textColor} transition-colors`}
                                >
                                    Marker alle som læst
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
      </div>

      {/* Grid Content - With Padding */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-12">
        <div className={`grid pb-24 transition-all duration-500 ease-in-out ${
            gridCols === 1 ? 'grid-cols-1 max-w-[1600px] gap-40' : 
            gridCols === 2 ? 'grid-cols-1 lg:grid-cols-2 gap-y-20 gap-x-8' : 
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
        }`}>
            {/* Add Project Card */}
            {onAddProject && (
              <AddProjectCard 
                onClick={() => setShowAddModal(true)} 
                viewMode={gridCols === 1 ? 'single' : gridCols === 4 ? 'compact' : 'grid'}
                darkMode={darkMode}
              />
            )}
            
            {filteredAndSortedTasks.map(task => (
            <ProjectCard 
                key={task.id} 
                task={task} 
                currentUser={currentUser}
                onAddComment={onAddComment}
                onApprove={onApprove}
                onUndoApprove={onUndoApprove}
                onExpand={() => onFocusTask(task.id)}
                viewMode={gridCols === 1 ? 'single' : gridCols === 4 ? 'compact' : 'grid'}
            />
            ))}
        </div>
        
        {filteredAndSortedTasks.length === 0 && !onAddProject && (
            <div className="text-center py-24 text-gray-400">
                <p className="text-2xl font-bold uppercase tracking-[-0.05em]">Ingen opgaver fundet</p>
                {searchQuery && (
                    <p className="text-sm mt-2">Prøv en anden søgning eller nulstil filtre.</p>
                )}
            </div>
        )}
      </div>

      {/* Add Project Modal */}
      {onAddProject && (
        <AddProjectModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={onAddProject}
        />
      )}
    </div>
  );
};

const FilterButton: React.FC<{ 
  label: string; 
  active: boolean; 
  onClick: () => void;
  status?: ProjectStatus;
  darkMode: boolean;
}> = ({ label, active, onClick, status, darkMode }) => {
    let baseClasses = "px-3 py-1.5 md:px-4 md:py-2 font-bold uppercase text-[10px] md:text-xs transition-all border tracking-[-0.05em]";
    
    // Determine active styling based on status
    let activeStyle = darkMode ? "bg-white text-black border-white" : "bg-black text-white border-black"; // Default (All)
    if (status === ProjectStatus.PENDING) activeStyle = "bg-[#FF3B30] text-white border-[#FF3B30]";
    if (status === ProjectStatus.IN_PROGRESS) activeStyle = "bg-[#FFCC00] text-black border-[#FFCC00]";
    if (status === ProjectStatus.APPROVED) activeStyle = "bg-[#34C759] text-white border-[#34C759]";

    // Active classes
    let activeClasses = `${activeStyle}`;
    
    // Inactive classes
    let inactiveClasses = darkMode 
        ? "bg-[#1b1b1b] text-white border-white/20 hover:bg-white/10" 
        : "bg-white text-black border-black hover:bg-[#EBE9E9] transition-colors";

    return (
        <button 
            onClick={onClick}
            className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
        >
            {label}
        </button>
    );
}

// Add Project Card Component
const AddProjectCard: React.FC<{ 
  onClick: () => void;
  viewMode: 'single' | 'grid' | 'compact';
  darkMode: boolean;
}> = ({ onClick, viewMode, darkMode }) => {
  const heightClass = viewMode === 'single' ? 'h-[calc(100vh-320px)] min-h-[450px]' :
                      viewMode === 'compact' ? 'h-[250px]' :
                      'h-[480px]';

  return (
    <button
      onClick={onClick}
      className={`border-2 border-dashed ${darkMode ? 'border-gray-700 bg-[#2a2a2a] hover:border-white hover:bg-[#333]' : 'border-gray-300 bg-[#F9F9F9] hover:border-black hover:bg-white'} flex flex-col items-center justify-center ${heightClass} group relative transition-all duration-300 cursor-pointer`}
    >
      <div className={`flex flex-col items-center gap-4 ${darkMode ? 'text-gray-500 group-hover:text-white' : 'text-gray-400 group-hover:text-black'} transition-colors`}>
        <div className="w-16 h-16 border-2 border-dashed border-current rounded-full flex items-center justify-center group-hover:border-solid transition-all">
          <Plus size={32} className="transition-transform group-hover:scale-110" />
        </div>
        <div className="text-center">
          <p className="font-bold uppercase tracking-[-0.05em] text-sm">Tilføj Projekt</p>
          <p className="text-xs mt-1 font-medium">Klik for at oprette</p>
        </div>
      </div>
    </button>
  );
}

export default Dashboard;
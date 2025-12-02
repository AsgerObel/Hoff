
import React, { useState, useMemo } from 'react';
import { ProjectTask, User, ProjectStatus } from '../types';
import ProjectCard from './ProjectCard';
import { ArrowDownUp, Search, X, Bell } from 'lucide-react';

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
}

type SortOrder = 'NEWEST' | 'OLDEST';

const Dashboard: React.FC<DashboardProps> = ({ title, tasks, currentUser, onAddComment, onApprove, onUndoApprove, onFocusTask }) => {
  const [filter, setFilter] = useState<ProjectStatus | 'ALL'>('ALL');
  const [sortOrder, setSortOrder] = useState<SortOrder>('NEWEST');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [readNotificationIds, setReadNotificationIds] = useState<Set<string>>(new Set());
  const [initialized, setInitialized] = useState(false);

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
    <div className="w-full relative">
      
      {/* Header Area 
          Calculated Height for Alignment:
          Sidebar Header (128px) + Dashboard NavItem (77px) = 205px Total Top Offset.
          Sticky Bar Content is approx 95px high.
          Header Height = 205px - 95px = 110px to align borders.
      */}
      <div className="bg-white w-full">
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 pt-8 md:pt-0 mb-0 flex flex-col justify-end md:h-[110px]">
            <div className="md:pb-4 text-center md:text-left flex items-center justify-between relative">
                <h1 className="text-4xl md:text-5xl font-black uppercase mb-2 md:mb-0 tracking-[-0.05em] leading-none">
                {title}
                </h1>
            </div>
        </div>
      </div>

      {/* Sticky Controls & Filters - Full Width Background */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#EBE9E9]">
        {/* Changed items-center to items-end for bottom alignment */}
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 md:gap-4">
            <FilterButton 
                label="Alle Opgaver" 
                active={filter === 'ALL'} 
                onClick={() => setFilter('ALL')} 
            />
            <FilterButton 
                label="Afventer Dig" 
                status={ProjectStatus.PENDING}
                active={filter === ProjectStatus.PENDING} 
                onClick={() => setFilter(ProjectStatus.PENDING)} 
            />
            <FilterButton 
                label="Igangværende" 
                status={ProjectStatus.IN_PROGRESS}
                active={filter === ProjectStatus.IN_PROGRESS} 
                onClick={() => setFilter(ProjectStatus.IN_PROGRESS)} 
            />
            <FilterButton 
                label="Godkendt" 
                status={ProjectStatus.APPROVED}
                active={filter === ProjectStatus.APPROVED} 
                onClick={() => setFilter(ProjectStatus.APPROVED)} 
            />
            </div>

            {/* Right Side: Search + Sort + Notifications */}
            <div className="relative flex items-center gap-2 self-end md:self-auto w-full md:w-auto justify-end z-50">
                {/* Search Input */}
                <div className="relative group w-full md:w-auto">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={12} />
                    <input 
                        type="text" 
                        placeholder="SØG PROJEKT..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-[180px] pl-8 pr-8 py-1.5 border border-black bg-white text-[10px] md:text-xs font-bold uppercase placeholder-gray-400 focus:outline-none focus:bg-gray-50 transition-colors tracking-[-0.05em]"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                        >
                            <X size={12} />
                        </button>
                    )}
                </div>

                {/* Sort Toggle */}
                <button 
                    onClick={toggleSort}
                    className="flex items-center gap-2 px-3 py-1.5 border border-black hover:bg-gray-50 transition-colors uppercase font-bold text-[10px] md:text-xs tracking-[-0.05em] whitespace-nowrap"
                >
                    <ArrowDownUp size={14} />
                    <span className="hidden sm:inline">{sortOrder === 'NEWEST' ? 'Nyeste Først' : 'Ældste Først'}</span>
                    <span className="sm:hidden">Sorter</span>
                </button>

                {/* Notification Bell */}
                <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="flex items-center justify-center px-3 py-1.5 border border-black hover:bg-gray-50 transition-colors relative active:scale-95 duration-100 cursor-pointer z-[60]"
                >
                    <Bell size={16} className="text-black" />
                    {unreadCount > 0 && (
                        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#FF3B30] text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">
                            {unreadCount}
                        </div>
                    )}
                </button>

                {/* Dropdown Panel - Now part of the container to align width */}
                {showNotifications && (
                    <>
                            {/* Backdrop - High Z-Index to capture clicks */}
                        <div className="fixed inset-0 z-40 bg-transparent cursor-default" onClick={() => setShowNotifications(false)} />
                        
                        <div className="absolute top-full mt-2 w-full left-0 bg-white border border-black z-50 animate-in slide-in-from-top-2 fade-in duration-200 origin-top cursor-default">
                            <div className="p-4 border-b border-[#EBE9E9] bg-black text-white flex justify-between items-center">
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
                                            className={`p-5 border-b border-[#EBE9E9] cursor-pointer transition-colors flex flex-col gap-3 group ${notif.isRead ? 'bg-white hover:bg-[#F9F9F9] opacity-60' : 'bg-white hover:bg-[#F9F9F9]'}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                                        {notif.type === 'COMMENT' ? 'NY KOMMENTAR' : 
                                                         notif.type === 'STATUS' ? 'STATUS OPDATERING' : 
                                                         'NYT MATERIALE'}
                                                    </span>
                                                    <span className={`font-black text-base uppercase tracking-[-0.05em] ${notif.isRead ? 'text-gray-500' : 'text-black'}`}>{notif.taskTitle}</span>
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
                                            
                                            <p className={`text-sm leading-relaxed mt-1 ${notif.isRead ? 'text-gray-400' : 'text-black font-medium'}`}>
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
                            <div className="p-3 bg-[#F9F9F9] text-center border-t border-[#EBE9E9]">
                                <button 
                                    onClick={markAllAsRead}
                                    className="text-[10px] font-bold uppercase tracking-wide text-gray-500 hover:text-black transition-colors"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 pb-24">
            {filteredAndSortedTasks.map(task => (
            <ProjectCard 
                key={task.id} 
                task={task} 
                currentUser={currentUser}
                onAddComment={onAddComment}
                onApprove={onApprove}
                onUndoApprove={onUndoApprove}
                onExpand={() => onFocusTask(task.id)}
            />
            ))}
        </div>
        
        {filteredAndSortedTasks.length === 0 && (
            <div className="text-center py-24 text-gray-400">
                <p className="text-2xl font-bold uppercase tracking-[-0.05em]">Ingen opgaver fundet</p>
                {searchQuery && (
                    <p className="text-sm mt-2">Prøv en anden søgning eller nulstil filtre.</p>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

const FilterButton: React.FC<{ 
  label: string; 
  active: boolean; 
  onClick: () => void;
  status?: ProjectStatus;
}> = ({ label, active, onClick, status }) => {
    let baseClasses = "px-4 py-2 md:px-6 md:py-3 font-bold uppercase text-xs md:text-sm transition-all border tracking-[-0.05em]";
    
    // Determine active styling based on status
    let activeStyle = "bg-black text-white border-black"; // Default (All)
    if (status === ProjectStatus.PENDING) activeStyle = "bg-[#FF3B30] text-white border-[#FF3B30]";
    if (status === ProjectStatus.IN_PROGRESS) activeStyle = "bg-[#FFCC00] text-black border-[#FFCC00]";
    if (status === ProjectStatus.APPROVED) activeStyle = "bg-[#34C759] text-white border-[#34C759]";

    // Active classes - Removed Shadow as requested
    let activeClasses = `${activeStyle}`;
    
    // Inactive classes - Updated to match Sidebar Aesthetic (White bg, black text, black border)
    let inactiveClasses = "bg-white text-black border-black hover:bg-[#EBE9E9] transition-colors";

    return (
        <button 
            onClick={onClick}
            className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
        >
            {label}
        </button>
    );
}

export default Dashboard;

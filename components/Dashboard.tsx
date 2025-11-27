
import React, { useState } from 'react';
import { ProjectTask, User, ProjectStatus } from '../types';
import ProjectCard from './ProjectCard';
import { ArrowDownUp, Search } from 'lucide-react';

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
          Sidebar Header (128px) + NavItem (77px) + NavItem (77px) = 282px Total Top Offset.
          Sticky Bar Content (94px) + Border (1px) = 95px.
          Therefore, Header Content needs to be exactly 187px high on desktop (282 - 95 = 187).
      */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 pt-8 md:pt-0 mb-0 flex flex-col justify-end md:h-[187px]">
        <div className="md:pb-8 text-center md:text-left">
            <h1 className="text-4xl md:text-7xl font-black uppercase mb-4 tracking-[-0.05em] leading-none">
            {title}
            </h1>
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

            {/* Right Side: Search + Sort - Reduced size by ~20% */}
            <div className="flex items-center gap-2 self-end md:self-auto w-full md:w-auto justify-end">
                {/* Search Input */}
                <div className="relative group w-full md:w-auto">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={12} />
                    <input 
                        type="text" 
                        placeholder="SØG PROJEKT..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-[180px] pl-8 pr-3 py-1.5 border border-black bg-white text-[10px] md:text-xs font-bold uppercase placeholder-gray-400 focus:outline-none focus:bg-gray-50 transition-colors tracking-[-0.05em]"
                    />
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

    // Active classes + Drop Shadow for emphasis
    let activeClasses = `${activeStyle} transform -translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]`;
    
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

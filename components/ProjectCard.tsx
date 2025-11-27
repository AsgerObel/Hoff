import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle, X, Paperclip, RotateCcw, Maximize2, Minimize2, ArrowRight } from 'lucide-react';
import { ProjectTask, ProjectStatus, User } from '../types';

interface ProjectCardProps {
  task: ProjectTask;
  currentUser: User;
  onAddComment: (taskId: string, text: string, attachments?: string[]) => void;
  onApprove: (taskId: string) => void;
  onUndoApprove: (taskId: string) => void;
  onExpand?: () => void; // Optional expand handler
  isExpanded?: boolean; // Expanded state
}

const ProjectCard: React.FC<ProjectCardProps> = ({ task, currentUser, onAddComment, onApprove, onUndoApprove, onExpand, isExpanded = false }) => {
  const [newComment, setNewComment] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (commentsContainerRef.current) {
        commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [task.comments]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setSelectedFile(e.target.files[0]);
    }
  };

  const handlePaperclipClick = () => {
    fileInputRef.current?.click();
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() && !selectedFile) return;

    // Handle File Attachment (Mock Upload)
    const attachments: string[] = [];
    if (selectedFile) {
        // Create a fake URL for the uploaded file to display it immediately
        const objectUrl = URL.createObjectURL(selectedFile);
        attachments.push(objectUrl);
    }

    onAddComment(task.id, newComment, attachments);
    setNewComment('');
    clearFile();
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('da-DK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
  };

  // Visual distinction logic for statuses
  const statusColors = {
    [ProjectStatus.PENDING]: 'bg-[#FF3B30] text-white border border-[#FF3B30] z-30', // Red
    [ProjectStatus.IN_PROGRESS]: 'bg-[#FFCC00] text-black border border-[#FFCC00]', // Yellow
    [ProjectStatus.APPROVED]: 'bg-[#34C759] text-white border border-[#34C759]', // Green
  };

  const statusLabels = {
    [ProjectStatus.PENDING]: 'AFVENTER DIG',
    [ProjectStatus.IN_PROGRESS]: 'IGANGVÆRENDE',
    [ProjectStatus.APPROVED]: 'GODKENDT',
  };

  const isApproved = task.status === ProjectStatus.APPROVED;

  // Conditional classes for Expanded mode - Removed animate-enter
  const containerClasses = isExpanded 
    ? "border border-black bg-white flex flex-col h-full shadow-2xl z-50"
    : "border border-black bg-white flex flex-col h-[600px] group relative transition-transform hover:-translate-y-1 duration-300";

  return (
    <>
        <div className={containerClasses}>
        
        {/* Sticker Badge - Added animate-sticker and key prop to re-trigger on status change */}
        <div 
            key={task.status}
            className={`absolute bottom-full -left-[1px] mb-[1px] px-4 py-1 text-xs font-bold uppercase shadow-sm z-20 tracking-[-0.05em] animate-sticker ${statusColors[task.status]}`}
        >
            {statusLabels[task.status]}
        </div>

        {/* Header Section */}
        <div className="grid grid-cols-2 border-b border-black h-16 shrink-0">
            {/* Left Header: Title + Minimize Button (Only visible when Expanded) */}
            <div className={`flex flex-col justify-center pl-4 border-r border-black relative transition-all ${isExpanded && onExpand ? 'pr-14' : 'pr-4'}`}>
                {/* Minimize Button - Icon Only - Compact - Aligned Right for Symmetry with Godkend button */}
                {isExpanded && onExpand && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onExpand(); }}
                            className="border border-black p-1 bg-white hover:bg-black hover:text-white transition-colors shadow-sm flex items-center justify-center"
                            title="Minimer"
                        >
                            <Minimize2 size={14} /> 
                        </button>
                    </div>
                )}

                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
                    {task.category} 
                    <span className="text-gray-300">|</span> 
                    <span>{formatDate(task.createdAt)}</span>
                </span>
                <h3 className="text-xl font-bold uppercase truncate tracking-[-0.05em]">{task.title}</h3>
            </div>

            {/* Right Header: Comments + Approve Button */}
            <div className="flex items-center justify-between px-4 bg-[#EBE9E9]/30">
                <span className="font-bold uppercase tracking-wider text-sm">Kommentar</span>
                
                <div className="flex items-center gap-3">
                    {!isApproved ? (
                        <button 
                            onClick={() => onApprove(task.id)}
                            className="text-xs border border-black px-3 py-1 hover:bg-[#34C759] hover:text-white hover:border-[#34C759] transition-all uppercase font-bold flex items-center gap-2 tracking-[-0.05em]"
                        >
                            <CheckCircle size={14} /> Godkend
                        </button>
                    ) : (
                        <button 
                            onClick={() => onUndoApprove(task.id)}
                            className="text-xs border border-red-500 text-red-500 px-3 py-1 hover:bg-red-500 hover:text-white transition-all uppercase font-bold flex items-center gap-2 tracking-[-0.05em]"
                        >
                            <RotateCcw size={14} /> Fortryd
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col md:grid md:grid-cols-2 min-h-0">
            {/* Left: Design Preview */}
            <div className="border-r border-black bg-gray-50 flex items-center justify-center relative overflow-hidden min-h-[300px] md:min-h-0 group">
                
                {/* Focus Button - Icon Only - Compact - Positioned Top Left */}
                {!isExpanded && onExpand && (
                    <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                            onClick={(e) => { e.stopPropagation(); onExpand(); }}
                            className="border border-black p-1 bg-white hover:bg-black hover:text-white transition-colors shadow-sm flex items-center justify-center"
                            title="Fokus Mode"
                        >
                            <Maximize2 size={14} /> 
                        </button>
                    </div>
                )}

                {/* Main Image */}
                <img 
                    src={task.imageUrl} 
                    alt={task.title} 
                    className={`max-w-full max-h-full object-contain shadow-lg border border-black/10 transition-all duration-500 p-8`}
                />

                {/* APPROVED STAMP (Animated) */}
                {isApproved && (
                    <div className="absolute inset-0 bg-white/40 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="text-2xl md:text-3xl font-black uppercase border-[4px] border-black p-2 md:p-3 animate-stamp tracking-[-0.05em] text-black mix-blend-multiply opacity-90 select-none">
                            GODKENDT
                        </div>
                    </div>
                )}
            </div>

            {/* Right: Comments */}
            <div className="flex flex-col bg-white h-full relative">
            <div ref={commentsContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {task.comments.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center p-4">
                        <p className="text-sm">Ingen kommentarer endnu.</p>
                        <p className="text-xs mt-2">Skriv herunder for at give feedback.</p>
                    </div>
                ) : (
                    task.comments.map((comment) => {
                    const isMe = comment.userId === currentUser.id;
                    return (
                        <div key={comment.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        {/* Message Row - Added items-center for vertical centering of initials */}
                        <div className={`flex gap-3 max-w-[90%] items-center ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Initials - Centered vertically due to parent items-center */}
                            <span className="font-bold text-xs w-8 text-center shrink-0">{isMe ? currentUser.initials : 'HS'}</span>
                            
                            <div className={`flex flex-col gap-2 ${isMe ? 'items-end' : 'items-start'} max-w-full`}>
                                {/* Text Content */}
                                {comment.text && (
                                    <div className={`p-3 text-sm border border-black ${isMe ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                        {comment.text}
                                    </div>
                                )}
                                
                                {/* Attachments */}
                                {comment.attachments && comment.attachments.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {comment.attachments.map((url, idx) => (
                                            <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="block w-24 h-24 border border-black/10 overflow-hidden hover:opacity-90 transition-opacity">
                                                <img src={url} alt="Attachment" className="w-full h-full object-cover" />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Timestamp */}
                        <span className="text-[10px] text-gray-400 mt-1 px-11">
                            {new Date(comment.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                        </div>
                    );
                    })
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-black bg-white relative">
                 {/* File Preview */}
                 {selectedFile && (
                    <div className="absolute -top-10 left-4 bg-[#EBE9E9] px-3 py-1 text-xs font-bold uppercase flex items-center gap-2 border border-black shadow-sm">
                        <span className="truncate max-w-[150px]">{selectedFile.name}</span>
                        <button onClick={clearFile} className="hover:text-red-500"><X size={12} /></button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Skriv en besked..."
                    disabled={isApproved}
                    className="w-full bg-[#EBE9E9] p-3 pr-20 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-500 transition-colors"
                />
                
                {/* Hidden File Input */}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*,.pdf" // Accepting images and PDFs essentially
                    onChange={handleFileChange}
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {/* Attachment Button */}
                    <button
                        type="button"
                        onClick={handlePaperclipClick}
                        disabled={isApproved}
                        className="p-1.5 text-gray-500 hover:text-black transition-colors"
                        title="Vedhæft fil"
                    >
                        <Paperclip size={16} />
                    </button>

                    {/* Send Button */}
                    <button
                        type="submit"
                        disabled={isApproved || (!newComment.trim() && !selectedFile)}
                        className="p-2 text-black hover:opacity-70 disabled:opacity-30 transition-opacity"
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    </>
  );
};

export default ProjectCard;
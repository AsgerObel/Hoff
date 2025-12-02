import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle, X, Paperclip, RotateCcw, Maximize2, Minimize2, ArrowRight, Eye, EyeOff } from 'lucide-react';
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
  const [showApprovedDesign, setShowApprovedDesign] = useState(false);
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

  // Helper to render text with clickable links
  const renderCommentWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={index} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline hover:opacity-80 break-all"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return part;
    });
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
    : "border border-black bg-white flex flex-col h-[480px] group relative transition-transform hover:-translate-y-1 duration-300";

  return (
    <>
        <div className={containerClasses}>
        
        {/* Sticker Badge - Added animate-sticker and key prop to re-trigger on status change */}
        <div 
            key={task.status}
            className={`absolute bottom-full ${isExpanded ? 'left-0 mb-0' : '-left-[1px] mb-[1px]'} px-3 py-0.5 text-[10px] font-bold uppercase shadow-sm z-20 tracking-[-0.05em] animate-sticker ${statusColors[task.status]}`}
        >
            {statusLabels[task.status]}
        </div>

        {/* Header Section */}
        <div className="grid grid-cols-2 border-b border-black h-12 shrink-0">
            {/* Left Header: Title + Minimize Button (Only visible when Expanded) */}
            <div className={`flex flex-col justify-center pl-3 border-r border-black relative transition-all ${isExpanded && onExpand ? 'pr-12' : 'pr-3'}`}>
                {/* Minimize Button - Icon Only - Compact - Aligned Right for Symmetry with Godkend button */}
                {isExpanded && onExpand && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onExpand(); }}
                            className="border border-black p-1 bg-white hover:bg-black hover:text-white transition-colors shadow-sm flex items-center justify-center"
                            title="Minimer"
                        >
                            <Minimize2 size={12} /> 
                        </button>
                    </div>
                )}

                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap">
                    {task.category} 
                    <span className="text-gray-300">|</span> 
                    <span>{formatDate(task.createdAt)}</span>
                </span>
                <h3 className="text-base font-bold uppercase truncate tracking-[-0.05em]">{task.title}</h3>
            </div>

            {/* Right Header: Comments + Approve Button */}
            <div className="flex items-center justify-between px-3">
                {/* Maximize Button - Only visible when NOT expanded and expand handler exists */}
                {!isExpanded && onExpand && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onExpand(); }}
                        className="hover:bg-black hover:text-white transition-colors p-1 rounded-sm opacity-0 group-hover:opacity-100"
                        title="Fokus Mode"
                    >
                        <Maximize2 size={14} /> 
                    </button>
                )}
                
                {/* Spacer if maximize button is not shown to keep layout consistent if needed, or just let justify-between handle it */}
                {/* If already expanded, we might not want anything here, or maybe a placeholder. For now, empty. */}
                {(isExpanded || !onExpand) && <div></div>}
                
                <div className={`flex items-center gap-2 ${!isExpanded ? 'opacity-0 group-hover:opacity-100 transition-opacity duration-200' : ''}`}>
                    {/* View Design Toggle for Approved Projects */}
                    {isApproved && (
                        <button 
                            onClick={() => setShowApprovedDesign(!showApprovedDesign)}
                            className="text-[9px] border border-black px-2 py-0.5 hover:bg-black hover:text-white transition-all uppercase font-bold flex items-center gap-1 tracking-[-0.05em]"
                            title={showApprovedDesign ? "Skjul design" : "Se design"}
                        >
                            {showApprovedDesign ? <EyeOff size={10} /> : <Eye size={10} />}
                            {showApprovedDesign ? "Skjul" : "Se design"}
                        </button>
                    )}

                    {!isApproved ? (
                        <button 
                            onClick={() => onApprove(task.id)}
                            className="text-[9px] border border-black px-2 py-0.5 hover:bg-[#34C759] hover:text-white hover:border-[#34C759] transition-all uppercase font-bold flex items-center gap-1 tracking-[-0.05em]"
                        >
                            <CheckCircle size={10} /> Godkend
                        </button>
                    ) : (
                        <button 
                            onClick={() => onUndoApprove(task.id)}
                            className="text-[9px] border border-red-500 text-red-500 px-2 py-0.5 hover:bg-red-500 hover:text-white transition-all uppercase font-bold flex items-center gap-1 tracking-[-0.05em]"
                        >
                            <RotateCcw size={10} /> Fortryd
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col md:grid md:grid-cols-2 min-h-0">
            {/* Left: Design Preview */}
            <div className="border-r border-black bg-white flex items-center justify-center relative overflow-hidden min-h-[240px] md:min-h-0 group">
                
                {/* Main Image */}
                <img 
                    src={task.imageUrl} 
                    alt={task.title} 
                    className={`max-w-full max-h-full object-contain shadow-lg border border-black/10 transition-all duration-500 p-6`}
                />

                {/* APPROVED STAMP (Animated) */}
                {isApproved && !showApprovedDesign && (
                    <div className="absolute inset-0 bg-white/40 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="text-xl md:text-2xl font-black uppercase border-[3px] border-black p-1.5 md:p-2 animate-stamp tracking-[-0.05em] text-black mix-blend-multiply opacity-90 select-none">
                            GODKENDT
                        </div>
                    </div>
                )}
            </div>

            {/* Right: Comments */}
            <div className="flex flex-col bg-white h-full relative">
            <div ref={commentsContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3">
                {task.comments.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center p-3">
                        <p className="text-xs">Ingen kommentarer endnu.</p>
                        <p className="text-[10px] mt-1.5">Skriv herunder for at give feedback.</p>
                    </div>
                ) : (
                    task.comments.map((comment) => {
                    const isMe = comment.userId === currentUser.id;
                    
                    let senderName = 'HOFFMEISTER S.';
                    if (isMe) {
                        const parts = currentUser.name.trim().split(/\s+/);
                        if (parts.length >= 2) {
                            senderName = `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`.toUpperCase();
                        } else {
                            senderName = parts[0].toUpperCase();
                        }
                    }

                    const formattedTime = new Date(comment.timestamp).toLocaleString('da-DK', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }).replace(',', '');

                    return (
                        <div key={comment.id} className={`flex flex-col mb-4 ${isMe ? 'items-end' : 'items-start'}`}>
                            {/* Header: Name & Time */}
                            <div className={`flex items-center gap-1.5 mb-1.5 text-[9px] font-bold uppercase tracking-wider text-gray-400 select-none`}>
                                {isMe ? (
                                    <>
                                        <span>{formattedTime}</span>
                                        <span className="text-gray-300">—</span>
                                        <span className="text-black">{senderName}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-black">{senderName}</span>
                                        <span className="text-gray-300">—</span>
                                        <span>{formattedTime}</span>
                                    </>
                                )}
                            </div>

                            {/* Message Bubble */}
                            <div className={`max-w-[85%] flex flex-col gap-1.5 ${isMe ? 'items-end' : 'items-start'}`}>
                                {comment.text && (
                                    <div className={`p-3 text-xs border border-black ${isMe ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                        {renderCommentWithLinks(comment.text)}
                                    </div>
                                )}
                                
                                {/* Attachments */}
                                {comment.attachments && comment.attachments.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {comment.attachments.map((url, idx) => (
                                            <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="block w-20 h-20 border border-black/10 overflow-hidden hover:opacity-90 transition-opacity">
                                                <img src={url} alt="Attachment" className="w-full h-full object-cover" />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                    })
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-black bg-white relative">
                 {/* File Preview */}
                 {selectedFile && (
                    <div className="absolute -top-8 left-3 bg-[#EBE9E9] px-2 py-0.5 text-[10px] font-bold uppercase flex items-center gap-1.5 border border-black shadow-sm">
                        <span className="truncate max-w-[120px]">{selectedFile.name}</span>
                        <button onClick={clearFile} className="hover:text-red-500"><X size={10} /></button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Skriv en besked..."
                    disabled={isApproved}
                    className="w-full bg-[#F9F9F9] border border-[#EBE9E9] p-2.5 pr-16 text-xs font-medium focus:outline-none focus:border-black placeholder-gray-500 transition-colors"
                />
                
                {/* Hidden File Input */}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*,.pdf" // Accepting images and PDFs essentially
                    onChange={handleFileChange}
                />

                <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
                    {/* Attachment Button */}
                    <button
                        type="button"
                        onClick={handlePaperclipClick}
                        disabled={isApproved}
                        className="p-1 text-gray-500 hover:text-black transition-colors"
                        title="Vedhæft fil"
                    >
                        <Paperclip size={14} />
                    </button>

                    {/* Send Button */}
                    <button
                        type="submit"
                        disabled={isApproved || (!newComment.trim() && !selectedFile)}
                        className="p-1.5 text-black hover:opacity-70 disabled:opacity-30 transition-opacity"
                    >
                        <ArrowRight size={16} />
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
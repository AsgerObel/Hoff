import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Send, CheckCircle, X, Paperclip, RotateCcw, Maximize2, Minimize2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { ProjectTask, ProjectStatus, User } from '../types';
import { useTheme } from './ThemeContext';

// Figma embed komponent
const FigmaEmbed = React.memo(({ src, title, darkMode }: { src: string; title: string, darkMode: boolean }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  
  useEffect(() => {
    setIsLoaded(false);
    setMinTimeElapsed(false);
    
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [src]);
  
  const showContent = isLoaded && minTimeElapsed;
  
  return (
    <div className={`w-full h-full overflow-y-auto overflow-x-hidden relative ${darkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
      {/* Indlæsningsanimation */}
      <div 
        className={`absolute inset-0 flex items-center justify-center ${darkMode ? 'bg-[#111]' : 'bg-gray-50'} z-20 transition-opacity duration-500 ${showContent ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className={`w-10 h-10 border-[3px] ${darkMode ? 'border-white' : 'border-black'} border-t-transparent rounded-full animate-spin`}></div>
          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider font-semibold`}>Indlæser design...</span>
        </div>
      </div>

      <div 
        className="relative overflow-hidden"
        style={{ 
          width: 'calc(100% + 60px)',
          height: '1500px',
          marginLeft: '-30px',
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        <iframe
          src={src}
          className="border-0 absolute pointer-events-none"
          style={{ 
            width: '100%',
            height: 'calc(100% + 160px)', 
            top: '-50px',
            left: '0',
          }}
          allowFullScreen
          loading="eager"
          title={title}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
});

interface ProjectCardProps {
  task: ProjectTask;
  currentUser: User;
  onAddComment: (taskId: string, text: string, attachments?: string[]) => void;
  onApprove: (taskId: string) => void;
  onUndoApprove: (taskId: string) => void;
  onExpand?: () => void;
  isExpanded?: boolean;
  viewMode?: 'single' | 'grid' | 'compact';
  darkMode?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  task, 
  currentUser, 
  onAddComment, 
  onApprove, 
  onUndoApprove, 
  onExpand, 
  isExpanded = false,
  viewMode = 'grid' 
}) => {
  const [newComment, setNewComment] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showApprovedDesign, setShowApprovedDesign] = useState(false);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { darkMode } = useTheme();
  const bgColor = darkMode ? 'bg-[#1b1b1b]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-white/20' : 'border-black';
  const inputBgColor = darkMode ? 'bg-[#2a2a2a]' : 'bg-[#F9F9F9]';
  const inputBorderColor = darkMode ? 'border-white/20' : 'border-[#EBE9E9]';
  const secondaryText = darkMode ? 'text-gray-400' : 'text-gray-500';

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

    const attachments: string[] = [];
    if (selectedFile) {
        const objectUrl = URL.createObjectURL(selectedFile);
        attachments.push(objectUrl);
    }

    onAddComment(task.id, newComment, attachments);
    setNewComment('');
    clearFile();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('da-DK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
  };

  // Opret Figma embed URL
  const figmaEmbedUrl = useMemo(() => {
    const url = task.imageUrl;
    if (url.includes('embed.figma.com') || url.includes('figma.com/embed')) {
      if (!url.includes('hide-ui=')) {
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}hide-ui=1`;
      }
      return url;
    }
    const encodedUrl = encodeURIComponent(url);
    return `https://www.figma.com/embed?embed_host=share&url=${encodedUrl}&hide-ui=1`;
  }, [task.imageUrl]);
  
  const isFigmaUrl = task.imageUrl.includes('figma.com') || task.imageUrl.includes('embed.figma.com');

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
  const heightClass = viewMode === 'single' ? 'h-[calc(100vh-320px)] min-h-[450px]' : 
                      viewMode === 'compact' ? 'h-[250px]' : 
                      'h-[480px]';
  const containerClasses = isExpanded 
    ? `border ${borderColor} ${bgColor} flex flex-col h-full shadow-2xl z-50`
    : `border ${borderColor} ${bgColor} flex flex-col ${heightClass} group relative transition-all duration-500 ease-in-out hover:-translate-y-1 ${viewMode === 'compact' ? 'cursor-pointer' : ''}`;

  const handleCardClick = () => {
    if (viewMode === 'compact' && onExpand) {
      onExpand();
    }
  };

  return (
    <>
        <div className={containerClasses} onClick={handleCardClick}>
        
        {/* Status badge */}
        <div 
            key={task.status}
            className={`absolute bottom-full ${isExpanded ? 'left-0 mb-0' : '-left-[1px] mb-[1px]'} px-3 py-0.5 text-[10px] font-bold uppercase shadow-sm z-20 tracking-[-0.05em] animate-sticker ${statusColors[task.status]}`}
        >
            {statusLabels[task.status]}
        </div>

        {/* Header */}
        <div className={`border-b ${borderColor} shrink-0 ${viewMode === 'compact' ? 'h-10' : 'h-12 grid grid-cols-2'}`}>
            <div className={`flex flex-col justify-center pl-3 border-r ${borderColor} relative transition-all overflow-hidden ${viewMode === 'compact' ? 'border-r-0 pr-3' : ''} ${isExpanded && onExpand ? 'pr-12' : 'pr-3'}`}>
                {isExpanded && onExpand && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onExpand(); }}
                            className={`border ${borderColor} p-1 ${bgColor} ${darkMode ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'} transition-colors shadow-sm flex items-center justify-center`}
                            title="Minimer"
                        >
                            <Minimize2 size={12} /> 
                        </button>
                    </div>
                )}

                {viewMode === 'compact' ? (
                    <h3 className={`text-xs font-bold uppercase truncate tracking-[-0.05em] ${textColor}`}>{task.title}</h3>
                ) : (
                    <>
                        <span className={`text-[10px] font-bold ${secondaryText} uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap overflow-hidden`}>
                            <span className="truncate">{task.category}</span>
                            <span className={`${darkMode ? 'text-gray-600' : 'text-gray-300'} shrink-0`}>|</span> 
                            <span className="shrink-0">{formatDate(task.createdAt)}</span>
                        </span>
                        <h3 className={`text-base font-bold uppercase truncate tracking-[-0.05em] ${textColor}`}>{task.title}</h3>
                    </>
                )}
            </div>

            {viewMode !== 'compact' && (
            <div className="flex items-center justify-between px-3">
                {!isExpanded && onExpand && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onExpand(); }}
                        className={`${darkMode ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'} transition-colors p-1 rounded-sm opacity-0 group-hover:opacity-100 ${textColor}`}
                        title="Fokus Mode"
                    >
                        <Maximize2 size={14} /> 
                    </button>
                )}
                
                {(isExpanded || !onExpand) && <div></div>}
                
                <div className={`flex items-center gap-2 ${!isExpanded ? 'opacity-0 group-hover:opacity-100 transition-opacity duration-200' : ''}`}>
                    {isApproved && (
                        <button 
                            onClick={() => setShowApprovedDesign(!showApprovedDesign)}
                            className={`text-[9px] border ${borderColor} px-2 py-0.5 ${darkMode ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'} transition-all uppercase font-bold flex items-center gap-1 tracking-[-0.05em] ${textColor}`}
                            title={showApprovedDesign ? "Skjul design" : "Se design"}
                        >
                            {showApprovedDesign ? <EyeOff size={10} /> : <Eye size={10} />}
                            {showApprovedDesign ? "Skjul" : "Se design"}
                        </button>
                    )}

                    {!isApproved ? (
                        <button 
                            onClick={() => onApprove(task.id)}
                            className={`text-[9px] border ${borderColor} px-2 py-0.5 hover:bg-[#34C759] hover:text-white hover:border-[#34C759] transition-all uppercase font-bold flex items-center gap-1 tracking-[-0.05em] ${textColor}`}
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
            )}
        </div>

        {/* Indhold */}
        <div className={`flex-1 flex flex-col min-h-0 ${viewMode === 'compact' ? '' : 'md:grid md:grid-cols-2'}`}>
            {/* Design preview */}
            <div className={`${bgColor} flex items-center justify-center relative overflow-hidden group ${viewMode === 'compact' ? 'h-full' : `border-r ${borderColor} min-h-[240px] md:min-h-0`}`}>
                
                {isFigmaUrl ? (
                    <FigmaEmbed src={figmaEmbedUrl} title={task.title} darkMode={darkMode} />
                ) : (
                    <img 
                        src={task.imageUrl} 
                        alt={task.title} 
                        className={`max-w-full max-h-full object-contain shadow-lg border border-black/10 transition-all duration-500 ${viewMode === 'compact' ? 'p-3' : 'p-6'}`}
                    />
                )}

                {viewMode === 'compact' && onExpand && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-white p-2 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            <Maximize2 size={18} />
                        </div>
                    </div>
                )}

                {isApproved && !showApprovedDesign && (
                    <div className="absolute inset-0 bg-white/40 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="text-xl md:text-2xl font-black uppercase border-[3px] border-black p-1.5 md:p-2 animate-stamp tracking-[-0.05em] text-black mix-blend-multiply opacity-90 select-none">
                            GODKENDT
                        </div>
                    </div>
                )}
            </div>

            {/* Kommentarer */}
            <div className={`flex flex-col ${bgColor} h-full relative ${viewMode === 'compact' ? 'hidden' : ''}`}>
            <div ref={commentsContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3">
                {task.comments.length === 0 ? (
                    <div className={`h-full flex flex-col items-center justify-center ${secondaryText} text-center p-3`}>
                        <p className="text-xs">Ingen kommentarer endnu.</p>
                        <p className="text-[10px] mt-1.5">Skriv herunder for at give feedback.</p>
                    </div>
                ) : (
                    task.comments.map((comment) => {
                    const isMe = comment.userId === currentUser.id;
                    const senderName = isMe ? 'HOFFMEISTER S.' : 'ASGER O.';
                    const formattedTime = new Date(comment.timestamp).toLocaleString('da-DK', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }).replace(',', '');

                    return (
                        <div key={comment.id} className={`flex flex-col mb-4 ${isMe ? 'items-end' : 'items-start'}`}>
                            <div className={`flex items-center gap-1.5 mb-1.5 text-[9px] font-bold uppercase tracking-wider ${secondaryText} select-none`}>
                                {isMe ? (
                                    <>
                                        <span>{formattedTime}</span>
                                        <span className={`${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>—</span>
                                        <span className={textColor}>{senderName}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className={textColor}>{senderName}</span>
                                        <span className={`${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>—</span>
                                        <span>{formattedTime}</span>
                                    </>
                                )}
                            </div>

                            <div className={`max-w-[85%] flex flex-col gap-1.5 ${isMe ? 'items-end' : 'items-start'}`}>
                                {comment.text && (
                                    <div className={`p-3 text-xs border ${borderColor} ${isMe ? (darkMode ? 'bg-white text-black' : 'bg-black text-white') : `${bgColor} ${textColor}`}`}>
                                        {renderCommentWithLinks(comment.text)}
                                    </div>
                                )}
                                
                                {/* Attachments */}
                                {comment.attachments && comment.attachments.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {comment.attachments.map((url, idx) => (
                                            <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className={`block w-20 h-20 border ${darkMode ? 'border-white/10' : 'border-black/10'} overflow-hidden hover:opacity-90 transition-opacity`}>
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

            {/* Besked input */}
            <div className={`p-3 border-t ${borderColor} ${bgColor} relative`}>
                 {selectedFile && (
                    <div className={`absolute -top-8 left-3 ${darkMode ? 'bg-[#333]' : 'bg-[#EBE9E9]'} px-2 py-0.5 text-[10px] font-bold uppercase flex items-center gap-1.5 border ${borderColor} shadow-sm ${textColor}`}>
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
                    className={`w-full ${inputBgColor} border ${inputBorderColor} p-2.5 pr-16 text-xs font-medium focus:outline-none focus:border-${darkMode ? 'white' : 'black'} placeholder-gray-500 transition-colors ${textColor}`}
                />
                
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                />

                <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
                    <button
                        type="button"
                        onClick={handlePaperclipClick}
                        disabled={isApproved}
                        className={`p-1 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'} transition-colors`}
                        title="Vedhæft fil"
                    >
                        <Paperclip size={14} />
                    </button>

                    <button
                        type="submit"
                        disabled={isApproved || (!newComment.trim() && !selectedFile)}
                        className={`p-1.5 ${textColor} hover:opacity-70 disabled:opacity-30 transition-opacity`}
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

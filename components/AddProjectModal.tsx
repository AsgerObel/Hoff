import React, { useState } from 'react';
import { X, Code2, Loader2 } from 'lucide-react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; category: string; figmaUrl: string }) => void;
  darkMode?: boolean;
}

const CATEGORIES = [
  'Branding',
  'Visuel Identitet',
  'Web Design',
  'SoMe'
];

const extractFigmaUrl = (input: string): string => {
  if (input.startsWith('http') && !input.includes('<iframe')) {
    return input.trim();
  }
  
  const srcMatch = input.match(/src=["']([^"']+)["']/);
  if (srcMatch && srcMatch[1]) {
    return srcMatch[1];
  }
  
  return input.trim();
};

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onSubmit, darkMode = false }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [figmaEmbed, setFigmaEmbed] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const brandBlack = '#1b1b1b';
  const bgColor = darkMode ? 'bg-[#1b1b1b]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-white/20' : 'border-[#1b1b1b]';
  const inputBg = darkMode ? 'bg-[#2a2a2a]' : 'bg-[#F9F9F9]';
  const labelColor = darkMode ? 'text-gray-400' : 'text-gray-600';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Titel er påkrævet');
      return;
    }

    if (!figmaEmbed.trim()) {
      setError('Figma embed kode er påkrævet');
      return;
    }

    const extractedUrl = extractFigmaUrl(figmaEmbed);

    if (!extractedUrl.includes('figma.com') && !extractedUrl.includes('figma')) {
      setError('Indtast venligst en gyldig Figma embed kode eller URL');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    onSubmit({
      title: title.trim(),
      category,
      figmaUrl: extractedUrl
    });

    setTitle('');
    setCategory(CATEGORIES[0]);
    setFigmaEmbed('');
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div 
        className={`absolute inset-0 ${darkMode ? 'bg-black/80' : 'bg-[#1b1b1b]/60'} backdrop-blur-sm animate-fade-in`}
        onClick={onClose}
      />
      
      <div className={`relative w-[95%] max-w-[500px] ${bgColor} border ${borderColor} shadow-2xl animate-modal-in z-10`}>
        <div className={`flex items-center justify-between p-4 border-b ${borderColor} ${darkMode ? 'bg-white text-[#1b1b1b]' : 'bg-[#1b1b1b] text-white'}`}>
          <h2 className="text-lg font-black uppercase tracking-[-0.05em]">Tilføj Projekt</h2>
          <button 
            onClick={onClose}
            className={`p-1 ${darkMode ? 'hover:bg-black/10' : 'hover:bg-white/10'} transition-colors`}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className={`block text-xs font-bold uppercase tracking-widest ${labelColor}`}>
              Projekt Titel
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="F.eks. Logo Design"
              className={`w-full px-4 py-3 border ${borderColor} ${inputBg} ${textColor} text-sm font-medium placeholder-gray-400 focus:outline-none transition-colors`}
            />
          </div>

          <div className="space-y-2">
            <label className={`block text-xs font-bold uppercase tracking-widest ${labelColor}`}>
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-4 py-3 border ${borderColor} ${inputBg} ${textColor} text-sm font-medium focus:outline-none transition-colors appearance-none cursor-pointer`}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className={`block text-xs font-bold uppercase tracking-widest ${labelColor}`}>
              Figma Embed Kode
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400">
                <Code2 size={16} />
              </div>
              <textarea
                value={figmaEmbed}
                onChange={(e) => setFigmaEmbed(e.target.value)}
                placeholder='<iframe style="border: 1px solid..." src="https://embed.figma.com/..." allowfullscreen></iframe>'
                rows={4}
                className={`w-full pl-10 pr-4 py-3 border ${borderColor} ${inputBg} ${textColor} text-sm font-medium placeholder-gray-400 focus:outline-none transition-colors resize-none font-mono text-xs`}
              />
            </div>
            <p className="text-[10px] text-gray-400 font-medium">
              I Figma: Højreklik på frame &rarr; "Copy/Paste as" &rarr; "Copy link to selection" &rarr; Share &rarr; "Get embed code"
            </p>
          </div>

          {error && (
            <div className={`p-3 ${darkMode ? 'bg-red-900/30 border-red-700 text-red-400' : 'bg-red-50 border-red-200 text-red-600'} border text-sm font-medium`}>
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 ${darkMode ? 'bg-white text-[#1b1b1b] hover:bg-gray-200' : 'bg-[#1b1b1b] text-white hover:bg-[#333]'} font-bold uppercase tracking-[-0.05em] text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Opretter...
                </>
              ) : (
                'Opret Projekt'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;

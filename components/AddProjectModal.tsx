import React, { useState } from 'react';
import { X, Code2, Loader2 } from 'lucide-react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; category: string; figmaUrl: string }) => void;
}

const CATEGORIES = [
  'Branding',
  'Visuel Identitet',
  'Web Design',
  'SoMe'
];

// Helper to extract src URL from iframe code
const extractFigmaUrl = (input: string): string => {
  // If it's already a URL (not iframe), return as-is
  if (input.startsWith('http') && !input.includes('<iframe')) {
    return input.trim();
  }
  
  // Try to extract src from iframe
  const srcMatch = input.match(/src=["']([^"']+)["']/);
  if (srcMatch && srcMatch[1]) {
    return srcMatch[1];
  }
  
  return input.trim();
};

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [figmaEmbed, setFigmaEmbed] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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

    // Extract URL from iframe or use directly if it's a URL
    const extractedUrl = extractFigmaUrl(figmaEmbed);

    // Validate that it contains figma
    if (!extractedUrl.includes('figma.com') && !extractedUrl.includes('figma')) {
      setError('Indtast venligst en gyldig Figma embed kode eller URL');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));

    onSubmit({
      title: title.trim(),
      category,
      figmaUrl: extractedUrl
    });

    // Reset form
    setTitle('');
    setCategory(CATEGORIES[0]);
    setFigmaEmbed('');
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-[95%] max-w-[500px] bg-white border border-black shadow-2xl animate-modal-in z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-black bg-black text-white">
          <h2 className="text-lg font-black uppercase tracking-[-0.05em]">Tilføj Projekt</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-600">
              Projekt Titel
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="F.eks. Logo Design"
              className="w-full px-4 py-3 border border-black bg-[#F9F9F9] text-sm font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-colors"
            />
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-600">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-black bg-[#F9F9F9] text-sm font-medium focus:outline-none focus:bg-white transition-colors appearance-none cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Figma Embed Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-600">
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
                className="w-full pl-10 pr-4 py-3 border border-black bg-[#F9F9F9] text-sm font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-colors resize-none font-mono text-xs"
              />
            </div>
            <p className="text-[10px] text-gray-400 font-medium">
              I Figma: Højreklik på frame &rarr; "Copy/Paste as" &rarr; "Copy link to selection" &rarr; Share &rarr; "Get embed code"
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-black text-white font-bold uppercase tracking-[-0.05em] text-sm hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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


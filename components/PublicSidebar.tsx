import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface PublicSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  backgroundColor?: string;
  borderColor?: string;
  customHoverClass?: string;
  darkMode?: boolean;
}

const PublicSidebar: React.FC<PublicSidebarProps> = ({ 
  isOpen, 
  onClose,
  backgroundColor,
  borderColor,
  customHoverClass,
  darkMode: propsDarkMode
}) => {
  const location = useLocation();
  const { darkMode: contextDarkMode, toggleDarkMode } = useTheme();
  
  const menuItems = [
    { id: 'cases', label: 'Cases', path: '/cases' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'kontakt', label: 'Kontakt', path: '/kontakt' },
  ];
  
  const isCustomStyle = !!backgroundColor;
  const isDark = isCustomStyle ? (propsDarkMode ?? true) : contextDarkMode;
  const bgClass = backgroundColor ? '' : (isDark ? 'bg-[#1b1b1b]' : 'bg-white');
  const textClass = isDark ? 'text-white' : 'text-black';
  const borderClass = borderColor ? `border-[${borderColor}]` : (isDark ? 'border-white/20' : 'border-[#EBE9E9]');
  
  const hoverClass = customHoverClass || (isDark ? 'hover:bg-white/10' : 'hover:bg-[#EBE9E9]');
  const activeClass = isDark ? 'bg-white/10' : 'bg-[#EBE9E9]';

  const style = backgroundColor ? { backgroundColor } : {};
  const borderStyle = borderColor && !borderColor.startsWith('border-') ? { borderColor } : {};
  const mobileClasses = `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`;
  const desktopClasses = `md:translate-x-0 md:static md:flex`;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside 
        className={`${mobileClasses} ${desktopClasses} flex flex-col border-r h-screen ${bgClass} ${textClass} relative w-64 shrink-0 transition-colors duration-300 ${!borderColor ? borderClass : ''}`}
        style={{ ...style, ...borderStyle }}
      >
        <div className={`h-[127px] border-b p-6 flex items-center justify-between ${!borderColor ? borderClass : ''}`} style={borderStyle}>
          <div className="flex flex-col items-start leading-none group">
            <Link to="/" className="text-3xl font-black tracking-[-0.05em] uppercase group-hover:opacity-70 transition-opacity block -mb-1">
              Hoffmeister
            </Link>
            <div className="flex items-center gap-2">
              <Link to="/" className="text-3xl font-black tracking-[-0.05em] uppercase group-hover:opacity-70 transition-opacity block">
                Studio
              </Link>
              <div className="relative group/logo">
                <button 
                  onClick={toggleDarkMode}
                  className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-all duration-300 hover:scale-110 flex-shrink-0"
                >
                  <img 
                    src={isDark ? '/assets/LogoDarkmode.png' : '/assets/logo-light.png'} 
                    alt="Hoffmeister Logo" 
                    className="w-full h-full object-contain"
                  />
                </button>
                {/* Tooltip - positioned to the right */}
                <div className={`absolute top-1/2 -translate-y-1/2 left-full ml-3 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover/logo:opacity-100 transition-all duration-200 translate-x-1 group-hover/logo:translate-x-0 pointer-events-none ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  {isDark ? 'LIGHT MODE' : 'DARK MODE'}
                  <div className={`absolute top-1/2 -translate-y-1/2 right-full w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] ${isDark ? 'border-r-white' : 'border-r-black'}`}></div>
                </div>
              </div>
            </div>
          </div>
          <button className="md:hidden" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={`w-full text-left p-6 md:h-[77px] border-b text-xl font-bold uppercase transition-colors flex items-center gap-4 ${hoverClass} ${
                  isActive ? activeClass : ''
                } ${!borderColor ? borderClass : ''}`}
                style={borderStyle}
              >
                <span className="tracking-[-0.05em]">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto relative z-20">
          <div className={`border-t ${!borderColor ? borderClass : ''}`} style={borderStyle}>
            <Link 
              to="/login"
              className={`w-full h-20 flex items-center justify-center px-6 transition-colors text-xl font-bold uppercase tracking-[-0.05em] ${hoverClass}`}
            >
              Login
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default PublicSidebar;

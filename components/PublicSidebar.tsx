import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

interface PublicSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  customHoverClass?: string;
}

const PublicSidebar: React.FC<PublicSidebarProps> = ({ isOpen, onClose, darkMode = false, backgroundColor, borderColor, customHoverClass }) => {
  const location = useLocation();
  
  const menuItems = [
    { id: 'cases', label: 'Cases', path: '/cases' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'kontakt', label: 'Kontakt', path: '/kontakt' },
  ];

  // Theme classes
  const bgClass = backgroundColor ? '' : (darkMode ? 'bg-[#0A0A0A]' : 'bg-white');
  const textClass = darkMode ? 'text-white' : 'text-black';
  const borderClass = borderColor || (darkMode ? 'border-white/10' : 'border-[#EBE9E9]');
  const hoverClass = customHoverClass || (darkMode ? 'hover:bg-white/5' : 'hover:bg-[#EBE9E9]');
  const activeClass = darkMode ? 'bg-white/10' : 'bg-[#EBE9E9]';

  // Mobile drawer classes
  const mobileClasses = `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`;
  
  const desktopClasses = `md:translate-x-0 md:static md:flex`;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside 
        className={`${mobileClasses} ${desktopClasses} flex flex-col border-r ${borderClass} h-screen ${bgClass} ${textClass} relative w-64 shrink-0 transition-colors duration-300`}
        style={{ backgroundColor: backgroundColor }}
      >
        {/* Brand Header */}
        <div className={`h-[127px] border-b ${borderClass} p-6 flex items-center justify-between`}>
          <Link to="/" className="text-3xl font-black leading-tight tracking-[-0.05em] uppercase hover:opacity-70 transition-opacity">
            Hoffmeister<br />Studio
          </Link>
          <button className="md:hidden" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={`w-full text-left p-6 md:h-[77px] border-b ${borderClass} text-xl font-bold uppercase transition-colors flex items-center gap-4 ${hoverClass} ${
                  isActive ? activeClass : ''
                }`}
              >
                <span className="tracking-[-0.05em]">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto relative z-20">
          {/* Login Link */}
          <div className={`border-t ${borderClass}`}>
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


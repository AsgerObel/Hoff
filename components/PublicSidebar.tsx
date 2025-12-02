import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

interface PublicSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const PublicSidebar: React.FC<PublicSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const menuItems = [
    { id: 'cases', label: 'Cases', path: '/cases' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'kontakt', label: 'Kontakt', path: '/kontakt' },
  ];

  // Mobile drawer classes
  const mobileClasses = `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`;
  // Desktop classes (always visible)
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

      <aside className={`${mobileClasses} ${desktopClasses} flex flex-col border-r border-[#EBE9E9] h-screen bg-white relative w-64 shrink-0`}>
        {/* Brand Header */}
        <div className="h-32 border-b border-[#EBE9E9] p-6 flex items-center justify-between">
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
                className={`w-full text-left p-6 md:h-[77px] border-b border-[#EBE9E9] text-xl font-bold transition-colors hover:bg-[#EBE9E9] flex items-center gap-4 ${
                  isActive ? 'bg-[#EBE9E9]' : 'bg-white'
                }`}
              >
                <span className="tracking-[-0.05em]">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto relative z-20 bg-white">
          {/* Login Link */}
          <div className="border-t border-[#EBE9E9]">
            <Link 
              to="/login"
              className="w-full h-20 flex items-center justify-center px-6 transition-colors hover:bg-[#EBE9E9] text-xl font-bold uppercase tracking-[-0.05em]"
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


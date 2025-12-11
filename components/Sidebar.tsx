import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Palette, Monitor, Box, Briefcase, Settings, X, ChevronUp } from 'lucide-react';
import { User } from '../types';
import { useTheme } from './ThemeContext';

interface SidebarProps {
  currentUser: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, activeTab, onTabChange, isOpen, onClose }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  // Theme classes
  const bgColor = darkMode ? 'bg-[#1b1b1b]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-white/20' : 'border-[#EBE9E9]';
  const hoverBg = darkMode ? 'hover:bg-white/10' : 'hover:bg-[#EBE9E9]';
  const activeBg = darkMode ? 'bg-white/10' : 'bg-[#EBE9E9]';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'some', label: 'SoMe', icon: Box },
    { id: 'web', label: 'Web Design', icon: Monitor },
    { id: 'identity', label: 'Visuel Identitet', icon: Palette },
    { id: 'branding', label: 'Branding', icon: Briefcase },
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

        <aside className={`${mobileClasses} ${desktopClasses} flex flex-col border-r ${borderColor} h-screen ${bgColor} ${textColor} relative transition-colors duration-300`}>
        {/* Brand Header */}
        <div className={`h-[127px] border-b ${borderColor} p-6 flex items-center justify-between`}>
            <div className="flex flex-col items-start leading-none group">
                <Link to="/" className="text-3xl font-black tracking-[-0.05em] uppercase hover:opacity-70 transition-opacity block -mb-1">
                Hoffmeister
                </Link>
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-3xl font-black tracking-[-0.05em] uppercase hover:opacity-70 transition-opacity block">
                    Studio
                    </Link>
                    {/* Logo - Click to toggle dark mode */}
                    <button 
                      onClick={toggleDarkMode}
                      className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-all duration-300 hover:scale-110 flex-shrink-0"
                      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                      <img 
                        src={darkMode ? '/assets/LogoDarkmode.png' : '/assets/Logo.png'} 
                        alt="Hoffmeister Logo" 
                        className="w-full h-full object-contain"
                      />
                    </button>
                </div>
            </div>
            <button className="md:hidden" onClick={onClose}>
                <X size={24} />
            </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto">
            {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
                <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full text-left p-6 md:h-[77px] border-b ${borderColor} text-xl font-bold transition-colors ${hoverBg} flex items-center gap-4 ${
                    isActive ? activeBg : ''
                }`}
                >
                <span className="tracking-[-0.05em]">{item.label}</span>
                </button>
            );
            })}
        </nav>

        {/* User Section - Fixed at bottom */}
        <div className={`mt-auto relative z-20 ${bgColor}`}>
            
            {/* User Profile */}
            <div className={`border-t ${borderColor} p-0`}>
                <button 
                    onClick={() => onTabChange('settings')}
                    className={`w-full h-24 flex items-center px-6 transition-colors ${hoverBg} ${activeTab === 'settings' ? activeBg : ''}`}
                >
                    <div className="flex items-center justify-between w-full">
                        <span className="text-3xl font-bold uppercase tracking-[-0.05em]">{currentUser.initials}</span>
                        
                        {/* Artistic Divider - Now centered because it's a direct child of justify-between */}
                        <span className="text-2xl text-gray-400 font-medium tracking-tight select-none opacity-60">//</span>
                        
                        <Settings className="w-8 h-8" />
                    </div>
                </button>
            </div>
        </div>
        </aside>
    </>
  );
};

export default Sidebar;

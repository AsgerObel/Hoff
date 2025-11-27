import React from 'react';
import { LayoutDashboard, Palette, Monitor, Box, Briefcase, Settings, X, ChevronUp } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  currentUser: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, activeTab, onTabChange, isOpen, onClose }) => {
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

        <aside className={`${mobileClasses} ${desktopClasses} flex flex-col border-r border-[#EBE9E9] h-screen bg-white relative`}>
        {/* Brand Header */}
        <div className="h-32 border-b border-[#EBE9E9] p-6 flex items-center justify-between">
            <h1 className="text-3xl font-black leading-tight tracking-[-0.05em] uppercase">
            Hoffmeister<br />Studio
            </h1>
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
                className={`w-full text-left p-6 md:h-[77px] border-b border-[#EBE9E9] text-xl font-bold transition-colors hover:bg-[#EBE9E9] flex items-center gap-4 ${
                    isActive ? 'bg-[#EBE9E9]' : 'bg-white'
                }`}
                >
                <span className="tracking-[-0.05em]">{item.label}</span>
                </button>
            );
            })}
        </nav>

        {/* User Section - Fixed at bottom */}
        <div className="mt-auto relative z-20 bg-white">
            
            {/* User Profile */}
            <div className="border-t border-[#EBE9E9] p-0">
                <button 
                    onClick={() => onTabChange('settings')}
                    className={`w-full h-24 flex items-center px-6 transition-colors hover:bg-[#EBE9E9] ${activeTab === 'settings' ? 'bg-[#EBE9E9]' : ''}`}
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
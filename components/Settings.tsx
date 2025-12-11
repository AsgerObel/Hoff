import React, { useState } from 'react';
import { User } from '../types';
import { Save, Copy, Check, Type, Palette, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface SettingsProps {
  user: User;
  onSave: (firstName: string, lastName: string, email: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onSave }) => {
  // Initialize state by splitting the current full name
  const [firstName, setFirstName] = useState(() => {
    const parts = user.name.split(' ');
    return parts[0] || '';
  });
  const [lastName, setLastName] = useState(() => {
    const parts = user.name.split(' ');
    return parts.slice(1).join(' ') || '';
  });
  const [email, setEmail] = useState('sebastian@example.com'); // Default/Mock
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const { darkMode } = useTheme();

  // Theme classes
  const bgColor = darkMode ? 'bg-[#1b1b1b]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-white/20' : 'border-[#EBE9E9]';
  const inputBgColor = darkMode ? 'bg-[#2a2a2a]' : 'bg-[#F9F9F9]';
  const inputBorderColor = darkMode ? 'border-white/20' : 'border-[#EBE9E9]';
  const secondaryText = darkMode ? 'text-gray-400' : 'text-gray-500';
  const sectionBg = darkMode ? 'bg-[#1b1b1b]' : 'bg-white';
  const sectionBorder = darkMode ? 'border-white/20' : 'border-black';

  // Notification State
  const [notifications, setNotifications] = useState({
    newUploads: true,
    replies: false,
    dailySummary: true,
    approvalConfirmation: true, 
    statusUpdates: true, // New
    newProjects: true // New
  });

  // Mock Brand Data for the Client
  const brandColors = [
    { name: 'Primary Black', value: '#1b1b1b' },
    { name: 'Off White', value: '#F9F9F9' },
    { name: 'Accent Red', value: '#FF3B30' },
    { name: 'Hoffmeister Grey', value: '#EBE9E9' },
  ];

  const brandFonts = [
    { name: 'Overskrifter', value: 'Inter Bold' },
    { name: 'Brødtekst', value: 'Inter Regular' },
  ];

  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleSave = () => {
    if (firstName.trim()) {
        // In a real app, you would validate passwords match and update backend
        if (newPassword && newPassword !== confirmPassword) {
            alert("Adgangskoderne er ikke ens.");
            return;
        }
        onSave(firstName, lastName, email);
        if (newPassword) {
            setNewPassword('');
            setConfirmPassword('');
            alert("Adgangskode opdateret!");
        }
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
        ...prev,
        [key]: !prev[key]
    }));
  };

  return (
    <div className={`max-w-6xl mx-auto w-full p-3 md:p-10 pt-10 md:pt-10 ${textColor} min-h-screen`}>
      <div className="mb-10">
        <h2 className="text-4xl font-black uppercase mb-3 tracking-[-0.05em]">Indstillinger</h2>
      </div>

      <div className="space-y-10">
        {/* Top Row: Profile and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Profile Section */}
            <section className={`border ${sectionBorder} p-6 ${sectionBg} relative flex flex-col h-full transition-colors duration-300`}>
                <div className={`absolute -top-3 left-4 ${darkMode ? 'bg-white text-black' : 'bg-black text-white'} px-2.5 py-0.5 text-xs font-bold uppercase rotate-1 tracking-[-0.05em]`}>
                    Profil
                </div>
                
                <div className="space-y-5 flex-1">
                        <div>
                            <label className="block text-[10px] font-bold uppercase mb-1.5 tracking-[-0.05em]">Fornavn</label>
                            <input 
                                type="text" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`w-full ${inputBgColor} border ${inputBorderColor} p-3 text-lg font-bold focus:outline-none focus:border-${darkMode ? 'white' : 'black'} transition-colors ${textColor}`}
                                placeholder="Indtast fornavn"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase mb-1.5 tracking-[-0.05em]">Efternavn</label>
                            <input 
                                type="text" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`w-full ${inputBgColor} border ${inputBorderColor} p-3 text-lg font-bold focus:outline-none focus:border-${darkMode ? 'white' : 'black'} transition-colors ${textColor}`}
                                placeholder="Indtast efternavn"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase mb-1.5 tracking-[-0.05em]">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full ${inputBgColor} border ${inputBorderColor} p-3 text-lg font-bold focus:outline-none focus:border-${darkMode ? 'white' : 'black'} transition-colors ${textColor}`}
                        />
                    </div>

                    {/* Password Fields Integrated */}
                    <div className={`pt-5 border-t ${inputBorderColor}`}>
                        {/* Removed Header Text */}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold uppercase mb-1.5 tracking-[-0.05em]">Ny Adgangskode</label>
                                <div className="relative">
                                    <input 
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className={`w-full ${inputBgColor} border ${inputBorderColor} p-3 text-lg font-bold focus:outline-none focus:border-${darkMode ? 'white' : 'black'} transition-colors pr-10 ${textColor}`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className={`absolute right-3 top-1/2 -translate-y-1/2 ${secondaryText} hover:${textColor} transition-colors`}
                                    >
                                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase mb-1.5 tracking-[-0.05em]">Bekræft Adgangskode</label>
                                <div className="relative">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`w-full ${inputBgColor} border ${inputBorderColor} p-3 text-lg font-bold focus:outline-none focus:border-${darkMode ? 'white' : 'black'} transition-colors pr-10 ${textColor}`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className={`absolute right-3 top-1/2 -translate-y-1/2 ${secondaryText} hover:${textColor} transition-colors`}
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                    <button 
                        onClick={handleSave}
                        className={`w-full ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} px-5 py-2.5 font-bold uppercase flex items-center justify-center gap-2 transition-colors tracking-[-0.05em] text-sm`}
                    >
                        <Save size={16} /> Gem Ændringer
                    </button>
                </div>
            </section>

            {/* Notifications Section */}
            <section className={`border ${sectionBorder} p-8 ${sectionBg} relative flex flex-col h-full transition-colors duration-300`}>
                <div className={`absolute -top-3 left-4 ${darkMode ? 'bg-[#333] border-white/20 text-white' : 'bg-[#EBE9E9] border-black text-black'} border px-2.5 py-0.5 text-xs font-bold uppercase rotate-1 tracking-[-0.05em]`}>
                    Notifikationer
                </div>

                <div className="space-y-7 mt-4 flex-1">
                    <div onClick={() => toggleNotification('newUploads')} className="flex items-center gap-4 cursor-pointer group select-none">
                        <div className={`w-6 h-6 border-2 ${darkMode ? 'border-white' : 'border-black'} flex items-center justify-center transition-colors ${notifications.newUploads ? (darkMode ? 'bg-white' : 'bg-black') : (darkMode ? 'bg-transparent' : 'bg-white')}`}>
                            {notifications.newUploads && <div className={`w-2 h-2 ${darkMode ? 'bg-black' : 'bg-white'}`} />}
                        </div>
                        <span className="font-bold uppercase text-sm group-hover:underline tracking-tight">Send email ved nye uploads</span>
                    </div>

                    <div onClick={() => toggleNotification('replies')} className="flex items-center gap-4 cursor-pointer group select-none">
                        <div className={`w-6 h-6 border-2 ${darkMode ? 'border-white' : 'border-black'} flex items-center justify-center transition-colors ${notifications.replies ? (darkMode ? 'bg-white' : 'bg-black') : (darkMode ? 'bg-transparent' : 'bg-white')}`}>
                             {notifications.replies && <div className={`w-2 h-2 ${darkMode ? 'bg-black' : 'bg-white'}`} />}
                        </div>
                        <span className="font-bold uppercase text-sm group-hover:underline tracking-tight">Besked fra Hoffmeister Studio / HS</span>
                    </div>

                    <div onClick={() => toggleNotification('approvalConfirmation')} className="flex items-center gap-4 cursor-pointer group select-none">
                        <div className={`w-6 h-6 border-2 ${darkMode ? 'border-white' : 'border-black'} flex items-center justify-center transition-colors ${notifications.approvalConfirmation ? (darkMode ? 'bg-white' : 'bg-black') : (darkMode ? 'bg-transparent' : 'bg-white')}`}>
                             {notifications.approvalConfirmation && <div className={`w-2 h-2 ${darkMode ? 'bg-black' : 'bg-white'}`} />}
                        </div>
                        <span className="font-bold uppercase text-sm group-hover:underline tracking-tight">Bekræftelse på godkendelse</span>
                    </div>

                    <div onClick={() => toggleNotification('statusUpdates')} className="flex items-center gap-4 cursor-pointer group select-none">
                        <div className={`w-6 h-6 border-2 ${darkMode ? 'border-white' : 'border-black'} flex items-center justify-center transition-colors ${notifications.statusUpdates ? (darkMode ? 'bg-white' : 'bg-black') : (darkMode ? 'bg-transparent' : 'bg-white')}`}>
                             {notifications.statusUpdates && <div className={`w-2 h-2 ${darkMode ? 'bg-black' : 'bg-white'}`} />}
                        </div>
                        <span className="font-bold uppercase text-sm group-hover:underline tracking-tight">Status opdateringer</span>
                    </div>

                    <div onClick={() => toggleNotification('newProjects')} className="flex items-center gap-4 cursor-pointer group select-none">
                        <div className={`w-6 h-6 border-2 ${darkMode ? 'border-white' : 'border-black'} flex items-center justify-center transition-colors ${notifications.newProjects ? (darkMode ? 'bg-white' : 'bg-black') : (darkMode ? 'bg-transparent' : 'bg-white')}`}>
                             {notifications.newProjects && <div className={`w-2 h-2 ${darkMode ? 'bg-black' : 'bg-white'}`} />}
                        </div>
                        <span className="font-bold uppercase text-sm group-hover:underline tracking-tight">Nye projekter</span>
                    </div>

                    <div onClick={() => toggleNotification('dailySummary')} className="flex items-center gap-4 cursor-pointer group select-none">
                        <div className={`w-6 h-6 border-2 ${darkMode ? 'border-white' : 'border-black'} flex items-center justify-center transition-colors ${notifications.dailySummary ? (darkMode ? 'bg-white' : 'bg-black') : (darkMode ? 'bg-transparent' : 'bg-white')}`}>
                             {notifications.dailySummary && <div className={`w-2 h-2 ${darkMode ? 'bg-black' : 'bg-white'}`} />}
                        </div>
                        <span className="font-bold uppercase text-sm group-hover:underline tracking-tight">Daglig opsummering</span>
                    </div>
                </div>
            </section>
        </div>

        {/* Bottom Row: Brand Guide */}
        <section className={`border ${sectionBorder} p-6 ${sectionBg} relative transition-colors duration-300`}>
             <div className={`absolute -top-3 left-4 ${darkMode ? 'bg-[#333] border-white/20 text-white' : 'bg-[#EBE9E9] border-black text-black'} border px-2.5 py-0.5 text-xs font-bold uppercase -rotate-1 tracking-[-0.05em] flex items-center gap-2`}>
                Brand Guide
            </div>

            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Colors */}
                <div>
                    <span className={`text-[10px] font-bold ${secondaryText} uppercase tracking-wider mb-2.5 block`}>Farver</span>
                    <div className="grid grid-cols-1 gap-2.5">
                        {brandColors.map((color) => (
                            <button 
                                key={color.value}
                                onClick={() => handleCopy(color.value)}
                                className={`flex items-center gap-2.5 p-1.5 border ${inputBorderColor} ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-50'} transition-colors group text-left`}
                            >
                                <div className="w-6 h-6 border border-black/10 shadow-sm" style={{ backgroundColor: color.value }}></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-bold truncate uppercase">{color.name}</p>
                                    <p className={`text-[9px] ${secondaryText} font-mono`}>{color.value}</p>
                                </div>
                                {copiedColor === color.value ? <Check size={12} className="text-green-500" /> : <Copy size={12} className={`opacity-0 group-hover:opacity-100 ${secondaryText}`} />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fonts */}
                <div>
                     <span className={`text-[10px] font-bold ${secondaryText} uppercase tracking-wider mb-2.5 block`}>Typografi</span>
                     <div className="space-y-2.5">
                        {brandFonts.map((font) => (
                            <div key={font.name} className={`flex items-center gap-2.5 p-2.5 border ${inputBorderColor}`}>
                                <Type size={16} />
                                <div>
                                    <p className="text-xs font-bold uppercase">{font.name}</p>
                                    <p className={`text-[10px] ${secondaryText}`}>{font.value}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;

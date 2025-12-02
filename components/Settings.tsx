
import React, { useState } from 'react';
import { User } from '../types';
import { Save, Copy, Check, Type, Palette, ChevronDown, Eye, EyeOff } from 'lucide-react';

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
    { name: 'Primary Black', value: '#000000' },
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
    <div className="max-w-6xl mx-auto w-full p-3 md:p-10 pt-10 md:pt-10">
      <div className="mb-10">
        <h2 className="text-4xl font-black uppercase mb-3 tracking-[-0.05em]">Indstillinger</h2>
      </div>

      <div className="space-y-10">
        {/* Top Row: Profile and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Profile Section */}
            <section className="border border-black p-6 bg-white relative flex flex-col h-full">
                <div className="absolute -top-3 left-4 bg-black text-white px-2.5 py-0.5 text-xs font-bold uppercase rotate-1 tracking-[-0.05em]">
                    Profil
                </div>
                
                <div className="space-y-5 flex-1">
                        <div>
                            <label className="block text-[10px] font-bold uppercase mb-1.5 tracking-[-0.05em]">Fornavn</label>
                            <input 
                                type="text" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full bg-[#F9F9F9] border border-[#EBE9E9] p-3 text-lg font-bold focus:outline-none focus:border-black transition-colors"
                                placeholder="Indtast fornavn"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase mb-1.5 tracking-[-0.05em]">Efternavn</label>
                            <input 
                                type="text" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full bg-[#F9F9F9] border border-[#EBE9E9] p-3 text-lg font-bold focus:outline-none focus:border-black transition-colors"
                                placeholder="Indtast efternavn"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase mb-1.5 tracking-[-0.05em]">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#F9F9F9] border border-[#EBE9E9] p-3 text-lg font-bold focus:outline-none focus:border-black transition-colors"
                        />
                    </div>

                    {/* Password Fields Integrated */}
                    <div className="pt-5 border-t border-[#EBE9E9]">
                        {/* Removed Header Text */}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold uppercase mb-1.5 tracking-[-0.05em]">Ny Adgangskode</label>
                                <div className="relative">
                                    <input 
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full bg-[#F9F9F9] border border-[#EBE9E9] p-3 text-lg font-bold focus:outline-none focus:border-black transition-colors pr-10"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
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
                                        className="w-full bg-[#F9F9F9] border border-[#EBE9E9] p-3 text-lg font-bold focus:outline-none focus:border-black transition-colors pr-10"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
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
                        className="w-full bg-black text-white px-5 py-2.5 font-bold uppercase flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors tracking-[-0.05em] text-sm"
                    >
                        <Save size={16} /> Gem Ændringer
                    </button>
                </div>
            </section>

            {/* Notifications Section */}
            <section className="border border-black p-8 bg-white relative flex flex-col h-full">
                <div className="absolute -top-3 left-4 bg-[#EBE9E9] text-black border border-black px-2.5 py-0.5 text-xs font-bold uppercase rotate-1 tracking-[-0.05em]">
                    Notifikationer
                </div>

                <div className="space-y-7 mt-4 flex-1">
                    <div onClick={() => toggleNotification('newUploads')} className="flex items-center gap-4 cursor-pointer group select-none">
                        <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-colors ${notifications.newUploads ? 'bg-black' : 'bg-white'}`}>
                            {notifications.newUploads && <div className="w-2 h-2 bg-white" />}
                        </div>
                        <span className="font-bold uppercase text-sm group-hover:underline tracking-tight">Send email ved nye uploads</span>
                    </div>

                    <div onClick={() => toggleNotification('replies')} className="flex items-center gap-4 cursor-pointer group select-none">
                        <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-colors ${notifications.replies ? 'bg-black' : 'bg-white'}`}>
                             {notifications.replies && <div className="w-2 h-2 bg-white" />}
                        </div>
                        <span className="font-bold uppercase text-sm group-hover:underline tracking-tight">Besked fra Hoffmeister Studio / HS</span>
                    </div>

                    <div onClick={() => toggleNotification('approvalConfirmation')} className="flex items-center gap-4 cursor-pointer group select-none">
                        <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-colors ${notifications.approvalConfirmation ? 'bg-black' : 'bg-white'}`}>
                             {notifications.approvalConfirmation && <div className="w-2 h-2 bg-white" />}
                        </div>
                        <span className="font-bold uppercase text-sm group-hover:underline tracking-tight">Bekræftelse på godkendelse</span>
                    </div>

                    <div onClick={() => toggleNotification('statusUpdates')} className="flex items-center gap-4 cursor-pointer group select-none">
                        <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-colors ${notifications.statusUpdates ? 'bg-black' : 'bg-white'}`}>
                             {notifications.statusUpdates && <div className="w-2 h-2 bg-white" />}
                        </div>
                        <span className="font-bold uppercase text-sm group-hover:underline tracking-tight">Status opdateringer</span>
                    </div>

                    <div onClick={() => toggleNotification('newProjects')} className="flex items-center gap-4 cursor-pointer group select-none">
                        <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-colors ${notifications.newProjects ? 'bg-black' : 'bg-white'}`}>
                             {notifications.newProjects && <div className="w-2 h-2 bg-white" />}
                        </div>
                        <span className="font-bold uppercase text-sm group-hover:underline tracking-tight">Nye projekter</span>
                    </div>

                    <div onClick={() => toggleNotification('dailySummary')} className="flex items-center gap-4 cursor-pointer group select-none">
                        <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-colors ${notifications.dailySummary ? 'bg-black' : 'bg-white'}`}>
                             {notifications.dailySummary && <div className="w-2 h-2 bg-white" />}
                        </div>
                        <span className="font-bold uppercase text-sm group-hover:underline tracking-tight">Daglig opsummering</span>
                    </div>
                </div>
            </section>
        </div>

        {/* Bottom Row: Brand Guide */}
        <section className="border border-black p-6 bg-white relative">
             <div className="absolute -top-3 left-4 bg-[#EBE9E9] text-black border border-black px-2.5 py-0.5 text-xs font-bold uppercase -rotate-1 tracking-[-0.05em] flex items-center gap-2">
                Brand Guide
            </div>

            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Colors */}
                <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 block">Farver</span>
                    <div className="grid grid-cols-1 gap-2.5">
                        {brandColors.map((color) => (
                            <button 
                                key={color.value}
                                onClick={() => handleCopy(color.value)}
                                className="flex items-center gap-2.5 p-1.5 border border-[#EBE9E9] hover:bg-gray-50 transition-colors group text-left"
                            >
                                <div className="w-6 h-6 border border-black/10 shadow-sm" style={{ backgroundColor: color.value }}></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-bold truncate uppercase">{color.name}</p>
                                    <p className="text-[9px] text-gray-500 font-mono">{color.value}</p>
                                </div>
                                {copiedColor === color.value ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="opacity-0 group-hover:opacity-100 text-gray-400" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fonts */}
                <div>
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 block">Typografi</span>
                     <div className="space-y-2.5">
                        {brandFonts.map((font) => (
                            <div key={font.name} className="flex items-center gap-2.5 p-2.5 border border-[#EBE9E9]">
                                <Type size={16} />
                                <div>
                                    <p className="text-xs font-bold uppercase">{font.name}</p>
                                    <p className="text-[10px] text-gray-500">{font.value}</p>
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

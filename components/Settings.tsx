
import React, { useState } from 'react';
import { User } from '../types';
import { Save, Copy, Check, Type, Palette } from 'lucide-react';

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

  // Notification State
  const [notifications, setNotifications] = useState({
    newUploads: true,
    replies: false,
    dailySummary: true,
    approvalConfirmation: true, 
    statusUpdates: true, // New
    deadlines: false, // New
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
    { name: 'Primary', value: 'Inter Bold' },
    { name: 'Body', value: 'Inter Regular' },
  ];

  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleSave = () => {
    if (firstName.trim()) {
        onSave(firstName, lastName, email);
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
        ...prev,
        [key]: !prev[key]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto w-full p-4 md:p-12 pt-12 md:pt-12">
      <div className="mb-12">
        <h2 className="text-5xl font-black uppercase mb-4 tracking-[-0.05em]">Indstillinger</h2>
      </div>

      <div className="space-y-12">
        {/* Top Row: Profile and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Profile Section */}
            <section className="border border-black p-8 bg-white relative flex flex-col h-full">
                <div className="absolute -top-3 left-4 bg-black text-white px-3 py-1 text-sm font-bold uppercase rotate-1 tracking-[-0.05em]">
                    Profil
                </div>
                
                <div className="space-y-6 flex-1">
                    <div>
                        <label className="block text-xs font-bold uppercase mb-2 tracking-[-0.05em]">Fornavn</label>
                        <input 
                            type="text" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full bg-[#F9F9F9] border border-[#EBE9E9] p-4 text-xl font-bold focus:outline-none focus:border-black transition-colors"
                            placeholder="Indtast fornavn"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase mb-2 tracking-[-0.05em]">Efternavn</label>
                        <input 
                            type="text" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full bg-[#F9F9F9] border border-[#EBE9E9] p-4 text-xl font-bold focus:outline-none focus:border-black transition-colors"
                            placeholder="Indtast efternavn"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase mb-2 tracking-[-0.05em]">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#F9F9F9] border border-[#EBE9E9] p-4 text-xl font-bold focus:outline-none focus:border-black transition-colors"
                        />
                    </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                    <button 
                        onClick={handleSave}
                        className="w-full bg-black text-white px-6 py-3 font-bold uppercase flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors tracking-[-0.05em]"
                    >
                        <Save size={18} /> Gem Ændringer
                    </button>
                </div>
            </section>

            {/* Preferences / Notifications */}
            <section className="border border-black p-8 bg-white relative flex flex-col h-full">
                <div className="absolute -top-3 left-4 bg-[#EBE9E9] text-black border border-black px-3 py-1 text-sm font-bold uppercase rotate-1 tracking-[-0.05em]">
                    Notifikationer
                </div>

                <div className="space-y-6 mt-2 flex-1">
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

                    <div onClick={() => toggleNotification('deadlines')} className="flex items-center gap-4 cursor-pointer group select-none">
                        <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-colors ${notifications.deadlines ? 'bg-black' : 'bg-white'}`}>
                             {notifications.deadlines && <div className="w-2 h-2 bg-white" />}
                        </div>
                        <span className="font-bold uppercase text-sm group-hover:underline tracking-tight">Deadline påmindelser</span>
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
        <section className="border border-black p-8 bg-white relative">
             <div className="absolute -top-3 left-4 bg-[#EBE9E9] text-black border border-black px-3 py-1 text-sm font-bold uppercase -rotate-1 tracking-[-0.05em] flex items-center gap-2">
                Brand Guide
            </div>

            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Colors */}
                <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Farver</span>
                    <div className="grid grid-cols-1 gap-3">
                        {brandColors.map((color) => (
                            <button 
                                key={color.value}
                                onClick={() => handleCopy(color.value)}
                                className="flex items-center gap-3 p-2 border border-[#EBE9E9] hover:bg-gray-50 transition-colors group text-left"
                            >
                                <div className="w-8 h-8 border border-black/10 shadow-sm" style={{ backgroundColor: color.value }}></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold truncate uppercase">{color.name}</p>
                                    <p className="text-[10px] text-gray-500 font-mono">{color.value}</p>
                                </div>
                                {copiedColor === color.value ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="opacity-0 group-hover:opacity-100 text-gray-400" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fonts */}
                <div>
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Typografi</span>
                     <div className="space-y-3">
                        {brandFonts.map((font) => (
                            <div key={font.name} className="flex items-center gap-3 p-3 border border-[#EBE9E9]">
                                <Type size={18} />
                                <div>
                                    <p className="text-sm font-bold uppercase">{font.name}</p>
                                    <p className="text-xs text-gray-500">{font.value}</p>
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

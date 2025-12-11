import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Menu } from 'lucide-react';
import PublicSidebar from './PublicSidebar';
import LiveClock from './LiveClock';
import { useTheme } from './ThemeContext';

const Kontakt: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode } = useTheme();
  
  // Theme classes
  const bgColor = darkMode ? 'bg-[#1b1b1b]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-white/20' : 'border-[#EBE9E9]';
  const inputBgColor = darkMode ? 'bg-[#2a2a2a]' : 'bg-white';
  const inputFocusBgColor = darkMode ? 'focus:bg-[#333]' : 'focus:bg-[#F9F9F9]';
  const cardHoverBg = darkMode ? 'hover:bg-white/5' : 'hover:bg-[#F9F9F9]';
  const gridColor = darkMode ? '#ffffff' : '#1b1b1b';
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Live time for Copenhagen
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const budgetOptions = [
    { value: '', label: 'Vælg budget...' },
    { value: '5-10', label: '5.000 - 10.000 DKK' },
    { value: '10-20', label: '10.000 - 20.000 DKK' },
    { value: '20-40', label: '20.000 - 40.000 DKK' },
    { value: '40+', label: '40.000+ DKK' },
  ];
  
  const [budgetOpen, setBudgetOpen] = useState(false);

  return (
    <div className={`flex h-screen ${bgColor} ${textColor} font-sans overflow-hidden transition-colors duration-300 ${darkMode ? 'selection:bg-white selection:text-black' : 'selection:bg-black selection:text-white'}`}>
      
      {/* Mobile Header */}
      <div className={`md:hidden fixed top-0 left-0 right-0 h-16 ${bgColor} border-b ${borderColor} flex items-center justify-between px-6 z-40 transition-colors duration-300`}>
        <Link to="/" className="font-black uppercase tracking-[-0.05em] text-lg">Hoffmeister Studio</Link>
        <button onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <PublicSidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0 transition-colors duration-300">
        {/* Subtle Grid Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 transition-colors duration-300" 
             style={{ 
               backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        <div className="relative z-10">
          
          {/* Header Area - aligned with sidebar header border */}
          <div className={`${bgColor} w-full border-b ${borderColor} transition-colors duration-300`}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-12 h-[127px] flex items-center">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-[-0.05em] leading-none">
                KONTAKT
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-4 min-h-[calc(100vh-127px-200px)] flex flex-col">
            
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 h-full">
              
              {/* LEFT: Contact Form */}
              <div className={`border ${borderColor} p-6 ${bgColor} relative h-full flex flex-col transition-colors duration-300`}>

                {isSubmitted ? (
                  /* Success State */
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className={`w-14 h-14 border-2 ${darkMode ? 'border-white' : 'border-black'} flex items-center justify-center mb-5`}>
                      <Check size={28} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-[-0.05em] mb-2">Tak for din besked</h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-6`}>Vi vender tilbage inden for 24 timer.</p>
                    <button 
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', company: '', budget: '', message: '' });
                      }}
                      className={`${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} px-5 py-2.5 font-bold uppercase text-sm tracking-[-0.05em] transition-colors`}
                    >
                      Send ny besked
                    </button>
                  </div>
                ) : (
                  /* Form - Matching info cards style */
                  <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-4">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-black uppercase tracking-[-0.05em] block mb-1.5">Navn</label>
                        <input 
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={`w-full ${inputBgColor} border ${borderColor} p-3 text-xs font-bold focus:outline-none ${darkMode ? 'focus:border-white' : 'focus:border-black'} ${inputFocusBgColor} transition-colors`}
                          placeholder="Dit fulde navn"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-black uppercase tracking-[-0.05em] block mb-1.5">Email</label>
                        <input 
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`w-full ${inputBgColor} border ${borderColor} p-3 text-xs font-bold focus:outline-none ${darkMode ? 'focus:border-white' : 'focus:border-black'} ${inputFocusBgColor} transition-colors`}
                          placeholder="din@email.dk"
                        />
                      </div>
                    </div>

                    {/* Company & Budget Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-black uppercase tracking-[-0.05em] block mb-1.5">Virksomhed</label>
                        <input 
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={`w-full ${inputBgColor} border ${borderColor} p-3 text-xs font-bold focus:outline-none ${darkMode ? 'focus:border-white' : 'focus:border-black'} ${inputFocusBgColor} transition-colors`}
                          placeholder="Virksomhedsnavn"
                        />
                      </div>
                      <div className="relative">
                        <label className="text-sm font-black uppercase tracking-[-0.05em] block mb-1.5">Budget</label>
                        <button
                          type="button"
                          onClick={() => setBudgetOpen(!budgetOpen)}
                          className={`w-full ${inputBgColor} border ${borderColor} p-3 text-xs font-bold focus:outline-none ${darkMode ? 'focus:border-white' : 'focus:border-black'} transition-colors text-left flex items-center justify-between`}
                        >
                          <span className={formData.budget ? '' : (darkMode ? 'text-gray-500' : 'text-gray-400')}>
                            {formData.budget ? budgetOptions.find(o => o.value === formData.budget)?.label : 'Vælg budget...'}
                          </span>
                          <svg width="10" height="6" viewBox="0 0 12 8" fill="none" className={`transition-transform ${budgetOpen ? 'rotate-180' : ''}`}>
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        {/* Dropdown */}
                        {budgetOpen && (
                          <div className={`absolute top-full left-0 right-0 mt-1 ${inputBgColor} border ${borderColor} shadow-lg z-20`}>
                            {budgetOptions.filter(o => o.value).map(opt => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, budget: opt.value }));
                                  setBudgetOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs font-bold ${cardHoverBg} transition-colors ${formData.budget === opt.value ? (darkMode ? 'bg-white/10' : 'bg-[#F9F9F9]') : ''}`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message - Expands to fill space */}
                    <div className="flex-1 flex flex-col">
                      <label className="text-sm font-black uppercase tracking-[-0.05em] block mb-1.5">Besked</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className={`flex-1 w-full ${inputBgColor} border ${borderColor} p-3 text-xs font-bold focus:outline-none ${darkMode ? 'focus:border-white' : 'focus:border-black'} ${inputFocusBgColor} transition-colors resize-none`}
                        placeholder="Fortæl os om dit projekt, dine mål og din tidslinje..."
                      />
                    </div>

                    {/* Submit Button - Matching your button style */}
                    <button 
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                      className={`w-full ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} px-5 py-3 font-bold uppercase flex items-center justify-center gap-2 transition-colors tracking-[-0.05em] text-sm disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className={`w-4 h-4 border-2 ${darkMode ? 'border-black/30 border-t-black' : 'border-white/30 border-t-white'} rounded-full animate-spin`} />
                          <span>Sender...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Besked</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* RIGHT COLUMN: Info Cards + Map */}
              <div className="flex flex-col gap-3 h-full">
                {/* Info Cards - 2x2 Grid */}
                <div className="grid grid-cols-2 gap-3 content-start">
                  {/* Location */}
                  <div className={`p-4 border ${borderColor} group ${cardHoverBg} transition-colors ${bgColor}`}>
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'} block mb-0.5`}>Adresse</span>
                    <h4 className="text-sm font-black uppercase tracking-[-0.05em] mb-1.5">Besøg Os</h4>
                    <div className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                      <p>Åboulevarden 70, 3. sal</p>
                      <p>8000 Aarhus C</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className={`p-4 border ${borderColor} group ${cardHoverBg} transition-colors ${bgColor}`}>
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'} block mb-0.5`}>Email</span>
                    <h4 className="text-sm font-black uppercase tracking-[-0.05em] mb-1.5">Skriv Til Os</h4>
                    <div className="text-xs font-medium">
                      <a href="mailto:nikolaj@hoffmeisterstudio.com" className="hover:underline transition-colors">
                        nikolaj@hoffmeisterstudio.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className={`p-4 border ${borderColor} group ${cardHoverBg} transition-colors ${bgColor}`}>
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'} block mb-0.5`}>Telefon</span>
                    <h4 className="text-sm font-black uppercase tracking-[-0.05em] mb-1.5">Ring Til Os</h4>
                    <div className="text-xs font-medium">
                      <a href="tel:+4551141562" className="hover:underline transition-colors">
                        +45 51 14 15 62
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className={`p-4 border ${borderColor} group ${cardHoverBg} transition-colors ${bgColor}`}>
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'} block mb-0.5`}>Åbningstider</span>
                    <h4 className="text-sm font-black uppercase tracking-[-0.05em] mb-1.5">Vi Er Her</h4>
                    <div className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span>Man-Fre: </span>
                      <span className="font-bold">09-17</span>
                    </div>
                  </div>
                </div>

                {/* Map Container - Fills remaining space to align with form bottom */}
                <div className={`flex-1 border ${borderColor} relative overflow-hidden group`}>
                  {/* Map Image */}
                  <img 
                    src="/assets/aarhus-map.png" 
                    alt="Kort over Aarhus" 
                    className={`w-full h-full object-cover ${darkMode ? 'invert' : ''}`}
                  />
                  
                  {/* Location Marker - X cross made from rotated lines */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-5 h-5">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-full h-[2px] ${darkMode ? 'bg-gray-600' : 'bg-gray-400'} rotate-45`} />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-full h-[2px] ${darkMode ? 'bg-gray-600' : 'bg-gray-400'} -rotate-45`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* FOOTER */}
          <footer className={`px-8 md:px-16 py-8 border-t ${borderColor} mt-12 ${bgColor} transition-colors duration-300 min-h-[250px]`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full h-full items-start">
              {/* Left: Socials */}
              <div className="flex flex-col justify-between h-full">
                <span className="text-sm font-bold uppercase tracking-widest">©2025</span>
                <div className="flex flex-col gap-2">
                  <a href="https://www.linkedin.com/in/nikolaj-hoffmeister-3b50032a0/" target="_blank" rel="noopener noreferrer" className={`text-sm font-bold uppercase tracking-widest ${darkMode ? 'hover:text-gray-400' : 'hover:text-gray-500'} flex items-center gap-2`}>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>//</span> LinkedIn
                  </a>
                  <a href="https://www.instagram.com/hoffmeisterstudio/" target="_blank" rel="noopener noreferrer" className={`text-sm font-bold uppercase tracking-widest ${darkMode ? 'hover:text-gray-400' : 'hover:text-gray-500'} flex items-center gap-2`}>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>//</span> Instagram
                  </a>
                </div>
              </div>

              {/* Center: Clock */}
              <div className="flex justify-center items-center h-full">
                <div className="-mt-3 md:-translate-x-32">
                  <LiveClock />
                </div>
              </div>

              {/* Right: Contact */}
              <div className="flex flex-col justify-between h-full ml-auto">
                <div className="flex flex-col items-start leading-none">
                  <span className="text-3xl font-black tracking-[-0.05em] uppercase -mb-1">Hoffmeister</span>
                  <span className="text-3xl font-black tracking-[-0.05em] uppercase">Studio</span>
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <a href="mailto:nikolaj@hoffmeisterstudio.com" className="text-sm font-bold uppercase tracking-widest hover:underline flex flex-col items-start">
                    <span>nikolaj@</span>
                    <span>hoffmeisterstudio.com</span>
                  </a>
                  <a href="tel:+4551141562" className="text-sm font-bold uppercase tracking-widest hover:underline">+45 51 14 15 62</a>
                </div>
              </div>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
};

export default Kontakt;

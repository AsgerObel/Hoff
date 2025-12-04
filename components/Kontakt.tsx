import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Menu } from 'lucide-react';
import PublicSidebar from './PublicSidebar';
import LiveClock from './LiveClock';

const Kontakt: React.FC = () => {
  const borderColor = "border-[#EBE9E9]";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Live time for Copenhagen
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('da-DK', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

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
    <div className="flex h-screen bg-white text-black font-sans overflow-hidden selection:bg-black selection:text-white">
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#EBE9E9] flex items-center justify-between px-6 z-40">
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
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0">
        {/* Subtle Grid Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
             style={{ 
               backgroundImage: 'linear-gradient(#1b1b1b 1px, transparent 1px), linear-gradient(90deg, #1b1b1b 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        <div className="relative z-10">
          
          {/* Header Area - aligned with sidebar header border */}
          <div className="bg-white w-full border-b border-[#EBE9E9]">
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
              <div className={`border ${borderColor} p-6 bg-white relative h-full flex flex-col`}>

                {isSubmitted ? (
                  /* Success State */
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 border-2 border-black flex items-center justify-center mb-5">
                      <Check size={28} className="text-black" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-[-0.05em] mb-2">Tak for din besked</h3>
                    <p className="text-gray-500 text-sm mb-6">Vi vender tilbage inden for 24 timer.</p>
                    <button 
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', company: '', budget: '', message: '' });
                      }}
                      className="bg-black text-white px-5 py-2.5 font-bold uppercase text-sm tracking-[-0.05em] hover:bg-gray-800 transition-colors"
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
                        <label className="text-sm font-black uppercase tracking-[-0.05em] text-black block mb-1.5">Navn</label>
                        <input 
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-[#EBE9E9] p-3 text-xs font-bold text-black focus:outline-none focus:border-black focus:bg-[#F9F9F9] transition-colors"
                          placeholder="Dit fulde navn"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-black uppercase tracking-[-0.05em] text-black block mb-1.5">Email</label>
                        <input 
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-[#EBE9E9] p-3 text-xs font-bold text-black focus:outline-none focus:border-black focus:bg-[#F9F9F9] transition-colors"
                          placeholder="din@email.dk"
                        />
                      </div>
                    </div>

                    {/* Company & Budget Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-black uppercase tracking-[-0.05em] text-black block mb-1.5">Virksomhed</label>
                        <input 
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full bg-white border border-[#EBE9E9] p-3 text-xs font-bold text-black focus:outline-none focus:border-black focus:bg-[#F9F9F9] transition-colors"
                          placeholder="Virksomhedsnavn"
                        />
                      </div>
                      <div className="relative">
                        <label className="text-sm font-black uppercase tracking-[-0.05em] text-black block mb-1.5">Budget</label>
                        <button
                          type="button"
                          onClick={() => setBudgetOpen(!budgetOpen)}
                          className="w-full bg-white border border-[#EBE9E9] p-3 text-xs font-bold text-black focus:outline-none focus:border-black transition-colors text-left flex items-center justify-between"
                        >
                          <span className={formData.budget ? 'text-black' : 'text-gray-400'}>
                            {formData.budget ? budgetOptions.find(o => o.value === formData.budget)?.label : 'Vælg budget...'}
                          </span>
                          <svg width="10" height="6" viewBox="0 0 12 8" fill="none" className={`transition-transform ${budgetOpen ? 'rotate-180' : ''}`}>
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        {/* Dropdown */}
                        {budgetOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#EBE9E9] shadow-lg z-20">
                            {budgetOptions.filter(o => o.value).map(opt => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, budget: opt.value }));
                                  setBudgetOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs font-bold text-black hover:bg-[#F9F9F9] transition-colors ${formData.budget === opt.value ? 'bg-[#F9F9F9]' : ''}`}
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
                      <label className="text-sm font-black uppercase tracking-[-0.05em] text-black block mb-1.5">Besked</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="flex-1 w-full bg-white border border-[#EBE9E9] p-3 text-xs font-bold text-black focus:outline-none focus:border-black focus:bg-[#F9F9F9] transition-colors resize-none"
                        placeholder="Fortæl os om dit projekt, dine mål og din tidslinje..."
                      />
                    </div>

                    {/* Submit Button - Matching your button style */}
                    <button 
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                      className="w-full bg-black text-white px-5 py-3 font-bold uppercase flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors tracking-[-0.05em] text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                  <div className={`p-4 border ${borderColor} group hover:bg-[#F9F9F9] transition-colors bg-white`}>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block mb-0.5">Adresse</span>
                    <h4 className="text-sm font-black uppercase tracking-[-0.05em] mb-1.5">Besøg Os</h4>
                    <div className="text-xs font-medium text-gray-600 leading-relaxed">
                      <p>Åboulevarden 70, 3. sal</p>
                      <p>8000 Aarhus C</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className={`p-4 border ${borderColor} group hover:bg-[#F9F9F9] transition-colors bg-white`}>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block mb-0.5">Email</span>
                    <h4 className="text-sm font-black uppercase tracking-[-0.05em] mb-1.5">Skriv Til Os</h4>
                    <div className="text-xs font-medium">
                      <a href="mailto:hej@hoffmeister.dk" className="text-black hover:underline transition-colors">
                        hej@hoffmeister.dk
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className={`p-4 border ${borderColor} group hover:bg-[#F9F9F9] transition-colors bg-white`}>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block mb-0.5">Telefon</span>
                    <h4 className="text-sm font-black uppercase tracking-[-0.05em] mb-1.5">Ring Til Os</h4>
                    <div className="text-xs font-medium">
                      <a href="tel:+4512345678" className="text-black hover:underline transition-colors">
                        +45 12 34 56 78
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className={`p-4 border ${borderColor} group hover:bg-[#F9F9F9] transition-colors bg-white`}>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block mb-0.5">Åbningstider</span>
                    <h4 className="text-sm font-black uppercase tracking-[-0.05em] mb-1.5">Vi Er Her</h4>
                    <div className="text-xs font-medium text-gray-600">
                      <span>Man-Fre: </span>
                      <span className="font-bold text-black">09-17</span>
                    </div>
                  </div>
                </div>

                {/* Map Container - Fills remaining space to align with form bottom */}
                <div className={`flex-1 border ${borderColor} relative overflow-hidden group`}>
                  {/* Map Image */}
                  <img 
                    src="/assets/aarhus-map.png" 
                    alt="Kort over Aarhus" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Location Marker - X cross made from rotated lines */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-5 h-5">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-[2px] bg-gray-400 rotate-45" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-[2px] bg-gray-400 -rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* FOOTER */}
          <footer className="px-8 md:px-16 py-10 border-t border-[#EBE9E9] mt-12 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full h-full items-start">
              {/* Left: Socials */}
              <div className="flex flex-col justify-between h-full">
                <span className="text-sm font-bold uppercase tracking-widest">©2025</span>
                <div className="flex flex-col gap-2 mt-8">
                  <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-gray-500 flex items-center gap-2">
                    <span className="text-gray-300">//</span> LinkedIn
                  </a>
                  <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-gray-500 flex items-center gap-2">
                    <span className="text-gray-300">//</span> Instagram
                  </a>
                </div>
              </div>

              {/* Center: Clock */}
              <div className="flex justify-center items-center h-full">
                <div className="-mt-3">
                  <LiveClock />
                </div>
              </div>

              {/* Right: Contact */}
              <div className="flex flex-col justify-between h-full md:text-right">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-[-0.05em] leading-none">HOFFMEISTER</h3>
                  <h3 className="text-2xl font-black uppercase tracking-[-0.05em] leading-none">STUDIO</h3>
                </div>
                <div className="flex flex-col gap-1 mt-8">
                  <a href="mailto:NIKOLAJ@gmail.com" className="text-sm font-bold uppercase tracking-widest hover:underline">NIKOLAJ@gmail.com</a>
                  <span className="text-sm font-bold uppercase tracking-widest">+45123456789</span>
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

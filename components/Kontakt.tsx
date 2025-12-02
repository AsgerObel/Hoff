import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Mail, Phone, Clock, ArrowUpRight, Check, ArrowLeft } from 'lucide-react';

const Kontakt: React.FC = () => {
  const borderColor = "border-[#EBE9E9]";
  
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
    { value: '25-50', label: '25.000 - 50.000 DKK' },
    { value: '50-100', label: '50.000 - 100.000 DKK' },
    { value: '100-250', label: '100.000 - 250.000 DKK' },
    { value: '250+', label: '250.000+ DKK' },
  ];

  return (
    <div className="flex h-screen bg-white text-black font-sans overflow-hidden selection:bg-black selection:text-white">
      
      {/* SIDEBAR - Same style as Portal */}
      <aside className="hidden md:flex flex-col border-r border-[#EBE9E9] h-screen bg-white w-64 shrink-0">
        {/* Brand Header */}
        <div className="h-32 border-b border-[#EBE9E9] p-6 flex items-center">
          <Link to="/" className="text-3xl font-black leading-tight tracking-[-0.05em] uppercase hover:opacity-70 transition-opacity">
            Hoffmeister<br />Studio
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <Link
            to="/"
            className="w-full text-left p-6 h-[77px] border-b border-[#EBE9E9] text-xl font-bold transition-colors hover:bg-[#EBE9E9] flex items-center gap-4 bg-white"
          >
            <ArrowLeft size={20} />
            <span className="tracking-[-0.05em]">Tilbage</span>
          </Link>
          <div className="w-full text-left p-6 h-[77px] border-b border-[#EBE9E9] text-xl font-bold bg-[#EBE9E9] flex items-center gap-4">
            <span className="tracking-[-0.05em]">Kontakt</span>
          </div>
        </nav>

        {/* Bottom Info */}
        <div className="mt-auto border-t border-[#EBE9E9] p-6">
          <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            <p>56° 09' N — 10° 12' E</p>
            <p className="mt-1">Aarhus, Danmark</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Subtle Grid Background Pattern - Same as Portal */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
             style={{ 
               backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#EBE9E9] flex items-center justify-between px-6 z-40">
          <Link to="/" className="font-black uppercase tracking-[-0.05em] text-lg">Hoffmeister Studio</Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-[-0.05em]">
            <ArrowLeft size={16} />
          </Link>
        </div>

        <div className="relative z-10 animate-enter pt-16 md:pt-0">
          
          {/* Header Area - Same structure as Dashboard */}
          <div className="bg-white w-full">
            <div className="max-w-[1200px] mx-auto px-4 md:px-12 pt-8 md:pt-0 mb-0 flex flex-col justify-end md:h-[110px]">
              <div className="md:pb-4 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-black uppercase mb-2 md:mb-0 tracking-[-0.05em] leading-none">
                  KONTAKT
                </h1>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-8 md:py-12">
            
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              
              {/* LEFT: Contact Form */}
              <div className="bg-[#F9F9F9] p-6 md:p-10 relative border border-[#EBE9E9]">
                {/* Decorative Element */}
                <div className="absolute top-6 right-6 md:top-8 md:right-8 text-[10px] font-bold uppercase tracking-widest text-gray-300">
                  {formattedTime} — AARHUS
                </div>

                {isSubmitted ? (
                  /* Success State */
                  <div className="text-center py-16 animate-enter">
                    <div className="w-16 h-16 bg-black mx-auto mb-6 flex items-center justify-center">
                      <Check size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-[-0.05em] mb-3">TAK FOR DIN BESKED</h3>
                    <p className="text-gray-500 text-sm mb-6">Vi vender tilbage inden for 24 timer.</p>
                    <button 
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', company: '', budget: '', message: '' });
                      }}
                      className="border border-black px-6 py-2.5 font-bold uppercase text-xs tracking-[-0.05em] hover:bg-black hover:text-white transition-colors"
                    >
                      Send ny besked
                    </button>
                  </div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">
                        // KONTAKTFORMULAR
                      </span>
                      <h3 className="text-xl font-black uppercase tracking-[-0.05em]">Fortæl os om dit projekt</h3>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="block text-[10px] font-bold uppercase mb-2 tracking-[-0.05em]">
                          Navn <span className="text-[#FF3B30]">*</span>
                        </label>
                        <input 
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={`w-full bg-white border ${focusedField === 'name' ? 'border-black' : 'border-[#EBE9E9]'} p-3 text-sm font-medium focus:outline-none transition-colors`}
                          placeholder="Dit fulde navn"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-[10px] font-bold uppercase mb-2 tracking-[-0.05em]">
                          Email <span className="text-[#FF3B30]">*</span>
                        </label>
                        <input 
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={`w-full bg-white border ${focusedField === 'email' ? 'border-black' : 'border-[#EBE9E9]'} p-3 text-sm font-medium focus:outline-none transition-colors`}
                          placeholder="din@email.dk"
                        />
                      </div>
                    </div>

                    {/* Company & Budget Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="block text-[10px] font-bold uppercase mb-2 tracking-[-0.05em]">
                          Virksomhed
                        </label>
                        <input 
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('company')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full bg-white border ${focusedField === 'company' ? 'border-black' : 'border-[#EBE9E9]'} p-3 text-sm font-medium focus:outline-none transition-colors`}
                          placeholder="Virksomhedsnavn"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-[10px] font-bold uppercase mb-2 tracking-[-0.05em]">
                          Budget
                        </label>
                        <select 
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('budget')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full bg-white border ${focusedField === 'budget' ? 'border-black' : 'border-[#EBE9E9]'} p-3 text-sm font-medium focus:outline-none transition-colors appearance-none cursor-pointer`}
                        >
                          {budgetOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        {/* Custom dropdown arrow */}
                        <div className="absolute right-3 top-[calc(50%+4px)] pointer-events-none">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <label className="block text-[10px] font-bold uppercase mb-2 tracking-[-0.05em]">
                        Besked <span className="text-[#FF3B30]">*</span>
                      </label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={5}
                        className={`w-full bg-white border ${focusedField === 'message' ? 'border-black' : 'border-[#EBE9E9]'} p-3 text-sm font-medium focus:outline-none transition-colors resize-none`}
                        placeholder="Fortæl os om dit projekt, dine mål og din tidslinje..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                      className="w-full bg-black text-white p-4 font-bold uppercase text-sm tracking-[-0.05em] hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
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

              {/* RIGHT: Info Cards */}
              <div className="space-y-4">
                {/* Location */}
                <div className={`p-6 border ${borderColor} group hover:bg-[#F9F9F9] transition-colors bg-white`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Adresse</span>
                      <h4 className="text-lg font-black uppercase tracking-[-0.05em] mb-3">Besøg Os</h4>
                      <div className="text-sm font-medium text-gray-600 leading-relaxed">
                        <p>Åboulevarden 70, 3. sal</p>
                        <p>8000 Aarhus C</p>
                        <p className="mt-2 text-gray-400">Danmark</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className={`p-6 border ${borderColor} group hover:bg-[#F9F9F9] transition-colors bg-white`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Email</span>
                      <h4 className="text-lg font-black uppercase tracking-[-0.05em] mb-3">Skriv Til Os</h4>
                      <div className="text-sm font-medium">
                        <a href="mailto:hej@hoffmeister.dk" className="text-black hover:underline transition-colors">
                          hej@hoffmeister.dk
                        </a>
                        <p className="text-gray-400 mt-2">Vi svarer inden for 24 timer</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className={`p-6 border ${borderColor} group hover:bg-[#F9F9F9] transition-colors bg-white`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center shrink-0">
                      <Phone size={18} />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Telefon</span>
                      <h4 className="text-lg font-black uppercase tracking-[-0.05em] mb-3">Ring Til Os</h4>
                      <div className="text-sm font-medium">
                        <a href="tel:+4512345678" className="text-black hover:underline transition-colors">
                          +45 12 34 56 78
                        </a>
                        <p className="text-gray-400 mt-2">Man-Fre: 09:00 - 17:00</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className={`p-6 border ${borderColor} group hover:bg-[#F9F9F9] transition-colors bg-white`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center shrink-0">
                      <Clock size={18} />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Åbningstider</span>
                      <h4 className="text-lg font-black uppercase tracking-[-0.05em] mb-3">Vi Er Her</h4>
                      <div className="text-sm font-medium text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Mandag - Fredag</span>
                          <span className="font-bold text-black">09:00 - 17:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Weekend</span>
                          <span className="text-gray-400">Lukket</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Kontakt;

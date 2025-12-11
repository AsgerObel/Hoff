import React from 'react';
import { Link } from 'react-router-dom';
import LiveClock from './LiveClock';
import { useTheme } from './ThemeContext';

const LandingPage: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  
  // Theme classes
  const bgColor = darkMode ? 'bg-[#1b1b1b]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-white/20' : 'border-[#EBE9E9]';
  const hoverBg = darkMode ? 'hover:bg-white/10' : 'hover:bg-[#EBE9E9]';
  
  const marqueeServices = "BRAND IDENTITY — WEB DESIGN — ART DIRECTION — DIGITAL STRATEGY — CAMPAIGN — SOCIAL MEDIA — ";

  return (
    <div className={`flex h-screen ${bgColor} ${textColor} font-sans overflow-hidden transition-colors duration-300 ${darkMode ? 'selection:bg-white selection:text-black' : 'selection:bg-black selection:text-white'}`}>
      
      {/* LEFT FIXED COLUMN */}
      <div className={`w-[188px] flex flex-col justify-between border-r ${borderColor} relative z-50 transition-colors duration-300`}>
          {/* Top Left: SERVICES */}
          <Link to="/services" className={`h-24 flex items-center justify-center border-b ${borderColor} ${bgColor} ${hoverBg} transition-colors cursor-pointer`}>
              <span className="text-lg font-bold uppercase tracking-[-0.05em]">SERVICES</span>
          </Link>

          {/* Middle Decoration (Optional) */}
          <div className="flex-1 flex flex-col justify-center items-center">
              <div className={`text-[11px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'} rotate-180 [writing-mode:vertical-rl]`}>
                  EST. 2025 — AARHUS
              </div>
          </div>

          {/* Bottom Left: CASES */}
          <Link to="/cases" className={`h-[72px] flex items-center justify-center border-t ${borderColor} ${bgColor} ${hoverBg} transition-colors cursor-pointer`}>
              <span className="text-lg font-bold uppercase tracking-[-0.05em]">CASES</span>
          </Link>
      </div>

      {/* CENTER SCROLLABLE COLUMN */}
      <div className="flex-1 flex flex-col overflow-y-auto relative scrollbar-hide transition-colors duration-300">
          
          {/* Sticky Header: LOGO */}
          <header className={`sticky top-0 z-40 ${darkMode ? 'bg-[#1b1b1b]/95' : 'bg-white/95'} backdrop-blur-sm h-24 shrink-0 flex items-center justify-center border-b ${borderColor} transition-colors duration-300`}>
              <div className="flex flex-col items-start leading-none group">
                <span className="text-3xl font-black tracking-[-0.05em] uppercase -mb-1">
                    Hoffmeister
                </span>
                <div className="flex items-center gap-2">
                    <span className="text-3xl font-black tracking-[-0.05em] uppercase">
                        Studio
                    </span>
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
          </header>

          {/* HERO VIDEO - Adjusted for alignment */}
          <div className={`w-full flex flex-col items-center justify-center relative group border-b ${borderColor} min-h-[calc(100vh-6rem)]`}>
               <div className="w-full h-full absolute inset-0 bg-[url('https://picsum.photos/1600/900?grayscale')] bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
               <div className={`relative z-10 ${bgColor} p-6 border ${darkMode ? 'border-white' : 'border-black'} ${darkMode ? 'shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'} transition-colors duration-300`}>
                  <span className="text-xl font-bold uppercase tracking-[-0.05em]">SHOWREEL 2025</span>
               </div>
          </div>

          {/* MARQUEE */}
          <div className={`border-b ${borderColor} py-6 overflow-hidden ${darkMode ? 'bg-white text-black' : 'bg-black text-white'} transition-colors duration-300`}>
            <div className="animate-marquee whitespace-nowrap flex gap-8">
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-4xl md:text-6xl font-black uppercase tracking-[-0.05em] opacity-80">
                        {marqueeServices}
                    </span>
                ))}
            </div>
          </div>

          {/* PROJECTS LIST */}
          <div>
              {/* Project 1 */}
              <div className={`min-h-[600px] border-b ${borderColor} relative group overflow-hidden flex flex-col justify-end p-12`}>
                  <img src="https://picsum.photos/1200/800?random=1" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 z-0" alt="Mols Linjen" />
                  <div className="relative z-10 flex justify-between items-end text-white mix-blend-difference">
                       <span className="text-9xl font-black leading-none opacity-50">01</span>
                       <h2 className="text-6xl font-black uppercase tracking-[-0.05em] leading-none text-right">MOLS<br/>LINJEN</h2>
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-0 pointer-events-none"></div>
              </div>

               {/* Project 2 */}
               <div className={`min-h-[600px] border-b ${borderColor} relative group overflow-hidden flex flex-col justify-end p-12`}>
                  <img src="https://picsum.photos/1200/800?random=2" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 z-0" alt="Nordic Seaplanes" />
                   <div className="relative z-10 flex justify-between items-end text-white mix-blend-difference">
                       <h2 className="text-6xl font-black uppercase tracking-[-0.05em] leading-none text-left">NORDIC<br/>SEAPLANES</h2>
                       <span className="text-9xl font-black leading-none opacity-50">02</span>
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-0 pointer-events-none"></div>
              </div>
          </div>

          {/* MANIFESTO */}
          <section className={`${darkMode ? 'bg-white text-black' : 'bg-black text-white'} p-16 md:py-32 text-center border-b ${borderColor} transition-colors duration-300`}>
             <p className="text-3xl md:text-5xl font-bold uppercase leading-tight tracking-[-0.05em] max-w-4xl mx-auto">
                "Brutally simple digital products for complex problems."
             </p>
             <button className={`mt-12 border ${darkMode ? 'border-black hover:bg-black hover:text-white' : 'border-white hover:bg-white hover:text-black'} px-8 py-4 text-lg font-bold uppercase tracking-widest transition-colors`}>
                Start a Project
             </button>
          </section>

          {/* FOOTER CONTENT (Newsletter, Legal) */}
          <footer className={`px-16 py-8 border-t ${borderColor} mt-64 ${bgColor} transition-colors duration-300 min-h-[250px]`}>
             <div className="grid grid-cols-3 w-full h-full items-start">
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

                {/* Center: Clock - Aligned to top with others */}
                <div className="flex justify-center items-center h-full">
                    <div className="-mt-3">
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

      {/* RIGHT FIXED COLUMN */}
      <div className={`w-[188px] flex flex-col justify-between border-l ${borderColor} relative z-50 transition-colors duration-300`}>
          {/* Top Right: LOGIN */}
          <div className={`h-24 flex items-center justify-center border-b ${borderColor} ${bgColor} ${hoverBg} transition-colors cursor-pointer`}>
              <Link to="/login" className="text-lg font-bold uppercase tracking-[-0.05em] w-full h-full flex items-center justify-center">LOGIN</Link>
          </div>

          {/* Middle Decoration */}
          <div className="flex-1 flex flex-col justify-center items-center">
          </div>

          {/* Bottom Right: KONTAKT */}
          <Link to="/kontakt" className={`h-[72px] flex items-center justify-center border-t ${borderColor} ${bgColor} ${hoverBg} transition-colors cursor-pointer`}>
              <span className="text-lg font-bold uppercase tracking-[-0.05em]">KONTAKT</span>
          </Link>
      </div>

    </div>
  );
};

export default LandingPage;

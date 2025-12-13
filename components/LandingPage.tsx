import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LiveClock from './LiveClock';
import { useTheme } from './ThemeContext';

const LandingPage: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [introComplete, setIntroComplete] = useState(false);
  const [introFading, setIntroFading] = useState(false);

  useEffect(() => {
    // Start fade-out efter logo animation (2.2s)
    const fadeTimer = setTimeout(() => {
      setIntroFading(true);
    }, 2200);

    // Afslut intro efter fade-out (3s total)
    const completeTimer = setTimeout(() => {
      setIntroComplete(true);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, []);
  
  // Theme classes
  const bgColor = darkMode ? 'bg-[#1b1b1b]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-white/20' : 'border-[#EBE9E9]';
  const hoverBg = darkMode ? 'hover:bg-white/10' : 'hover:bg-[#EBE9E9]';
  
  const marqueeServices = "BRAND IDENTITY — WEB DESIGN — ART DIRECTION — DIGITAL STRATEGY — CAMPAIGN — SOCIAL MEDIA — ";

  return (
    <>
      {/* INTRO OVERLAY */}
      {!introComplete && (
        <div 
          className={`fixed inset-0 z-[100] bg-[#1b1b1b] flex items-center justify-center transition-opacity duration-700 ${introFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <div className="flex flex-col items-start leading-none animate-intro-logo">
            <span className="text-4xl md:text-6xl font-black tracking-[-0.05em] uppercase text-white -mb-1">
              Hoffmeister
            </span>
            <div className="flex items-center gap-4">
              <span className="text-4xl md:text-6xl font-black tracking-[-0.05em] uppercase text-white">
                Studio
              </span>
              <img 
                src="/assets/LogoDarkmode.png" 
                alt="Hoffmeister Logo" 
                className="w-10 h-10 md:w-14 md:h-14 object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className={`flex h-screen ${bgColor} ${textColor} font-sans overflow-hidden transition-all duration-500 ${darkMode ? 'selection:bg-white selection:text-black' : 'selection:bg-black selection:text-white'} ${!introComplete ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* LEFT FIXED COLUMN */}
      <div className={`w-[188px] flex flex-col justify-between border-r ${borderColor} relative z-50 transition-colors duration-300`}>
          {/* Top Left: SERVICES */}
          <Link to="/services" className={`h-24 flex items-center justify-center border-b ${borderColor} ${bgColor} ${hoverBg} transition-colors cursor-pointer`}>
              <span className="text-lg font-bold uppercase tracking-[-0.05em]">SERVICES</span>
          </Link>

          {/* Middle Spacer */}
          <div className="flex-1"></div>

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
                    <div className="relative group/logo">
                      <button 
                        onClick={toggleDarkMode}
                        className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-all duration-300 hover:scale-110 flex-shrink-0"
                      >
                        <img 
                          src={darkMode ? '/assets/LogoDarkmode.png' : '/assets/Logo.png'} 
                          alt="Hoffmeister Logo" 
                          className="w-full h-full object-contain"
                        />
                      </button>
                      {/* Tooltip - positioned to the right */}
                      <div className={`absolute top-1/2 -translate-y-1/2 left-full ml-3 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover/logo:opacity-100 transition-all duration-200 translate-x-1 group-hover/logo:translate-x-0 pointer-events-none ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                        {darkMode ? 'LIGHT MODE' : 'DARK MODE'}
                        {/* Arrow pointing left */}
                        <div className={`absolute top-1/2 -translate-y-1/2 right-full w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] ${darkMode ? 'border-r-white' : 'border-r-black'}`}></div>
                      </div>
                    </div>
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

          {/* === SPACER SECTION WITH GRID LINES === */}
          <div className={`border-b ${borderColor} grid grid-cols-3 min-h-[300px] md:min-h-[500px]`}>
              <div className={`border-r ${borderColor}`}></div>
              <div className={`border-r ${borderColor}`}></div>
              <div></div>
          </div>

          {/* === SECTION 01: CASES === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-2">
                  {/* Text Side - Border Right to create vertical line */}
                  <div className={`flex flex-col justify-center md:border-r ${borderColor}`}>
                      {/* Top Content - Vertically Centered with Min Height */}
                      <div className="p-8 md:p-16 min-h-[350px] flex flex-col justify-center">
                          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                            Selected<br/>Work
                          </h2>
                      </div>
                      
                      {/* Full Width Separator Line */}
                      <div className={`w-full h-px ${darkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                      
                      {/* Bottom Content */}
                      <div className="p-8 md:p-16 min-h-[250px] flex flex-col justify-center gap-8">
                        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-white' : 'text-black'} font-light max-w-lg`}>
                          Vi tror på strategisk design, der skaber reel forretningsværdi. Gennem en dybdegående proces bygger vi brands med substans, karakter og en digital tilstedeværelse, der ikke bare ses, men mærkes af målgruppen.
                        </p>
                      </div>
                  </div>
                  {/* Image Side */}
                  <div className={`relative group aspect-[4/5] md:aspect-auto min-h-[600px] border-t md:border-t-0 ${borderColor}`}>
                      <img src="/assets/cases/ro-gus/Brand In Action.png" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0" alt="Cases" />
                  </div>
              </div>
          </section>

          {/* === SECTION 02: SERVICES === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-2">
                  {/* Image Side */}
                  <div className={`relative group aspect-[4/5] md:aspect-auto min-h-[600px] md:border-r ${borderColor} order-2 md:order-1`}>
                      <img src="/assets/cases/nordbrew/Mockups - packaging.png" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0" alt="Services" />
                  </div>
                  {/* Text Side */}
                  <div className={`flex flex-col justify-center order-1 md:order-2 border-b md:border-b-0 ${borderColor}`}>
                      {/* Top Content - Vertically Centered with Min Height */}
                      <div className="p-8 md:p-16 min-h-[350px] flex flex-col justify-center">
                          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                            Core<br/>Services
                          </h2>
                      </div>

                      {/* Full Width Separator Line */}
                      <div className={`w-full h-px ${darkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>

                      {/* Bottom Content */}
                      <div className="p-8 md:p-16 min-h-[250px] flex flex-col justify-center gap-8">
                        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-white' : 'text-black'} font-light max-w-lg`}>
                          Fra skarp visuel identitet til kompleks webudvikling. Vi leverer en komplet pakke, der sikrer, at dit brand står konsistent og professionelt på alle platforme. Vi tænker i helheder frem for enkeltstående løsninger.
                        </p>
                      </div>
                  </div>
              </div>
          </section>

          {/* === SECTION 03: PORTAL === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-2">
                  {/* Text Side */}
                  <div className={`flex flex-col justify-center md:border-r ${borderColor}`}>
                      {/* Top Content - Vertically Centered with Min Height */}
                      <div className="p-8 md:p-16 min-h-[350px] flex flex-col justify-center">
                          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                            Client<br/>Portal
                          </h2>
                      </div>

                      {/* Full Width Separator Line */}
                      <div className={`w-full h-px ${darkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>

                      {/* Bottom Content */}
                      <div className="p-8 md:p-16 min-h-[250px] flex flex-col justify-center gap-8">
                        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-white' : 'text-black'} font-light max-w-lg`}>
                          Fuld transparens og kontrol gennem hele processen. Vores skræddersyede klient-portal giver dig et samlet overblik over tidslinjer, filer og godkendelser, så du altid er opdateret på projektets fremdrift.
                        </p>
                      </div>
                  </div>
                  {/* Image Side */}
                  <div className={`relative group aspect-[4/5] md:aspect-auto min-h-[600px] border-t md:border-t-0 ${borderColor} flex items-center justify-center ${darkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
                      <div className="text-center transform transition-transform duration-700 group-hover:scale-110">
                          <span className="text-6xl md:text-8xl mb-6 block">🔐</span>
                          <span className="text-sm font-bold uppercase tracking-widest opacity-50">Secure Access</span>
                      </div>
                  </div>
              </div>
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
    </>
  );
};

export default LandingPage;

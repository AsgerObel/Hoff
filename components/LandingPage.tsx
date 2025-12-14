import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import LiveClock from './LiveClock';
import { useTheme } from './ThemeContext';

const LandingPage: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  
  // Check if intro has already been shown this session
  const hasSeenIntro = sessionStorage.getItem('introShown') === 'true';
  
  const [introComplete, setIntroComplete] = useState(hasSeenIntro);
  const [introFading, setIntroFading] = useState(hasSeenIntro);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    { title: 'Digital Design', id: '01', items: ['UI', 'UX', 'App Design', 'Prototyping'] },
    { title: 'Branding', id: '02', items: ['Strategy', 'Tone of Voice', 'Guidelines'] },
    { title: 'Visuel Identitet', id: '03', items: ['Logo Design', 'Art Direction', 'Packaging'] },
    { title: 'Hjemmeside Design', id: '04', items: ['Web Design', 'Landing Pages', 'Interaction'] },
    { title: 'SoMe Optimering', id: '05', items: ['Social Media', 'Campaigns', 'Content'] },
    { title: 'Kode', id: '06', items: ['Frontend', 'React', 'Creative Coding'] },
  ];

  const caseImages = [
    '/cases/ro-gus/Brand%20in%20Action.png',
    '/cases/nordbrew/Mockups%20-%20packaging.png',
    '/cases/echobloom/Echobloom%20Records%201.png',
    '/cases/lava/maanedens-ret.png',
    '/cases/dubs-donkraft/Artboard%201.png',
    '/cases/ro-gus/Cup%20of%20Coffee.png',
    '/cases/nordbrew/Mockups%20-%20packaging%202.png',
    '/cases/echobloom/Echobloom%20Records%202.png',
    '/cases/grenaa-chocolaterier/Artboard%201.png',
    '/cases/lava/frokost-post.png',
    '/cases/ro-gus/Street%20Poster.png',
    '/cases/nordbrew/Nordbrew%20label.png',
    '/cases/echobloom/Echobloom%20Records%203.png',
    '/cases/grenaa-chocolaterier/Greena%20Business%20Card%201.png',
    '/cases/ro-gus/Wall%20Sign.png'
  ];

  useEffect(() => {
    // Skip intro if already shown this session
    if (hasSeenIntro) return;
    
    // Start fade-out efter logo animation (2.2s)
    const fadeTimer = setTimeout(() => {
      setIntroFading(true);
    }, 2200);

    // Afslut intro efter fade-out (3s total)
    const completeTimer = setTimeout(() => {
      setIntroComplete(true);
      sessionStorage.setItem('introShown', 'true');
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [hasSeenIntro]);
  
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

          {/* === PLATFORM SECTION 01: INTRO === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-2">
                  {/* Text Side */}
                  <div className={`flex flex-col justify-center md:border-r ${borderColor}`}>
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[250px] flex flex-col justify-center">
                          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                            Feedback<br/>Redefined
                          </h2>
                      </div>
                      
                      <div className={`w-full h-px ${darkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                      
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[150px] flex flex-col justify-center">
                        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-white' : 'text-black'} font-light max-w-lg`}>
                          Glem rodede mail-tråde og mistede filer. Vores skræddersyede feedback-platform samler al kommunikation, godkendelser og revisioner ét sted — så du altid har overblikket.
                        </p>
                      </div>
                  </div>
                  {/* Visual Side */}
                  <div className={`relative aspect-square md:aspect-auto md:min-h-[500px] border-t md:border-t-0 ${borderColor} flex items-center justify-center ${darkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
                      <div className="text-center transform transition-transform duration-700 hover:scale-110">
                          <span className="text-7xl md:text-9xl mb-6 block">💬</span>
                          <span className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Real-time Feedback</span>
                      </div>
                  </div>
              </div>
          </section>

          {/* === ASYMMETRIC SPACER === */}
          <div className={`border-b ${borderColor} grid grid-cols-[3fr_1fr] min-h-[150px]`}>
              <div className={`border-r ${borderColor}`}></div>
              <div></div>
          </div>

          {/* === PLATFORM SECTION 02: USP === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-2">
                  {/* Visual Side */}
                  <div className={`relative aspect-square md:aspect-auto md:min-h-[500px] md:border-r ${borderColor} flex items-center justify-center ${darkMode ? 'bg-[#111]' : 'bg-gray-50'} order-2 md:order-1`}>
                      <div className="grid grid-cols-2 gap-8 p-8">
                          <div className="text-center transform transition-transform duration-500 hover:scale-110">
                              <span className="text-5xl md:text-6xl block mb-2">⚡</span>
                              <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Hurtigere</span>
                          </div>
                          <div className="text-center transform transition-transform duration-500 hover:scale-110">
                              <span className="text-5xl md:text-6xl block mb-2">🎯</span>
                              <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Præcis</span>
                          </div>
                          <div className="text-center transform transition-transform duration-500 hover:scale-110">
                              <span className="text-5xl md:text-6xl block mb-2">🔒</span>
                              <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Sikker</span>
                          </div>
                          <div className="text-center transform transition-transform duration-500 hover:scale-110">
                              <span className="text-5xl md:text-6xl block mb-2">✨</span>
                              <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Simpel</span>
                          </div>
                      </div>
                  </div>
                  {/* Text Side */}
                  <div className={`flex flex-col justify-center border-b md:border-b-0 ${borderColor} order-1 md:order-2`}>
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[250px] flex flex-col justify-center">
                          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                            Hvorfor<br/>Os?
                          </h2>
                      </div>
                      
                      <div className={`w-full h-px ${darkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                      
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[150px] flex flex-col justify-center">
                        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-white' : 'text-black'} font-light max-w-lg`}>
                          Andre bureauer sender PDFs frem og tilbage. Vi giver dig en dedikeret portal med live-preview, versionering og kommentarer direkte på designet. Du sparer tid, vi undgår misforståelser.
                        </p>
                      </div>
                  </div>
              </div>
          </section>

          {/* === ASYMMETRIC SPACER === */}
          <div className={`border-b ${borderColor} grid grid-cols-[1fr_3fr] min-h-[150px]`}>
              <div className={`border-r ${borderColor}`}></div>
              <div></div>
          </div>

          {/* === PLATFORM SECTION 03: FEATURES === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-3">
                  {/* Feature 1 */}
                  <div className={`p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r ${borderColor} min-h-[300px]`}>
                      <span className="text-4xl md:text-5xl mb-6">📁</span>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-[-0.05em] mb-4">Alt Samlet</h3>
                      <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-light`}>
                        Filer, feedback og godkendelser samlet på én platform. Ingen flere "kan du sende den igen?" mails.
                      </p>
                  </div>
                  
                  {/* Feature 2 */}
                  <div className={`p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r ${borderColor} min-h-[300px]`}>
                      <span className="text-4xl md:text-5xl mb-6">👆</span>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-[-0.05em] mb-4">Klik & Kommenter</h3>
                      <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-light`}>
                        Peg direkte på det element du vil ændre. Vi ser præcis hvad du mener — ingen gætterier.
                      </p>
                  </div>
                  
                  {/* Feature 3 */}
                  <div className={`p-8 md:p-12 flex flex-col justify-center min-h-[300px]`}>
                      <span className="text-4xl md:text-5xl mb-6">📊</span>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-[-0.05em] mb-4">Fuld Historik</h3>
                      <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-light`}>
                        Se alle versioner, ændringer og beslutninger. Perfekt til teams der skal holdes i sync.
                      </p>
                  </div>
              </div>
          </section>

          {/* === SPACER BEFORE CASES === */}
          <div className={`border-b ${borderColor} grid grid-cols-[2fr_1fr] min-h-[200px]`}>
              <div className={`border-r ${borderColor}`}></div>
              <div></div>
          </div>

          {/* === SECTION 01: CASES === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-2">
                  {/* Text Side - Border Right to create vertical line */}
                  <div className={`flex flex-col justify-center md:border-r ${borderColor}`}>
                      {/* Top Content - Vertically Centered with Min Height */}
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[250px] flex flex-col justify-center">
                          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                            Selected<br/>Work
                          </h2>
                      </div>
                      
                      {/* Full Width Separator Line */}
                      <div className={`w-full h-px ${darkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                      
                      {/* Bottom Content */}
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[150px] flex flex-col justify-center gap-8">
                        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-white' : 'text-black'} font-light max-w-lg`}>
                          Vi tror på strategisk design, der skaber reel forretningsværdi. Gennem en dybdegående proces bygger vi brands med substans, karakter og en digital tilstedeværelse, der ikke bare ses, men mærkes af målgruppen.
                        </p>
                      </div>
                  </div>
                  {/* Image Side - Interactive Grid */}
                  <div 
                    className={`relative aspect-square md:aspect-auto border-t md:border-t-0 ${borderColor} overflow-hidden ${bgColor} p-4`}
                    onMouseLeave={() => setHoveredImageIndex(null)}
                  >
                      {/* Selected Image Overlay */}
                      {selectedImageIndex !== null && (
                        <div 
                          className="absolute inset-0 z-30 flex items-center justify-center p-8 cursor-pointer animate-fade-in"
                          style={{ backgroundColor: darkMode ? 'rgba(27,27,27,0.95)' : 'rgba(255,255,255,0.95)' }}
                          onClick={() => setSelectedImageIndex(null)}
                        >
                          <img 
                            src={caseImages[selectedImageIndex]} 
                            className="max-w-[85%] max-h-[85%] object-contain shadow-2xl animate-modal-in"
                            alt={`Case ${selectedImageIndex + 1}`} 
                          />
                          <button 
                            className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-sm font-bold ${darkMode ? 'text-white hover:text-gray-400' : 'text-black hover:text-gray-600'} transition-colors`}
                            onClick={() => setSelectedImageIndex(null)}
                          >
                            ✕
                          </button>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-5 grid-rows-3 gap-3 h-full p-2">
                        {caseImages.map((src, index) => {
                          const isHovered = hoveredImageIndex === index;
                          const isAnyHovered = hoveredImageIndex !== null;
                          const isBlurred = isAnyHovered && !isHovered;
                          
                          return (
                            <div 
                              key={src}
                              className="relative overflow-hidden cursor-pointer"
                              onMouseEnter={() => setHoveredImageIndex(index)}
                              onClick={() => setSelectedImageIndex(index)}
                            >
                              <img 
                                src={src} 
                                className={`w-full h-full object-contain transition-all duration-500 ${
                                  isHovered 
                                    ? 'grayscale-0 scale-110 z-20' 
                                    : isBlurred 
                                      ? 'grayscale blur-[1px] scale-95 opacity-50' 
                                      : 'grayscale'
                                }`}
                                alt={`Case ${index + 1}`} 
                              />
                            </div>
                          );
                        })}
                      </div>
                  </div>
              </div>
          </section>

          {/* === SPACER BETWEEN CASES AND SERVICES === */}
          <div className={`border-b ${borderColor} grid grid-cols-[1fr_2fr_1fr] min-h-[300px] md:min-h-[500px]`}>
              <div className={`border-r ${borderColor} relative overflow-hidden group flex items-center justify-center p-8`}>
                  <img 
                    src="/cases/ro-gus/Bag%20Mockup%20on%20the%20Wall.png" 
                    alt="Ro Gus Detail" 
                    className="w-[75%] h-auto object-contain grayscale hover:grayscale-0 transition-all duration-500"
                  />
              </div>
              <div className={`border-r ${borderColor} relative overflow-hidden group flex items-center justify-center p-8`}>
                  <img 
                    src="/cases/dubs-donkraft/Dubs%20&%20Donkraft%20poster%20mockup.png" 
                    alt="Dubs Detail" 
                    className="w-[60%] h-auto object-contain grayscale hover:grayscale-0 transition-all duration-500"
                  />
              </div>
              <div className="relative overflow-hidden group flex items-center justify-center p-8">
                  <img 
                    src="/cases/nordbrew/Mockups%20-%20packaging%203.png" 
                    alt="Nordbrew Detail" 
                    className="w-[75%] h-auto object-contain grayscale hover:grayscale-0 transition-all duration-500"
                  />
              </div>
          </div>

          {/* === EXTRA SPACER BELOW IMAGES === */}
          <div className={`border-b ${borderColor} grid grid-cols-[2fr_1fr] min-h-[200px]`}>
              <div className={`border-r ${borderColor}`}></div>
              <div></div>
          </div>

          {/* === SECTION 02: SERVICES === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-[1fr_2fr]">
                  {/* Left: Title */}
                  <div className={`flex flex-col justify-start md:border-r ${borderColor} border-b md:border-b-0`}>
                      {/* Top Content */}
                      <div className="py-10 px-6 md:py-16 md:pl-8 md:pr-16">
                          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                            Services
                          </h2>
                      </div>
                      
                      {/* Full Width Separator Line */}
                      <div className={`w-full h-px ${darkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                      
                      {/* Bottom Spacer */}
                      <div className="flex-1"></div>
                  </div>
                  
                  {/* Right: Services List */}
                  <div className="flex flex-col">
                      {services.map((service, index) => (
                        <Link
                          key={index}
                          to="/services"
                          className={`group flex items-center justify-between p-6 md:py-8 md:px-10 border-b last:border-b-0 ${borderColor} ${hoverBg} transition-all duration-300 cursor-pointer`}
                          onMouseEnter={() => setHoveredService(index)}
                          onMouseLeave={() => setHoveredService(null)}
                        >
                          <div className="flex flex-col gap-2">
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-[-0.05em]">
                              {service.title}
                            </h3>
                            <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              {service.items.join(' — ')}
                            </span>
                          </div>
                          <span className={`transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1`}>
                            <ArrowUpRight size={16} />
                          </span>
                        </Link>
                      ))}
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

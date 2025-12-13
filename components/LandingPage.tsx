import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LiveClock from './LiveClock';
import { useTheme } from './ThemeContext';

const LandingPage: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [introComplete, setIntroComplete] = useState(false);
  const [introFading, setIntroFading] = useState(false);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    { title: 'Digital Design', id: '01', items: ['UI/UX', 'App Design', 'Prototyping'] },
    { title: 'Branding', id: '02', items: ['Strategy', 'Tone of Voice', 'Guidelines'] },
    { title: 'Visuel Identitet', id: '03', items: ['Logo', 'Art Direction', 'Packaging'] },
    { title: 'Web Design', id: '04', items: ['Landing Pages', 'Corporate', 'Campaign'] },
    { title: 'Social Media', id: '05', items: ['Content', 'Campaigns', 'Analytics'] },
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

          {/* === SECTION 02: SERVICES === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-2">
                  {/* Interactive Services Grid */}
                  <div 
                    className={`relative md:min-h-[500px] md:border-r ${borderColor} order-2 md:order-1 ${bgColor} p-0`}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                      <div className="grid grid-cols-2 grid-rows-3 h-full">
                        {services.map((service, index) => {
                          const isHovered = hoveredService === index;
                          const isAnyHovered = hoveredService !== null;
                          const isFaded = isAnyHovered && !isHovered;
                          
                          // Borders logic:
                          // Right border for odd items (0, 2, 4)
                          // Bottom border for first 4 items (0, 1, 2, 3)
                          const hasRightBorder = index % 2 === 0;
                          const hasBottomBorder = index < 4;
                          
                          return (
                            <Link
                              key={index}
                              to="/services"
                              className={`relative flex flex-col justify-between p-8 transition-all duration-500 cursor-pointer overflow-hidden group 
                                ${hasRightBorder ? `border-r ${borderColor}` : ''} 
                                ${hasBottomBorder ? `border-b ${borderColor}` : ''}
                                ${isFaded ? 'opacity-30 blur-[1px]' : ''}
                              `}
                              onMouseEnter={() => setHoveredService(index)}
                            >
                              
                              {/* Content Container */}
                              <div className="flex flex-col h-full justify-center">
                                <h3 className={`text-xl md:text-2xl font-black uppercase tracking-[-0.05em] leading-none mb-4 transition-transform duration-300 origin-left ${isHovered ? 'scale-110' : ''}`}>
                                  {service.title}
                                </h3>
                                
                                {/* Sub-items list */}
                                <ul className={`flex flex-col gap-1 transition-all duration-300 ${
                                  isHovered ? 'opacity-100 translate-y-0 h-auto mt-2' : 'opacity-0 translate-y-4 h-0 overflow-hidden mt-0'
                                }`}>
                                  {service.items.map((item, i) => (
                                    <li key={i} className={`text-xs font-medium uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                  </div>
                  {/* Text Side */}
                  <div className={`flex flex-col justify-center order-1 md:order-2 border-b md:border-b-0 ${borderColor}`}>
                      {/* Top Content - Vertically Centered with Min Height */}
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[250px] flex flex-col justify-center">
                          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                            Core<br/>Services
                          </h2>
                      </div>

                      {/* Full Width Separator Line */}
                      <div className={`w-full h-px ${darkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>

                      {/* Bottom Content */}
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[150px] flex flex-col justify-center gap-8">
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
                      <div className="p-8 md:p-16 min-h-[250px] flex flex-col justify-center">
                          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                            Client<br/>Portal
                          </h2>
                      </div>

                      {/* Full Width Separator Line */}
                      <div className={`w-full h-px ${darkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>

                      {/* Bottom Content */}
                      <div className="p-8 md:p-16 min-h-[150px] flex flex-col justify-center gap-8">
                        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-white' : 'text-black'} font-light max-w-lg`}>
                          Fuld transparens og kontrol gennem hele processen. Vores skræddersyede klient-portal giver dig et samlet overblik over tidslinjer, filer og godkendelser, så du altid er opdateret på projektets fremdrift.
                        </p>
                      </div>
                  </div>
                  {/* Image Side */}
                  <div className={`relative group aspect-square md:aspect-auto md:min-h-[400px] border-t md:border-t-0 ${borderColor} flex items-center justify-center ${darkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
                      <div className="text-center transform transition-transform duration-700 group-hover:scale-110">
                          <span className="text-6xl md:text-8xl mb-6 block">🔐</span>
                          <span className="text-sm font-bold uppercase tracking-widest opacity-50">Secure Access</span>
                      </div>
                  </div>
              </div>
          </section>

          {/* === SECTION 04: MANIFESTO (Centered Layout) === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-4 min-h-[500px]">
                  {/* Left Spacer */}
                  <div className={`border-b md:border-b-0 md:border-r ${borderColor} hidden md:block`}></div>
                  
                  {/* Content (Middle 2 Columns) */}
                  <div className={`md:col-span-2 p-12 md:p-24 flex flex-col justify-center text-center items-center border-b md:border-b-0 md:border-r ${borderColor}`}>
                      <span className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-8 block`}>04 — Philosophy</span>
                      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.05em] leading-[0.95] mb-8">
                        No Bullshit.<br/>Just Design.
                      </h2>
                      <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-white' : 'text-black'} font-light max-w-md`}>
                         Vi fjerner støjen og fokuserer på det essentielle. Vores designfilosofi bygger på klarhed, funktion og æstetik der holder. Ingen unødvendige elementer, kun ren effekt.
                      </p>
                  </div>

                  {/* Right Spacer */}
                  <div className="hidden md:block"></div>
              </div>
          </section>

          {/* === SECTION 05: DETAILS (2x2 Grid) === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                  
                  {/* Quadrant 1: Image */}
                  <div className={`relative aspect-square md:aspect-auto md:min-h-[400px] border-b ${borderColor} md:border-r ${darkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
                      <img src="/cases/lava/maanedens-ret.png" className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500" alt="Detail 1" />
                  </div>

                  {/* Quadrant 2: Text */}
                  <div className={`p-12 flex flex-col justify-center border-b ${borderColor}`}>
                      <span className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-4`}>Strategy</span>
                      <h3 className="text-2xl font-black uppercase tracking-[-0.05em]">Digital First</h3>
                      <p className={`text-sm mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-light`}>
                        Vi tænker digitalt fra start. Brands lever online, og vi sikrer at dit brand performer på alle skærme.
                      </p>
                  </div>

                  {/* Quadrant 3: Text */}
                  <div className={`p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r ${borderColor}`}>
                      <span className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-4`}>Craft</span>
                      <h3 className="text-2xl font-black uppercase tracking-[-0.05em]">Pixel Perfect</h3>
                      <p className={`text-sm mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-light`}>
                        Hver detalje tæller. Vi nørder pixels, grid-systemer og typografi til det sidder lige i skabet.
                      </p>
                  </div>

                  {/* Quadrant 4: Image */}
                  <div className={`relative aspect-square md:aspect-auto md:min-h-[400px] ${darkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
                      <img src="/cases/dubs-donkraft/Artboard%201.png" className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500" alt="Detail 2" />
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

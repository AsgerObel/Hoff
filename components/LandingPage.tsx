import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import LiveClock from './LiveClock';
import { useTheme } from './ThemeContext';

// Scroll-triggered Video Component
const ScrollVideo: React.FC<{ src: string; className?: string; onClick?: () => void }> = ({ src, className, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
            video.currentTime = 0; // Reset to start
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% visible
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      className={`${className} ${onClick ? 'cursor-pointer hover:scale-[1.02] transition-transform duration-300' : ''}`}
      onClick={onClick}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

const LandingPage: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  
  // Check if intro has already been shown this session
  const hasSeenIntro = sessionStorage.getItem('introShown') === 'true';
  
  const [introComplete, setIntroComplete] = useState(hasSeenIntro);
  const [introFading, setIntroFading] = useState(hasSeenIntro);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const services = [
    { title: 'Digital Design', id: '01', items: ['User Interface', 'User Experience', 'App Design', 'Prototyping', 'Design Systems', 'Wireframing'] },
    { title: 'Branding', id: '02', items: ['Strategy', 'Tone of Voice', 'Guidelines', 'Brand Architecture'] },
    { title: 'Visuel Identitet', id: '03', items: ['Visual Identity', 'Logo Design', 'Art Direction', 'Packaging', 'Motion Graphics'] },
    { title: 'Hjemmeside Design', id: '04', items: ['Web Design', 'Landing Pages', 'Corporate Sites', 'Campaign Sites', 'Interaction'] },
    { title: 'SoMe Optimering', id: '05', items: ['Social Media', 'Campaigns', 'Strategy', 'Analytics', 'Content Creation'] },
    { title: 'Skræddersyet Kode', id: '06', items: ['Frontend', 'Creative Coding', 'React / Next.js', 'API Integration'] },
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

          {/* HERO - GRADIENT FLOW */}
          <div className={`w-full flex flex-col items-center justify-center relative border-b ${borderColor} min-h-[calc(100vh-6rem)] overflow-hidden`}>
               {/* Gradient Background */}
               <div className="absolute inset-0 gradient-container"></div>
               
               {/* Gradient Overlay */}
               <div className="absolute inset-0 gradient-overlay"></div>
               
               {/* Floating Orbs */}
               <div className="absolute inset-0 overflow-hidden">
                   <div className="orb orb1 absolute w-[300px] h-[300px] bg-[#EBE9E9] top-[20%] left-[10%]"></div>
                   <div className="orb orb2 absolute w-[400px] h-[400px] bg-[#F9F9F9] top-[60%] right-[15%]"></div>
                   <div className="orb orb3 absolute w-[250px] h-[250px] bg-[#1B1B1B] bottom-[10%] left-[40%]"></div>
               </div>
          </div>

          {/* === SPACER SECTION WITH GRID LINES === */}
          <div className={`border-b ${borderColor} grid grid-cols-2 min-h-[150px] md:min-h-[250px]`}>
              <div className={`border-r ${borderColor}`}></div>
              <div></div>
          </div>

          {/* === INTRODUCTION SECTION === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-2">
                  {/* Left Column - Title */}
                  <div className={`flex flex-col justify-center md:border-r ${borderColor} py-16 px-6 md:py-24 md:pl-8 md:pr-16`}>
                      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.05em] leading-tight mb-6">
                        Dit Design.<br/>Din Platform.
                      </h2>
                  </div>
                  {/* Right Column - Text */}
                  <div className={`flex flex-col justify-center py-16 px-6 md:py-24 md:px-12 border-t md:border-t-0 ${borderColor}`}>
                      <div className="max-w-xl">
                        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-white/80' : 'text-black/80'} font-light`}>
                          Vi har bygget en platform, der samler alt dit designarbejde ét sted. Glem alt om endeløse mailtråde og forvirrende feedback-runder. Her kan du følge med i dine projekter i realtid, give feedback direkte på designet og godkende med ét enkelt klik. Det handler om gennemsigtighed og effektivitet. Vi har fjernet støjen, så vi kan fokusere på det vigtigste: at skabe stærke resultater sammen.
                        </p>
                      </div>
                  </div>
              </div>
          </section>

          {/* === ASYMMETRIC SPACER === */}
          <div className={`border-b ${borderColor} grid grid-cols-[1fr_2fr] min-h-[120px] md:min-h-[180px]`}>
              <div className={`border-r ${borderColor}`}></div>
              <div></div>
          </div>

          {/* === PLATFORM VIDEO 01: KOMMENTAR === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-2">
                  {/* Text Side */}
                  <div className={`flex flex-col justify-center md:border-r ${borderColor}`}>
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[250px] flex flex-col justify-center">
                          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                            Direkte<br/>Feedback
                          </h2>
                      </div>
                      
                      <div className={`w-full h-px ${darkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                      
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[150px] flex flex-col justify-center">
                        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-white' : 'text-black'} font-light max-w-lg`}>
                          Giv feedback direkte på designet. Klik præcis hvor du vil have ændringer, og skriv din kommentar. Vi ser det med det samme — ingen misforståelser.
                        </p>
                      </div>
                  </div>
                  {/* Video Side */}
                  <div className={`relative aspect-video md:aspect-auto md:min-h-[600px] border-t md:border-t-0 ${borderColor} overflow-hidden flex items-center justify-center`}>
                      <ScrollVideo 
                        src="/assets/Kommentar%201.mp4"
                        className="w-full h-full object-contain"
                        onClick={() => setSelectedVideo("/assets/Kommentar%201.mp4")}
                      />
                  </div>
              </div>
          </section>

          {/* === ASYMMETRIC SPACER === */}
          <div className={`border-b ${borderColor} grid grid-cols-[3fr_1fr] min-h-[150px]`}>
              <div className={`border-r ${borderColor}`}></div>
              <div></div>
          </div>

          {/* === PLATFORM VIDEO 02: OVERBLIK === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-2">
                  {/* Video Side */}
                  <div className={`relative aspect-video md:aspect-auto md:min-h-[600px] md:border-r ${borderColor} overflow-hidden order-2 md:order-1 flex items-center justify-center`}>
                      <ScrollVideo 
                        src="/assets/Forside%20video%20-%20feedbackplatform%20system%202.mp4"
                        className="w-full h-full object-contain"
                        onClick={() => setSelectedVideo("/assets/Forside%20video%20-%20feedbackplatform%20system%202.mp4")}
                      />
                  </div>
                  {/* Text Side */}
                  <div className={`flex flex-col justify-center border-b md:border-b-0 ${borderColor} order-1 md:order-2`}>
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[250px] flex flex-col justify-center">
                          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                            Fuld<br/>Overblik
                          </h2>
                      </div>
                      
                      <div className={`w-full h-px ${darkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                      
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[150px] flex flex-col justify-center">
                        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-white' : 'text-black'} font-light max-w-lg`}>
                          Se alle dine designprojekter samlet ét sted. Få overblik over hvad der er i gang, hvad der venter på dig, og hvad der er færdigt.
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

          {/* === PLATFORM VIDEO 03: SORTERING === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-2">
                  {/* Text Side */}
                  <div className={`flex flex-col justify-center md:border-r ${borderColor}`}>
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[250px] flex flex-col justify-center">
                          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                            Aldrig<br/>Gå Glip
                          </h2>
                      </div>
                      
                      <div className={`w-full h-px ${darkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                      
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[150px] flex flex-col justify-center">
                        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-white' : 'text-black'} font-light max-w-lg`}>
                          Sortér efter status og se hvad der venter på din godkendelse. Du får besked når noget er klar — så du aldrig misser en deadline.
                        </p>
                      </div>
                  </div>
                  {/* Video Side */}
                  <div className={`relative aspect-video md:aspect-auto md:min-h-[600px] border-t md:border-t-0 ${borderColor} overflow-hidden flex items-center justify-center`}>
                      <ScrollVideo 
                        src="/assets/Forside%20video%20feedbackplatform%20sortering%203.mp4"
                        className="w-full h-full object-contain"
                        onClick={() => setSelectedVideo("/assets/Forside%20video%20feedbackplatform%20sortering%203.mp4")}
                      />
                  </div>
              </div>
          </section>

          {/* === ASYMMETRIC SPACER === */}
          <div className={`border-b ${borderColor} grid grid-cols-[2fr_1fr] min-h-[150px]`}>
              <div className={`border-r ${borderColor}`}></div>
              <div></div>
          </div>

          {/* === PLATFORM VIDEO 04: GODKEND === */}
          <section className={`border-b ${borderColor}`}>
              <div className="grid md:grid-cols-2">
                  {/* Video Side */}
                  <div className={`relative aspect-video md:aspect-auto md:min-h-[600px] md:border-r ${borderColor} overflow-hidden order-2 md:order-1 flex items-center justify-center`}>
                      <ScrollVideo 
                        src="/assets/Godkendt%204.mp4"
                        className="w-full h-full object-contain"
                        onClick={() => setSelectedVideo("/assets/Godkendt%204.mp4")}
                      />
                  </div>
                  {/* Text Side */}
                  <div className={`flex flex-col justify-center border-b md:border-b-0 ${borderColor} order-1 md:order-2`}>
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[250px] flex flex-col justify-center">
                          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                            Godkend<br/>& Færdig
                          </h2>
                      </div>
                      
                      <div className={`w-full h-px ${darkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                      
                      <div className="py-8 px-6 md:py-16 md:pl-8 md:pr-16 min-h-[150px] flex flex-col justify-center">
                        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-white' : 'text-black'} font-light max-w-lg`}>
                          Er du tilfreds? Godkend med ét klik, og vi færdiggør projektet. Simpelt, hurtigt og uden unødvendige mails frem og tilbage.
                        </p>
                      </div>
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
                            Udvalgte<br/>Cases
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

          {/* === CTA SECTION === */}
          <section className="">
              <div className="grid md:grid-cols-[2fr_1fr] min-h-[300px]">
                  {/* Left: Text & CTA */}
                  <div className={`flex flex-col justify-center md:border-r ${borderColor} py-16 px-6 md:py-24 md:pl-8 md:pr-16`}>
                      <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9] mb-6">
                        Kontakt Os
                      </h2>
                      
                      <Link 
                        to="/kontakt"
                        className={`flex items-center gap-3 text-xl md:text-2xl font-black uppercase tracking-[-0.02em] hover:opacity-60 transition-opacity ml-1 ${darkMode ? 'text-white' : 'text-black'}`}
                      >
                        Book et møde <ArrowUpRight size={28} />
                      </Link>
                  </div>
                  
                  {/* Right: Map */}
                  <div className={`relative border-t md:border-t-0 ${borderColor} overflow-hidden group p-6 flex items-center justify-center`}>
                     {/* Map Image Container */}
                      <div className="relative w-full h-full max-h-[250px] overflow-hidden rounded-lg border border-white/10">
                        <img 
                          src="/assets/aarhus-map.png" 
                          alt="Kort over Aarhus" 
                          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${darkMode ? 'invert' : ''}`}
                        />
                        
                        {/* Location Marker */}
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

                      {/* Address Overlay - Now outside map or simpler */}
                      <div className={`absolute bottom-8 left-8 p-3 backdrop-blur-md border ${borderColor} ${darkMode ? 'bg-black/80' : 'bg-white/80'} rounded shadow-lg`}>
                          <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5">Hoffmeister Studio</p>
                          <p className="text-[10px] font-medium opacity-80">Åboulevarden 70, 3. sal</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* FOOTER CONTENT (Newsletter, Legal) */}
          <footer className={`px-16 py-8 border-t ${borderColor} ${bgColor} transition-colors duration-300 min-h-[250px]`}>
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

    {/* Video Modal */}
    {selectedVideo && (
      <div 
        className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-8"
        onClick={() => setSelectedVideo(null)}
      >
        <button 
          className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors text-3xl font-bold"
          onClick={() => setSelectedVideo(null)}
        >
          ✕
        </button>
        <video 
          src={selectedVideo}
          className="max-h-[70vh] max-w-[80vw] rounded-lg shadow-2xl"
          controls
          autoPlay
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    )}
    </>
  );
};

export default LandingPage;

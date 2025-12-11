import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import PublicSidebar from './PublicSidebar';
import LiveClock from './LiveClock';
import { useTheme } from './ThemeContext';

interface ServiceItem {
  title: string;
  description: string;
}

interface ServiceSection {
  id: string;
  title: string;
  items: ServiceItem[];
}

// Scroll-Driven Liquid Item with Expansion
const LiquidItem: React.FC<{ item: ServiceItem; scrollContainer: React.RefObject<HTMLElement>; darkMode: boolean }> = ({ item, scrollContainer, darkMode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const hasScrolledRef = useRef(false);
  const initialScrollTop = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || !scrollContainer.current) return;

      // Track if user has scrolled from initial position
      if (initialScrollTop.current === null) {
        initialScrollTop.current = scrollContainer.current.scrollTop;
      }
      
      // Only start animating after user has scrolled at least 10px
      if (!hasScrolledRef.current) {
        if (Math.abs(scrollContainer.current.scrollTop - initialScrollTop.current) > 10) {
          hasScrolledRef.current = true;
        } else {
          return; // Don't calculate progress until scroll happens
        }
      }

      const rect = ref.current.getBoundingClientRect();
      const containerHeight = scrollContainer.current.clientHeight;
      
      // Calculate progress: 0 when item enters from bottom, 1 when it's centered
      // We start animation later (60% from top) so items don't appear before the section title
      const startPoint = containerHeight * 0.60; 
      const endPoint = containerHeight * 0.30; 
      
      // Current position relative to viewport
      const currentPosition = rect.top;
      
      // Calculate progress (0 to 1)
      let newProgress = (startPoint - currentPosition) / (startPoint - endPoint);
      newProgress = Math.max(0, Math.min(1, newProgress)); // Clamp between 0 and 1
      
      setProgress(newProgress);
    };

    const container = scrollContainer.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollContainer]);

  // Transform values based on progress
  const easedProgress = progress < 0.5 
    ? 4 * progress * progress * progress 
    : 1 - Math.pow(-2 * progress + 2, 3) / 2; // Cubic ease-in-out
  
  const translateX = (1 - easedProgress) * 120;
  const opacity = easedProgress;

  const borderColor = darkMode ? 'border-white/20' : 'border-[#EBE9E9]';
  const hoverColor = darkMode ? 'hover:text-gray-400' : 'hover:text-gray-400';
  const descriptionColor = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div 
      ref={ref}
      className={`py-12 md:py-24 px-4 md:px-12 border-b ${borderColor} last:border-b-0 group cursor-pointer overflow-hidden flex flex-col justify-center w-full`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div 
        className="flex items-center justify-between w-full"
        style={{
          transform: `translateX(${translateX}px)`,
          opacity: opacity,
          transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-out',
        }}
      >
        <h3 className={`text-2xl md:text-4xl font-medium uppercase tracking-[-0.01em] ${hoverColor} transition-colors duration-300 break-words select-none`}>
          {item.title}
        </h3>
      </div>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}
        style={{
             transform: `translateX(${translateX}px)`,
        }}
      >
        <p className={`text-base ${descriptionColor} font-normal max-w-xl`}>
            {item.description}
        </p>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const { darkMode } = useTheme();

  // Theme classes
  const bgColor = darkMode ? 'bg-[#1b1b1b]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-white/20' : 'border-[#EBE9E9]';
  const gridColor = darkMode ? '#ffffff' : '#1b1b1b';

  const sections: ServiceSection[] = [
    { 
      id: 'digital-design', 
      title: 'DIGITAL DESIGN',
      items: [
          { title: 'USER INTERFACE', description: 'Design af brugergrænseflader, der er visuelt appellerende og nemme at navigere.' },
          { title: 'USER EXPERIENCE', description: 'Optimering af brugerrejsen for at sikre en intuitiv og effektiv oplevelse.' },
          { title: 'APP DESIGN', description: 'Udvikling af mobile applikationer med fokus på funktionalitet og design.' },
          { title: 'PROTOTYPING', description: 'Interaktive modeller, der tester koncepter før endelig udvikling.' },
          { title: 'DESIGN SYSTEMS', description: 'Samlet bibliotek af designelementer for at sikre konsistens på tværs af produkter.' },
          { title: 'WIREFRAMING', description: 'Skitse af strukturen for at klarlægge indhold og funktionalitet.' }
      ]
    },
    { 
      id: 'branding', 
      title: 'BRANDING',
      items: [
          { title: 'STRATEGY', description: 'Udvikling af en langsigtet plan for at nå dine brandmål.' },
          { title: 'TONE OF VOICE', description: 'Definition af hvordan dit brand kommunikerer med sin målgruppe.' },
          { title: 'GUIDELINES', description: 'Retningslinjer for brug af logo, farver og skrifttyper.' },
          { title: 'BRAND ARCHITECTURE', description: 'Strukturering af dit brands portefølje og relationer.' }
      ]
    },
    { 
      id: 'visual-identity', 
      title: 'VISUEL IDENTITET',
      items: [
          { title: 'VISUAL IDENTITY', description: 'Det samlede visuelle udtryk, der repræsenterer dit brand.' },
          { title: 'LOGO DESIGN', description: 'Skabelse af et unikt symbol, der identificerer din virksomhed.' },
          { title: 'ART DIRECTION', description: 'Overordnet styring af det visuelle udtryk i kampagner og projekter.' },
          { title: 'PACKAGING', description: 'Design af emballage, der beskytter og promoverer dit produkt.' },
          { title: 'MOTION GRAPHICS', description: 'Bevægelig grafik, der bringer dit brand til live.' }
      ]
    },
    { 
      id: 'website-design', 
      title: 'HJEMMESIDE DESIGN',
      items: [
          { title: 'WEB DESIGN', description: 'Design af websites, der kombinerer æstetik og funktionalitet.' },
          { title: 'LANDING PAGES', description: 'Målrettede sider designet til at konvertere besøgende.' },
          { title: 'CORPORATE SITES', description: 'Professionelle websites, der præsenterer din virksomhed.' },
          { title: 'CAMPAIGN SITES', description: 'Midlertidige sites til specifikke marketingkampagner.' },
          { title: 'INTERACTION', description: 'Design af interaktive elementer, der engagerer brugeren.' }
      ]
    },
    { 
      id: 'some', 
      title: 'SOME OPTIMERING',
      items: [
          { title: 'SOCIAL MEDIA', description: 'Administration og optimering af dine sociale medieprofiler.' },
          { title: 'CAMPAIGNS', description: 'Målrettede kampagner for at øge synlighed og salg.' },
          { title: 'STRATEGY', description: 'Planlægning af indhold og aktiviteter på sociale medier.' },
          { title: 'ANALYTICS', description: 'Måling og analyse af performance for at forbedre resultater.' },
          { title: 'CONTENT CREATION', description: 'Produktion af relevant og engagerende indhold.' }
      ]
    },
    { 
      id: 'code', 
      title: 'SKRÆDDERSYET KODE',
      items: [
          { title: 'FRONTEND', description: 'Implementering af det visuelle lag med moderne teknologier.' },
          { title: 'CREATIVE CODING', description: 'Eksperimenterende kode til unikke visuelle effekter.' },
          { title: 'REACT / NEXT.JS', description: 'Udvikling af hurtige og skalerbare webapplikationer.' },
          { title: 'API INTEGRATION', description: 'Forbindelse mellem forskellige softwaresystemer.' }
      ]
    },
  ];

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
      <main ref={mainRef} className={`flex-1 overflow-y-auto relative pt-16 md:pt-0 scrollbar-hide transition-colors duration-300`}>

        {/* Global Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             }}
        />

        <div className="relative z-10 min-h-screen flex flex-col">
          
          {/* Header Area */}
          <div className={`${bgColor} w-full border-b ${borderColor} transition-colors duration-300`}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-12 h-[127px] flex items-center">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-[-0.05em] leading-none">
                SERVICES
              </h1>
            </div>
          </div>

          {/* SCROLLING SECTIONS */}
          <div className="flex-1">
            {sections.map((section) => (
              <div key={section.id} className={`border-b ${borderColor}`}>
                <div className="max-w-[1400px] mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    
                    {/* LEFT: Sticky Title */}
                    <div className={`hidden md:block relative border-r ${borderColor} ${bgColor} overflow-hidden transition-colors duration-300`}>
                         {/* Grid Background - Only visible here */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 transition-colors duration-300" 
                            style={{ 
                            backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, 
                            backgroundSize: '40px 40px' 
                            }}>
                        </div>
                      <div className="sticky top-0 h-screen max-h-[800px] flex flex-col justify-start pt-8 px-12 relative z-10">
                        
                        {/* Title */}
                        <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.85] mb-8 break-words hyphens-auto">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    {/* Mobile Title (Static) */}
                    <div className={`md:hidden px-4 py-12 border-b ${borderColor} ${bgColor} transition-colors duration-300`}>
                        <h2 className="text-5xl font-black uppercase tracking-[-0.05em] leading-[0.9] mb-4 break-words">
                          {section.title}
                        </h2>
                    </div>

                    {/* RIGHT: Scrolling Items with Scroll-Driven Animation */}
                    <div className={`flex flex-col ${bgColor} transition-colors duration-300`}>
                      {section.items.map((item, itemIndex) => (
                        <LiquidItem key={itemIndex} item={item} scrollContainer={mainRef} darkMode={darkMode} />
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <footer className={`px-8 md:px-16 py-10 border-t ${borderColor} ${bgColor} transition-colors duration-300`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full h-full items-start">
              <div className="flex flex-col justify-between h-full">
                <span className="text-sm font-bold uppercase tracking-widest">©2025</span>
                <div className="flex flex-col gap-2 mt-8">
                  <a href="#" className={`text-sm font-bold uppercase tracking-widest ${darkMode ? 'hover:text-gray-400' : 'hover:text-gray-500'} flex items-center gap-2`}>
                    <span className={darkMode ? 'text-gray-600' : 'text-gray-300'}>//</span> LinkedIn
                  </a>
                  <a href="#" className={`text-sm font-bold uppercase tracking-widest ${darkMode ? 'hover:text-gray-400' : 'hover:text-gray-500'} flex items-center gap-2`}>
                    <span className={darkMode ? 'text-gray-600' : 'text-gray-300'}>//</span> Instagram
                  </a>
                </div>
              </div>

              <div className="flex justify-center items-center h-full">
                <div className="-mt-3">
                  <LiveClock />
                </div>
              </div>

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

export default Services;

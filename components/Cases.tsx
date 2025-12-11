import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, ArrowUpRight } from 'lucide-react';
import PublicSidebar from './PublicSidebar';
import LiveClock from './LiveClock';
import { useTheme } from './ThemeContext';

interface CaseItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
  description: string;
  brandColor?: string;
  brandFont?: string;
  isUppercase?: boolean;
  textColor?: string;
  letterSpacing?: string;
  hoverFontSize?: string;
  isActive: boolean;
}

const Cases: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  // Theme classes
  const bgColor = darkMode ? 'bg-[#1b1b1b]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-white/20' : 'border-[#EBE9E9]';
  const gridColor = darkMode ? '#ffffff' : '#1b1b1b';

  const cases: CaseItem[] = [
    {
      id: '1',
      slug: 'lava',
      title: 'Lava',
      category: 'Social Media',
      year: '2024',
      imageUrl: '/cases/lava/maanedens-ret.png',
      description: 'Social media strategi og content creation for restaurant.',
      brandColor: '#0C3925',
      isUppercase: true,
      textColor: 'white',
      isActive: true
    },
    {
      id: '2',
      slug: 'nordbrew',
      title: 'Nordbrew',
      category: 'Branding',
      year: '2024',
      imageUrl: '/cases/nordbrew/Mockups - packaging.png',
      description: 'Komplet visuel identitet for bryggeri.',
      brandColor: 'linear-gradient(to bottom, #FFFFFF, #F6D876, #F3C94B)',
      brandFont: "'Anton', sans-serif",
      isUppercase: true,
      isActive: true
    },
    {
      id: '3',
      slug: 'dubs-donkraft',
      title: 'Dubs & Donkraft',
      category: 'Branding',
      year: '2024',
      imageUrl: '/cases/dubs-donkraft/Artboard 1.png',
      description: 'Visuel identitet og branding.',
      brandColor: '#fbf7df',
      brandFont: "'PODIUM Soft', sans-serif",
      isUppercase: true,
      textColor: '#1b1b1b',
      isActive: true
    },
    {
      id: '4',
      slug: 'grenaa-chocolaterier',
      title: 'Grenaa Chocolaterier',
      category: 'Branding',
      year: '2024',
      imageUrl: '/cases/grenaa-chocolaterier/Artboard 1.png',
      description: 'Chokolade branding, logo og visitkort.',
      brandColor: '#F2F1E4',
      brandFont: "'OCTIN College', sans-serif",
      isUppercase: true,
      textColor: '#2E2E2E',
      isActive: true
    },
    {
      id: '5',
      slug: 'ro-gus',
      title: 'RO Gus',
      category: 'Branding',
      year: '2024',
      imageUrl: '/cases/ro-gus/Bag Mockup on the Wall.png',
      description: 'Saunagus branding og merchandise.',
      brandColor: '#E5E5E5',
      brandFont: "'Koulen', cursive",
      textColor: '#1A1A1A',
      letterSpacing: 'normal',
      hoverFontSize: '1.3rem',
      isUppercase: true,
      isActive: true
    },
    {
      id: '6',
      slug: 'echobloom',
      title: 'Echobloom Records',
      category: 'Web Design',
      year: '2025',
      imageUrl: '/cases/echobloom/Echobloom Records 1.png',
      description: 'Landing page design for pladeselskab.',
      brandColor: '#E7000B',
      brandFont: "'Komu New', 'Anton', sans-serif",
      textColor: '#151515',
      isUppercase: true,
      isActive: true
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
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0 transition-colors duration-300">
        {/* Font Imports */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap');
          @import url('https://fonts.cdnfonts.com/css/podium-soft');
          @import url('https://fonts.cdnfonts.com/css/octin-college');
          @import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
          
          .case-row {
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          }
          
          .case-row:hover {
            padding-left: 2rem;
          }
          
          .case-title {
            font-family: 'Inter', sans-serif;
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          }
          
          .case-row:hover .case-title {
            letter-spacing: 0.02em;
          }

          @keyframes borderSlide {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
          }
        `}</style>

        {/* Global Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             }}
        />
        
        {/* Subtle Grid Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 transition-colors duration-300" 
             style={{ 
               backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          
          {/* Header Area */}
          <div className={`${bgColor} w-full border-b ${borderColor} transition-colors duration-300`}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-12 h-[127px] flex items-center">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-[-0.05em] leading-none">
                CASES
              </h1>
            </div>
          </div>

          {/* Cases List - Data Table Style */}
          <div className="flex-1 pb-24">
            {/* List Header - Full Width Border */}
            <div className={`w-full border-b ${borderColor} ${bgColor} transition-colors duration-300`}>
              <div className="max-w-[1400px] mx-auto">
                <div className="flex items-center gap-4 px-4 md:px-12 py-3 text-sm font-black uppercase tracking-[-0.05em]">
                  <div className="flex-1 min-w-0">
                    Projekt
                  </div>
                  <div className="w-32 md:w-48 shrink-0">
                    Kategori
                  </div>
                  <div className="w-16 shrink-0">
                    År
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-[1400px] mx-auto">
              {/* List Items */}
              <div className="">
                {cases.map((caseItem) => {
                  const isHovered = hoveredCase === caseItem.id;
                  const itemTextColor = isHovered && caseItem.textColor ? caseItem.textColor : (darkMode ? 'white' : 'black');
                  const secondaryColor = isHovered && caseItem.textColor === 'white' ? 'rgba(255,255,255,0.8)' : (isHovered ? 'black' : (darkMode ? '#9CA3AF' : '#4B5563')); // gray-600

                  // Special logic for Dubs & Donkraft multicolor border
                  const isDubs = caseItem.slug === 'dubs-donkraft';
                  const dubsStyle = isDubs && isHovered ? {
                    background: '#fbf7df',
                    boxShadow: 'inset 0 0 0 2px #1b1b1b, inset 0 0 0 4px #fbf7df, inset 0 0 0 6px #656048',
                  } : {};

                  return (
                    <div 
                      key={caseItem.id}
                      className="group relative transition-all duration-300"
                      style={{
                        background: isHovered && caseItem.brandColor ? caseItem.brandColor : (darkMode ? '#1b1b1b' : 'white'),
                        ...(isDubs && isHovered ? dubsStyle : {})
                      }}
                      onMouseEnter={() => setHoveredCase(caseItem.id)}
                      onMouseLeave={() => setHoveredCase(null)}
                      onClick={() => caseItem.isActive && navigate(`/cases/${caseItem.slug}`)}
                    >
                      <div className={`absolute inset-x-0 bottom-0 border-b ${borderColor} w-screen left-[50%] -translate-x-[50%]`} />
                      <div 
                        className={`case-row flex items-center gap-4 px-4 md:px-12 relative z-10 ${
                          caseItem.isActive ? 'cursor-pointer' : 'cursor-default opacity-60'
                        } ${isDubs && isHovered ? 'py-4' : 'py-3'}`}
                      >
                        {/* Title */}
                        <div className="flex-1 min-w-0 flex items-center gap-3">
                          <h2 
                            className="case-title text-base md:text-lg tracking-tight"
                            style={{
                              fontFamily: isHovered && caseItem.brandFont ? caseItem.brandFont : "'Inter', sans-serif",
                              textTransform: isHovered && caseItem.isUppercase ? 'uppercase' : 'none',
                              fontWeight: isHovered && caseItem.isUppercase ? 900 : 500,
                              color: itemTextColor,
                              letterSpacing: isHovered && caseItem.letterSpacing ? caseItem.letterSpacing : undefined,
                              fontSize: isHovered && caseItem.hoverFontSize ? caseItem.hoverFontSize : undefined,
                            }}
                          >
                            {caseItem.title}
                          </h2>
                          {!caseItem.isActive && (
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-gray-500 bg-gray-800' : 'text-gray-400 bg-gray-100'} px-2 py-0.5 rounded`}>
                              Kommer snart
                            </span>
                          )}
                        </div>

                        {/* Category */}
                        <div className="w-32 md:w-48 shrink-0">
                          <span 
                            className="text-sm font-medium transition-all duration-300" 
                            style={{ 
                              opacity: isHovered ? 1 : 1,
                              color: isHovered ? secondaryColor : (darkMode ? '#9CA3AF' : '#4B5563')
                            }}
                          >
                            {caseItem.category}
                          </span>
                        </div>

                        {/* Year */}
                        <div className="w-16 shrink-0 flex items-center gap-2">
                          <span 
                            className="text-sm font-mono transition-all duration-300" 
                            style={{ 
                              opacity: isHovered ? 1 : 1,
                              color: isHovered ? secondaryColor : (darkMode ? '#6B7280' : '#6B7280')
                            }}
                          >
                            {caseItem.year}
                          </span>
                          {caseItem.isActive && isHovered && (
                            <ArrowUpRight size={16} color={itemTextColor} />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <footer className={`px-8 md:px-16 py-8 border-t ${borderColor} ${bgColor} transition-colors duration-300 min-h-[250px]`}>
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

export default Cases;

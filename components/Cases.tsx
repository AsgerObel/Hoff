import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, ArrowUpRight } from 'lucide-react';
import PublicSidebar from './PublicSidebar';
import LiveClock from './LiveClock';

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
  isActive: boolean;
}

const Cases: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const navigate = useNavigate();

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
      isActive: true
    },
    {
      id: '2',
      slug: 'nordbrew',
      title: 'Nordbrew',
      category: 'Branding',
      year: '2024',
      imageUrl: '/cases/nordbrew/thumbnail.jpg',
      description: 'Komplet visuel identitet for bryggeri.',
      brandColor: 'linear-gradient(to bottom, #FFFFFF, #F6D876, #F3C94B)',
      brandFont: "'Anton', sans-serif",
      isUppercase: true,
      isActive: false
    },
    {
      id: '3',
      slug: 'dubs-donkraft',
      title: 'Dubs & Donkraft',
      category: 'Branding',
      year: '2024',
      imageUrl: '/cases/dubs-donkraft/thumbnail.jpg',
      description: 'Visuel identitet og branding.',
      isActive: false
    },
    {
      id: '4',
      slug: 'grenaa-chocolaterier',
      title: 'Grenaa Chocolaterier',
      category: 'Branding',
      year: '2024',
      imageUrl: '/cases/grenaa-chocolaterier/thumbnail.jpg',
      description: 'Chokolade branding og emballage design.',
      isActive: false
    },
    {
      id: '5',
      slug: 'ro-gus',
      title: 'RO Gus',
      category: 'Branding',
      year: '2024',
      imageUrl: '/cases/ro-gus/thumbnail.jpg',
      description: 'Logo og visuel identitet.',
      isActive: false
    },
  ];

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
        {/* Font Imports */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap');
          
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
        `}</style>

        {/* Global Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             }}
        />
        
        {/* Subtle Grid Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
             style={{ 
               backgroundImage: 'linear-gradient(#1b1b1b 1px, transparent 1px), linear-gradient(90deg, #1b1b1b 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          
          {/* Header Area */}
          <div className="bg-white w-full border-b border-[#EBE9E9]">
            <div className="max-w-[1400px] mx-auto px-4 md:px-12 h-[127px] flex items-center">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-[-0.05em] leading-none">
                CASES
              </h1>
            </div>
          </div>

          {/* Cases List - Data Table Style */}
          <div className="flex-1 pb-24">
            {/* List Header - Full Width Border */}
            <div className="w-full border-b border-[#EBE9E9] bg-white">
              <div className="max-w-[1400px] mx-auto">
                <div className="flex items-center gap-4 px-4 md:px-12 py-3 text-sm font-black uppercase tracking-[-0.05em] text-black">
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
                  return (
                    <div 
                      key={caseItem.id}
                      className="group relative"
                      style={{
                        background: isHovered && caseItem.brandColor ? caseItem.brandColor : 'white',
                      }}
                      onMouseEnter={() => setHoveredCase(caseItem.id)}
                      onMouseLeave={() => setHoveredCase(null)}
                      onClick={() => caseItem.isActive && navigate(`/cases/${caseItem.slug}`)}
                    >
                      <div className="absolute inset-x-0 bottom-0 border-b border-[#EBE9E9] w-screen left-[50%] -translate-x-[50%]" />
                      <div 
                        className={`case-row flex items-center gap-4 px-4 md:px-12 py-3 relative z-10 ${caseItem.isActive ? 'cursor-pointer' : 'cursor-default opacity-60'}`}
                      >
                        {/* Title */}
                        <div className="flex-1 min-w-0 flex items-center gap-3">
                          <h2 
                            className="case-title text-base md:text-lg tracking-tight"
                            style={{
                              fontFamily: isHovered && caseItem.brandFont ? caseItem.brandFont : "'Inter', sans-serif",
                              textTransform: isHovered && caseItem.isUppercase ? 'uppercase' : 'none',
                              fontWeight: isHovered && caseItem.brandFont ? 400 : 500,
                              color: 'black',
                            }}
                          >
                            {caseItem.title}
                          </h2>
                          {!caseItem.isActive && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                              Kommer snart
                            </span>
                          )}
                        </div>

                        {/* Category */}
                        <div className="w-32 md:w-48 shrink-0">
                          <span className="text-sm text-gray-600 font-medium transition-all duration-300" style={{ opacity: isHovered ? 0.7 : 1 }}>{caseItem.category}</span>
                        </div>

                        {/* Year */}
                        <div className="w-16 shrink-0 flex items-center gap-2">
                          <span className="text-sm font-mono text-gray-500 transition-all duration-300" style={{ opacity: isHovered ? 0.7 : 1 }}>{caseItem.year}</span>
                          {caseItem.isActive && isHovered && (
                            <ArrowUpRight size={16} className="text-black" />
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
          <footer className="px-8 md:px-16 py-10 border-t border-[#EBE9E9] bg-white">
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

export default Cases;


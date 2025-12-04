import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ArrowUpRight } from 'lucide-react';
import PublicSidebar from './PublicSidebar';

interface CaseItem {
  id: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
  description: string;
}

const Cases: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse position for the floating preview
  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate Y position relative to viewport for the fixed right-side preview
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const cases: CaseItem[] = [
    {
      id: '1',
      title: 'Mols Linjen',
      category: 'Branding',
      year: '2024',
      imageUrl: 'https://picsum.photos/800/600?random=1',
      description: 'Komplet visuel identitet og digital strategi for Danmarks førende færgeselskab.'
    },
    {
      id: '2',
      title: 'Nordic Seaplanes',
      category: 'Web Design',
      year: '2024',
      imageUrl: 'https://picsum.photos/800/600?random=2',
      description: 'Responsivt website med booking-system og brand guidelines.'
    },
    {
      id: '3',
      title: 'Aarhus Festuge',
      category: 'Kampagne',
      year: '2023',
      imageUrl: 'https://picsum.photos/800/600?random=3',
      description: 'Digital kampagne og social media strategi for kulturel festival.'
    },
    {
      id: '4',
      title: 'Café Gemmestedet',
      category: 'Visuel Identitet',
      year: '2023',
      imageUrl: 'https://picsum.photos/800/600?random=4',
      description: 'Logo, menukort og indretningskoncept for specialkaffe-bar.'
    },
    {
      id: '5',
      title: 'Startup Hub Aarhus',
      category: 'Web Design',
      year: '2024',
      imageUrl: 'https://picsum.photos/800/600?random=5',
      description: 'Platform til at forbinde startups med investorer og mentorer.'
    },
    {
      id: '6',
      title: 'Green Energy Co.',
      category: 'Branding',
      year: '2023',
      imageUrl: 'https://picsum.photos/800/600?random=6',
      description: 'Bæredygtig branding for grøn energi startup.'
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
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0 bg-white" onMouseMove={handleMouseMove}>
        
        {/* Right Side Fixed Image Preview - Aligned with Cursor Y */}
        <div 
          className="fixed right-[5%] w-[400px] h-[250px] z-50 pointer-events-none transition-all duration-300 ease-out overflow-hidden hidden xl:block shadow-xl"
          style={{ 
            top: mousePos.y,
            transform: 'translateY(-50%)',
            opacity: hoveredCase ? 1 : 0,
          }}
        >
          {hoveredCase && (
            <img 
              src={cases.find(c => c.id === hoveredCase)?.imageUrl} 
              alt="" 
              className="w-full h-full object-cover"
            />
          )}
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
          <div className="flex-1 bg-white pb-24">
            {/* List Header - Full Width Border */}
            <div className="w-full border-b border-black">
              <div className="max-w-[1400px] mx-auto">
                <div className="h-[77px] grid grid-cols-12 gap-4 px-4 md:px-12 text-[10px] font-bold uppercase tracking-widest text-black items-center">
                  <div className="col-span-6 md:col-span-5 flex items-center gap-1">
                    Projekt
                  </div>
                  <div className="col-span-4 md:col-span-3 flex items-center gap-1">
                    Kategori
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end gap-1">
                    År
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-[1400px] mx-auto">
              {/* List Items */}
              <div className="">
                {cases.map((caseItem) => (
                  <div 
                    key={caseItem.id}
                    className="group relative"
                  >
                    <div className="absolute inset-x-0 bottom-0 border-b border-black w-screen left-[50%] -translate-x-[50%]" />
                    <div 
                      className="grid grid-cols-12 gap-4 px-4 md:px-12 py-4 cursor-pointer transition-colors hover:bg-gray-100 items-center relative z-10"
                      onMouseEnter={() => setHoveredCase(caseItem.id)}
                      onMouseLeave={() => setHoveredCase(null)}
                    >
                      {/* Title */}
                      <div className="col-span-6 md:col-span-5">
                        <h2 className="text-base md:text-lg font-medium tracking-tight text-black">
                          {caseItem.title}
                        </h2>
                      </div>

                      {/* Category */}
                      <div className="col-span-4 md:col-span-3">
                        <span className="text-sm text-gray-600 font-medium">{caseItem.category}</span>
                      </div>

                      {/* Year */}
                      <div className="col-span-2 text-right">
                        <span className="text-sm font-mono text-gray-500">{caseItem.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Cases;


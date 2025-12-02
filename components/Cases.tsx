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
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0">
        {/* Subtle Grid Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
             style={{ 
               backgroundImage: 'linear-gradient(#1b1b1b 1px, transparent 1px), linear-gradient(90deg, #1b1b1b 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        <div className="relative z-10">
          
          {/* Header Area - aligned with sidebar header border */}
          <div className="bg-white w-full border-b border-[#EBE9E9]">
            <div className="max-w-[1400px] mx-auto px-4 md:px-12 h-[127px] flex items-center">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-[-0.05em] leading-none">
                CASES
              </h1>
            </div>
          </div>

          {/* Cases Grid */}
          <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {cases.map((caseItem, index) => (
                <div 
                  key={caseItem.id}
                  className="group cursor-pointer border border-[#EBE9E9] bg-white hover:border-black transition-colors"
                  onMouseEnter={() => setHoveredCase(caseItem.id)}
                  onMouseLeave={() => setHoveredCase(null)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img 
                      src={caseItem.imageUrl} 
                      alt={caseItem.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    {/* Overlay on hover */}
                    <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${hoveredCase === caseItem.id ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="text-white text-center p-6">
                        <p className="text-sm font-medium mb-4 max-w-xs">{caseItem.description}</p>
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">
                          Se Case <ArrowUpRight size={12} />
                        </span>
                      </div>
                    </div>
                    {/* Number Badge */}
                    <div className="absolute top-4 left-4 text-6xl font-black text-white/20 leading-none select-none">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{caseItem.category}</span>
                        <span className="text-gray-300">—</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{caseItem.year}</span>
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-[-0.05em]">{caseItem.title}</h3>
                    </div>
                    <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Cases;


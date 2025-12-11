import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import PublicSidebar from '../PublicSidebar';
import LiveClock from '../LiveClock';

const EchobloomCase: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Echobloom case content
  const caseInfo = {
    title: 'Echobloom Records',
    category: 'Web Design',
    year: '2025',
    description: 'Design af landing page for pladeselskabet Echobloom Records. Fokus på et råt og energisk udtryk der matcher deres kunstnere.',
    services: ['Web Design', 'UI/UX', 'Art Direction'],
  };

  const images = [
    '/cases/echobloom/Echobloom Records 1.png',
    '/cases/echobloom/Echobloom Records 2.png',
    '/cases/echobloom/Echobloom Records 3.png',
  ];

  return (
    <div className="flex h-screen bg-[#E7000B] text-[#151515] font-sans overflow-hidden selection:bg-[#151515] selection:text-[#E7000B]">
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#E7000B] border-b border-[#151515]/10 flex items-center justify-between px-6 z-40">
        <Link to="/" className="font-black uppercase tracking-[-0.05em] text-lg text-[#151515]">Hoffmeister Studio</Link>
        <button onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} color="#151515" />
        </button>
      </div>

      {/* Sidebar */}
      <PublicSidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        darkMode={false}
        backgroundColor="#E7000B"
        borderColor="border-[#151515]"
        customHoverClass="hover:bg-[#151515] hover:text-[#E7000B]"
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0">
        {/* Font Imports */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;900&display=swap');
          
          /* Fallback for Komu New using Anton if not available locally */
          .font-komu {
            font-family: 'Komu New', 'Anton', sans-serif;
          }

          .image-hover {
            transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          }
          
          .fade-in {
            animation: fadeIn 0.6s ease-out forwards;
            opacity: 0;
          }

          @keyframes fadeIn {
            to { opacity: 1; }
          }

          .stagger-1 { animation-delay: 0.1s; }
          .stagger-2 { animation-delay: 0.2s; }
          .stagger-3 { animation-delay: 0.3s; }
        `}</style>

        {/* Subtle Grid Background - Dark on Red */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0" 
             style={{ 
               backgroundImage: 'linear-gradient(#151515 1px, transparent 1px), linear-gradient(90deg, #151515 1px, transparent 1px)', 
               backgroundSize: '60px 60px' 
             }}>
        </div>

        {/* Global Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-multiply"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             }}
        />

        <div className="relative z-10 min-h-screen flex flex-col">
          
          {/* SPLIT LAYOUT CONTAINER */}
          <div className="flex flex-col md:flex-row min-h-screen">
            
            {/* LEFT SIDE: IMAGES (Seamless Scroll) */}
            <div className="w-full md:w-[60%] border-r border-[#151515]/10 relative">
              
              {/* Images Container - Stacked seamlessly */}
              <div className="flex flex-col w-full">
                {images.map((src, idx) => (
                  <div 
                    key={idx}
                    className="w-full relative cursor-pointer"
                    onClick={() => setSelectedImage(src)}
                  >
                    <img 
                      src={src}
                      alt={`Echobloom Landing Page Part ${idx + 1}`}
                      className="w-full h-auto block"
                      style={{ display: 'block' }} // Ensures no whitespace
                    />
                  </div>
                ))}
              </div>
              
              {/* Mobile Next Case CTA */}
              <div className="md:hidden border-t border-[#151515]/10 p-8 bg-[#E7000B]">
                <Link to="/cases" className="group flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-[#151515]/60 uppercase tracking-widest">Se flere</span>
                    <h3 className="text-4xl font-black uppercase tracking-[-0.05em] mt-2 text-[#151515]">Cases →</h3>
                  </div>
                </Link>
              </div>

            </div>

            {/* RIGHT SIDE: TEXT / INFO (Sticky) */}
            <div className="hidden md:block w-full md:w-[40%] relative bg-[#E7000B]">
              <div className="sticky top-0 h-screen overflow-hidden p-12 flex flex-col justify-between">
                
                {/* Top Info */}
                <div className="space-y-8 fade-in stagger-1 pt-4">
                  <div>
                    <h1 className="text-5xl lg:text-7xl font-black uppercase leading-[0.9] mb-6 font-komu text-[#151515]">
                      {caseInfo.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {caseInfo.services.map((service, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider border border-[#151515]/20 text-[#151515]/80"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Section Descriptions */}
                  <div className="space-y-6 pt-6 border-t border-[#151515]/10">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-[#151515] mb-1">Concept</h3>
                      <p className="text-[#151515]/80 text-sm leading-relaxed">
                        En landing page der fungerer som en digital scene for Echobloom. Designet er bygget op omkring store visuals og typografi der støjer på den gode måde.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-[#151515] mb-1">Visual Direction</h3>
                      <p className="text-[#151515]/80 text-sm leading-relaxed">
                        Vi har brugt en stærk rød farve (#E7000B) som gennemgående element for at skabe energi og opmærksomhed, kombineret med sort kontrast.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 border-t border-[#151515]/10 mt-auto">
                  <Link 
                    to="/cases"
                    className="group flex items-center justify-between hover:opacity-70 transition-opacity"
                  >
                    <div>
                      <span className="text-xs font-medium text-[#151515]/60 uppercase tracking-widest">Se flere</span>
                      <h3 className="text-3xl font-black uppercase tracking-[-0.05em] mt-1 text-[#151515]">
                        Cases →
                      </h3>
                    </div>
                  </Link>
                </div>

              </div>
            </div>

          </div>

          {/* FOOTER */}
          <footer className="px-16 py-8 border-t border-[#151515] bg-[#E7000B] z-20 relative text-[#151515] min-h-[250px]">
            <div className="grid grid-cols-3 w-full h-full items-start">
              <div className="flex flex-col justify-between h-full">
                <span className="text-sm font-bold uppercase tracking-widest">©2025</span>
                <div className="flex flex-col gap-2">
                  <a href="https://www.linkedin.com/in/nikolaj-hoffmeister-3b50032a0/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-widest hover:text-[#151515]/70 flex items-center gap-2 transition-colors">
                    <span>//</span> LinkedIn
                  </a>
                  <a href="https://www.instagram.com/hoffmeisterstudio/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-widest hover:text-[#151515]/70 flex items-center gap-2 transition-colors">
                    <span>//</span> Instagram
                  </a>
                </div>
              </div>

              <div className="flex justify-center items-center h-full">
                <div className="-mt-3 md:-translate-x-32">
                  <LiveClock />
                </div>
              </div>

              <div className="flex flex-col justify-between h-full ml-auto">
                <div className="flex flex-col items-start leading-none">
                  <span className="text-3xl font-black tracking-[-0.05em] uppercase -mb-1">Hoffmeister</span>
                  <span className="text-3xl font-black tracking-[-0.05em] uppercase">Studio</span>
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <a href="mailto:nikolaj@hoffmeisterstudio.com" className="text-sm font-bold uppercase tracking-widest hover:text-[#151515]/70 hover:underline transition-colors flex flex-col items-start">
                    <span>nikolaj@</span>
                    <span>hoffmeisterstudio.com</span>
                  </a>
                  <a href="tel:+4551141562" className="text-sm font-bold uppercase tracking-widest hover:text-[#151515]/70 hover:underline transition-colors">+45 51 14 15 62</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Image Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage}
            alt="Full size"
            className="max-h-[90vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default EchobloomCase;

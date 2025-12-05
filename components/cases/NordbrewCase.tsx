import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import PublicSidebar from '../PublicSidebar';
import LiveClock from '../LiveClock';

const NordbrewCase: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Nordbrew case content
  const caseInfo = {
    title: 'Nordbrew',
    category: 'Branding',
    year: '2024',
    description: 'Komplet visuel identitet for bryggeri. Vi har skabt et moderne og iøjnefaldende brand, der skiller sig ud på hylderne.',
    services: ['Visual Identity', 'Packaging', 'Merchandise'],
  };

  // Group images by type
  const labels = [
    { src: '/cases/nordbrew/Nordbrew label.png', title: 'Nordbrew Label' },
    { src: '/cases/nordbrew/Nordbrew label Brasil.png', title: 'Brasil Label' },
    { src: '/cases/nordbrew/Nordbrew label Etiopien.png', title: 'Etiopien Label' },
    { src: '/cases/nordbrew/Nordbrew - 1 (stacked).png', title: 'Logo Stacked' },
  ];

  const mockups = [
    { src: '/cases/nordbrew/Mockups - packaging 2.png', title: 'Packaging Mockup 2' },
    { src: '/cases/nordbrew/Mockups - packaging 3.png', title: 'Packaging Mockup 3' },
    { src: '/cases/nordbrew/Mockups - merchandise.png', title: 'Merchandise' },
  ];

  const heroImage = {
    src: '/cases/nordbrew/Mockups - packaging.png',
    title: 'Packaging Overview'
  };

  return (
    <div className="flex h-screen bg-[#F6D876] text-black font-sans overflow-hidden selection:bg-black selection:text-[#F6D876]">
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#F6D876] border-b border-black/10 flex items-center justify-between px-6 z-40">
        <Link to="/" className="font-black uppercase tracking-[-0.05em] text-lg">Hoffmeister Studio</Link>
        <button onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <PublicSidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        darkMode={false}
        backgroundColor="#F6D876"
        borderColor="border-black"
        customHoverClass="hover:bg-black hover:text-white"
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0">
        {/* Font Imports */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;900&display=swap');
          
          .image-hover {
            transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          }
          
          .image-hover:hover {
            transform: scale(1.02);
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
          .stagger-4 { animation-delay: 0.4s; }
          .stagger-5 { animation-delay: 0.5s; }
          .stagger-6 { animation-delay: 0.6s; }
        `}</style>

        {/* Subtle Grid Background */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0" 
             style={{ 
               backgroundImage: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)', 
               backgroundSize: '60px 60px' 
             }}>
        </div>

        {/* Global Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             }}
        />

        <div className="relative z-10 min-h-screen flex flex-col">
          
          {/* SPLIT LAYOUT CONTAINER */}
          <div className="flex flex-col md:flex-row min-h-screen">
            
            {/* LEFT SIDE: IMAGES / VISUALS (Scrolls) */}
            <div className="w-full md:w-[60%] border-r border-black/10 relative">
              
              {/* Visuals Container - Padding matches right side */}
              <div className="p-4 md:p-12 space-y-12 pb-24 relative pt-12 md:pt-8">
                
                {/* 1. Hero Visual */}
                <div className="space-y-6">
                  <div className="md:hidden mb-4">
                    <h2 className="text-sm font-black uppercase tracking-widest text-black mb-2">Packaging</h2>
                    <p className="text-black/80 text-sm leading-relaxed">
                      Et stærkt visuelt udtryk der skaber blikfang.
                    </p>
                  </div>
                  <div 
                    className="relative w-full overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedImage(heroImage.src)}
                  >
                    <img 
                      src={heroImage.src}
                      alt={heroImage.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                {/* 2. Labels Grid */}
                <div className="space-y-6">
                   <div className="md:hidden mb-4">
                    <h2 className="text-sm font-black uppercase tracking-widest text-black mb-2">Labels & Identity</h2>
                    <p className="text-black/80 text-sm leading-relaxed">
                      Konsistente etiketter med tydelig farvekodning.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    {labels.map((label, idx) => (
                      <div 
                        key={idx}
                        className={`aspect-square overflow-hidden cursor-pointer image-hover flex items-center justify-center p-4`}
                        onClick={() => setSelectedImage(label.src)}
                      >
                        <img 
                          src={label.src} 
                          alt={label.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Mockups Visuals */}
                <div className="space-y-6">
                  <div className="md:hidden mb-4">
                    <h2 className="text-sm font-black uppercase tracking-widest text-black mb-2">Mockups</h2>
                    <p className="text-black/80 text-sm leading-relaxed">
                      Produktpræsentation og merchandise.
                    </p>
                  </div>
                  <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 md:flex-wrap">
                    {mockups.map((mockup, idx) => (
                      <div 
                        key={idx}
                        className={`w-[200px] md:w-[45%] shrink-0 aspect-[4/5] overflow-hidden cursor-pointer image-hover`}
                        onClick={() => setSelectedImage(mockup.src)}
                      >
                        <img 
                          src={mockup.src} 
                          alt={mockup.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              
              {/* Mobile Next Case CTA (Visible only on mobile at bottom of content) */}
              <div className="md:hidden border-t border-black/10 p-8">
                <Link to="/cases" className="group flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-widest">Se flere</span>
                    <h3 className="text-4xl font-black uppercase tracking-[-0.05em] mt-2">Cases →</h3>
                  </div>
                </Link>
              </div>

            </div>

            {/* RIGHT SIDE: TEXT / INFO (Sticky) */}
            <div className="hidden md:block w-full md:w-[40%] relative">
              <div className="sticky top-0 h-screen overflow-hidden p-12 flex flex-col justify-between">
                
                {/* Top Info */}
                <div className="space-y-8 fade-in stagger-1 pt-4">
                  <div>
                    <h1 className="text-5xl lg:text-7xl font-black uppercase leading-[0.9] mb-6" style={{ fontFamily: "'Anton', sans-serif" }}>
                      {caseInfo.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {caseInfo.services.map((service, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider border border-black/20 text-black/80"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Section Descriptions - Contextual */}
                  <div className="space-y-6 pt-6 border-t border-black/10">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-black mb-1">Brand Identity</h3>
                      <p className="text-black/80 text-sm leading-relaxed">
                        Udvikling af en unik visuel identitet der fanger bryggeriets sjæl. Vi har arbejdet med farver og typografi for at skabe et genkendeligt udtryk.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-black mb-1">Packaging Design</h3>
                      <p className="text-black/80 text-sm leading-relaxed">
                        Design af etiketter til forskellige varianter, hvor hver øl får sin egen personlighed inden for den samlede identitet.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-black mb-1">Merchandise</h3>
                      <p className="text-black/80 text-sm leading-relaxed">
                        Udvidelse af brandet til merchandise produkter, der styrker fællesskabsfølelsen omkring bryggeriet.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 border-t border-black/10 mt-auto">
                  <Link 
                    to="/cases"
                    className="group flex items-center justify-between hover:opacity-70 transition-opacity"
                  >
                    <div>
                      <span className="text-xs font-medium text-black/60 uppercase tracking-widest">Se flere</span>
                      <h3 className="text-3xl font-black uppercase tracking-[-0.05em] mt-1">
                        Cases →
                      </h3>
                    </div>
                  </Link>
                </div>

              </div>
            </div>

          </div>

          {/* FOOTER (Full width below the split layout) */}
          <footer className="px-8 md:px-16 py-10 border-t border-black bg-[#F6D876] z-20 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full h-full items-start">
              {/* Left: Socials */}
              <div className="flex flex-col justify-between h-full">
                <span className="text-sm font-bold uppercase tracking-widest text-black">©2025</span>
                <div className="flex flex-col gap-2 mt-8">
                  <a href="#" className="text-sm font-bold uppercase tracking-widest text-black hover:text-black/70 flex items-center gap-2 transition-colors">
                    <span className="text-black">//</span> LinkedIn
                  </a>
                  <a href="#" className="text-sm font-bold uppercase tracking-widest text-black hover:text-black/70 flex items-center gap-2 transition-colors">
                    <span className="text-black">//</span> Instagram
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
                  <a href="mailto:NIKOLAJ@gmail.com" className="text-sm font-bold uppercase tracking-widest text-black hover:text-black/70 hover:underline transition-colors">NIKOLAJ@gmail.com</a>
                  <span className="text-sm font-bold uppercase tracking-widest text-black">+45123456789</span>
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

export default NordbrewCase;


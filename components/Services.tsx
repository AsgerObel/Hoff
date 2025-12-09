import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ArrowUpRight } from 'lucide-react';
import PublicSidebar from './PublicSidebar';
import LiveClock from './LiveClock';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
}

const Services: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const borderColor = "border-[#EBE9E9]";

  const services: ServiceItem[] = [
    {
      id: 'digital-design',
      title: 'Digital Design',
      description: 'Brugervenlige digitale oplevelser der engagerer og konverterer på tværs af platforme.',
      features: ['UI Design', 'UX Design', 'App Design', 'Prototyping']
    },
    {
      id: 'branding',
      title: 'Branding',
      description: 'Vi skaber stærke brands der skiller sig ud og skaber forbindelse til din målgruppe.',
      features: ['Logo Design', 'Brand Guidelines', 'Tone of Voice', 'Brand Strategy']
    },
    {
      id: 'identity',
      title: 'Visuel Identitet',
      description: 'Den visuelle dialekt af dit brand. High-fidelity grafiske assets og art direction.',
      features: ['Art Direction', 'Motion Graphics', '3D Assets', 'Photography']
    },
    {
      id: 'web',
      title: 'Web Design',
      description: 'Responsive layouts til web med fokus på performance og brugeroplevelse.',
      features: ['E-commerce', 'Portfolio', 'Landing Pages', 'Microsites']
    },
    {
      id: 'some',
      title: 'SoMe Optimering',
      description: 'Strategisk indhold og kampagner der engagerer din målgruppe på sociale medier.',
      features: ['Content Strategi', 'Grafisk Design', 'Kampagner', 'Community']
    },
    {
      id: 'custom-code',
      title: 'Custom Kode',
      description: 'Skræddersyede løsninger og integrationer der løfter din digitale platform.',
      features: ['Web Development', 'API Integration', 'Animations', 'Custom Features']
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
        {/* CSS for animations */}
        <style>{`
          .service-row {
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .service-row:hover {
            padding-left: 2rem;
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
                SERVICES
              </h1>
            </div>
          </div>

          {/* Services List - Data Table Style (like Cases page) */}
          <div className="flex-1">
            {/* Service Rows */}
            <div className="max-w-[1400px] mx-auto">
              {services.map((service, index) => {
                const isHovered = hoveredService === service.id;
                
                return (
                  <div 
                    key={service.id}
                    className="group relative transition-all duration-300"
                    style={{
                      background: isHovered ? '#F9F9F9' : 'white',
                    }}
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    {/* Full width border */}
                    <div className="absolute inset-x-0 bottom-0 border-b border-[#EBE9E9] w-screen left-[50%] -translate-x-[50%]" />
                    
                    <div className="service-row flex items-center gap-4 px-4 md:px-12 py-5 relative z-10 cursor-pointer">
                      {/* Title */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-base md:text-lg font-black uppercase tracking-[-0.05em] transition-all duration-300">
                          {service.title}
                        </h2>
                        {/* Features - visible on hover or mobile */}
                        <div className={`flex flex-wrap gap-2 mt-2 transition-all duration-300 ${isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 md:opacity-0'} overflow-hidden md:hidden`}>
                          {service.features.map((feature, i) => (
                            <span key={i} className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                              {feature}{i < service.features.length - 1 ? ' —' : ''}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Description - Desktop */}
                      <div className="hidden md:block w-80 shrink-0">
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {service.description}
                        </p>
                        {/* Features */}
                        <div className={`flex flex-wrap gap-x-3 mt-2 transition-all duration-300 overflow-hidden ${isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'}`}>
                          {service.features.map((feature, i) => (
                            <span key={i} className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="w-20 shrink-0 flex justify-end">
                        <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Process Section - Grid Cards Style (like Kontakt info cards) */}
          <div className="border-t border-[#EBE9E9] bg-white">
            <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-12">
              {/* Section Label */}
              <div className="mb-6">
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Vores Tilgang</span>
                <h2 className="text-2xl font-black uppercase tracking-[-0.05em] mt-1">PROCESSEN</h2>
              </div>
              
              {/* Process Grid - 4 cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { num: '01', title: 'Discovery', desc: 'Vi forstår din virksomhed, mål og målgruppe.' },
                  { num: '02', title: 'Design', desc: 'Vi udvikler koncepter og designs.' },
                  { num: '03', title: 'Develop', desc: 'Vi bygger med fokus på kvalitet.' },
                  { num: '04', title: 'Launch', desc: 'Vi lancerer og optimerer.' }
                ].map((step, i) => (
                  <div key={i} className={`p-4 border ${borderColor} group hover:bg-[#F9F9F9] transition-colors bg-white`}>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block mb-0.5">{step.num}</span>
                    <h4 className="text-sm font-black uppercase tracking-[-0.05em] mb-1.5">{step.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
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

export default Services;

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Plus, ArrowRight } from 'lucide-react';
import PublicSidebar from './PublicSidebar';
import LiveClock from './LiveClock';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  code: string;
  imageUrls: string[];
}

const Services: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const serviceRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Mouse position for spotlight effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Handle clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpandedService(null);
      } else {
        // Check if click is on the "background" (the grid gaps or container itself)
        // This is tricky with the current structure, but we can check if the target is NOT inside a service card
        const target = event.target as HTMLElement;
        const isCard = target.closest('.group.relative');
        if (!isCard) {
          setExpandedService(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const services: ServiceItem[] = [
    {
      id: 'digital-design',
      title: 'DIGITAL DESIGN',
      description: 'Brugervenlige digitale oplevelser der engagerer og konverterer på tværs af platforme.',
      features: ['UI Design', 'UX Design', 'App Design', 'Prototyping'],
      code: 'DIG.DES.01',
      imageUrls: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
        'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80'
      ]
    },
    {
      id: 'branding',
      title: 'BRANDING',
      description: 'Vi skaber stærke brands der skiller sig ud og skaber forbindelse til din målgruppe.',
      features: ['Logo Design', 'Brand Guidelines', 'Tone of Voice', 'Brand Strategy'],
      code: 'BRND.SYS.02',
      imageUrls: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
        'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&q=80',
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=400&q=80',
        'https://images.unsplash.com/photo-1626785774573-4b799314346d?w=400&q=80'
      ]
    },
    {
      id: 'identity',
      title: 'VISUEL IDENTITET',
      description: 'The visual dialect of your brand. High-fidelity graphical assets and art direction.',
      features: ['Art Direction', 'Motion Graphics', '3D Asset Gen', 'Photography'],
      code: 'VIS.ID.03',
      imageUrls: [
        'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80',
        'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80',
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=80',
        'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80'
      ]
    },
    {
      id: 'web',
      title: 'WEB DESIGN',
      description: 'Responsive architectural layouts for the web. Performance-first methodology.',
      features: ['E-commerce', 'Portfolio', 'Landing Pages', 'Microsites'],
      code: 'WEB.ARCH.04',
      imageUrls: [
        'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=400&q=80',
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&q=80',
        'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&q=80',
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80'
      ]
    },
    {
      id: 'some',
      title: 'SoMe OPTIMERING',
      description: 'Strategisk indhold og kampagner der engagerer din målgruppe på sociale medier.',
      features: ['Content Strategi', 'Grafisk Design', 'Kampagner', 'Community Management'],
      code: 'SOC.MED.05',
      imageUrls: [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
        'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&q=80',
        'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&q=80',
        'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&q=80'
      ]
    },
    {
      id: 'custom-code',
      title: 'CUSTOM KODE',
      description: 'Skræddersyede løsninger og integrationer der løfter din digitale platform.',
      features: ['Web Development', 'API Integration', 'Animations', 'Custom Features'],
      code: 'DEV.OPS.06',
      imageUrls: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
        'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400&q=80',
        'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&q=80',
        'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80'
      ]
    },
  ];

  return (
    <div 
      className="flex h-screen bg-white text-black font-sans overflow-hidden selection:bg-black selection:text-white"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
           }}
      />
      
      {/* Interactive Spotlight Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{ 
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.1), transparent 40%)`
          }}
        />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: 'linear-gradient(#1b1b1b 1px, transparent 1px), linear-gradient(90deg, #1b1b1b 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>
      </div>
      
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
        <div className="relative z-10">
          
          {/* Header Area */}
          <div className="bg-white w-full border-b border-[#EBE9E9]">
            <div className="max-w-[1400px] mx-auto px-4 md:px-12 h-[127px] flex items-center">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-[-0.05em] leading-none">
                SERVICES
              </h1>
            </div>
          </div>

          {/* Services Grid - Technical Layout */}
          <div className="max-w-[1400px] mx-auto px-4 md:px-12 pt-4 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-black bg-black">
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                  className={`group relative border-r border-b border-black p-8 md:p-12 flex flex-col justify-between transition-all duration-500 ease-in-out cursor-pointer overflow-hidden h-full ${
                    expandedService === service.id 
                      ? 'min-h-[600px] bg-black text-white' 
                      : 'min-h-[500px] bg-white hover:bg-black text-black'
                  }`}
                >
                  {/* Crosshair Decorations */}
                  <div className={`absolute top-2 left-2 ${expandedService === service.id ? 'text-white/20' : 'text-black/20 group-hover:text-white/20'}`}><Plus size={12} strokeWidth={1} /></div>
                  <div className={`absolute top-2 right-2 ${expandedService === service.id ? 'text-white/20' : 'text-black/20 group-hover:text-white/20'}`}><Plus size={12} strokeWidth={1} /></div>

                  {/* Giant Editorial Number Background */}
                  <div 
                    className={`absolute bottom-[-20px] right-[-20px] text-[200px] leading-none font-black tracking-tighter select-none pointer-events-none transition-all duration-700 ease-out ${
                      expandedService === service.id 
                        ? 'opacity-10 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-10 scale-95'
                    }`}
                    style={{ 
                      WebkitTextStroke: '2px rgba(255,255,255,0.3)',
                      color: 'transparent' 
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Top Bar */}
                  <div className="flex justify-between items-start mb-12">
                    <div className={`border px-3 py-1 text-xs font-bold font-mono ${expandedService === service.id ? 'border-white text-white' : 'border-black group-hover:border-white group-hover:text-white'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className={`text-[10px] font-mono tracking-widest uppercase ${expandedService === service.id ? 'text-white/60' : 'text-gray-400 group-hover:text-white/60'}`}>
                      {service.code}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                    <h3 className={`text-4xl md:text-5xl font-black tracking-[-0.05em] leading-[0.9] mb-6 break-words hyphens-auto ${expandedService === service.id ? 'text-white' : 'group-hover:text-white'}`}>
                      {service.title}
                    </h3>
                    
                    {/* Expanded Content - Animated Reveal */}
                    <div className={`transition-all duration-500 overflow-hidden flex flex-col ${expandedService === service.id ? 'max-h-[600px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                        <p className={`text-sm font-medium max-w-md leading-relaxed mb-8 ${expandedService === service.id ? 'text-white/80' : 'text-gray-500 group-hover:text-white/80'}`}>
                          {service.description}
                        </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className={`mt-12 pt-8 border-t border-dashed overflow-hidden ${expandedService === service.id ? 'border-white/30' : 'border-black/20 group-hover:border-white/30'}`}>
                    <div className="flex whitespace-nowrap animate-marquee">
                      {[...service.features, ...service.features, ...service.features, ...service.features, ...service.features, ...service.features].map((feature, i) => (
                        <span key={i} className={`mx-4 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shrink-0 ${expandedService === service.id ? 'text-white' : 'group-hover:text-white'}`}>
                          <span className={`w-1 h-1 rounded-full ${expandedService === service.id ? 'bg-white' : 'bg-black group-hover:bg-white'}`}></span>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* THE SYSTEM - Methodology Section */}
            <div className="mt-24 mb-12">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-black flex-1" />
                <span className="font-mono text-xs tracking-widest uppercase">System Architecture</span>
                <div className="h-px bg-black flex-1" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: '01', id: 'INPUT', title: 'DISCOVERY', desc: 'Analysing requirements and defining system parameters.' },
                  { step: '02', id: 'PROCESS', title: 'DESIGN', desc: 'Architecting visual systems and user interfaces.' },
                  { step: '03', id: 'COMPILE', title: 'DEVELOPMENT', desc: 'Writing clean, performant code and integration.' },
                  { step: '04', id: 'DEPLOY', title: 'LAUNCH', desc: 'System activation and performance monitoring.' }
                ].map((item, i) => (
                  <div key={i} className="relative group cursor-default">
                    {/* Connecting Line (Desktop) */}
                    {i < 3 && (
                      <div className="hidden md:block absolute top-[1.6rem] left-[60%] right-[-40%] h-px bg-black/10 group-hover:bg-black transition-colors delay-100" />
                    )}
                    
                    <div className="text-4xl font-black tracking-tighter mb-4 opacity-20 group-hover:opacity-100 transition-opacity">
                      {item.step}
                    </div>
                    
                    <div className="font-mono text-xs text-black/50 mb-2 group-hover:text-black transition-colors">
                      {`// ${item.id}`}
                    </div>
                    
                    <h4 className="text-xl font-bold uppercase tracking-tight mb-3">
                      {item.title}
                    </h4>
                    
                    <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Creative Data Strip Separator */}
            <div className="mt-24 py-4 overflow-hidden bg-black text-white flex items-center">
              <div className="animate-marquee whitespace-nowrap flex gap-8 font-mono text-xs tracking-[0.2em] opacity-70">
                {[...Array(10)].map((_, i) => (
                  <span key={i} className="flex items-center gap-8">
                     /// READY TO BUILD /// SYSTEM.INIT /// SCROLL.DOWN /// HOFFMEISTER.STUDIO ///
                  </span>
                ))}
              </div>
            </div>

            {/* Big CTA */}
            <div className="">
              <div className="py-24 px-8 md:px-0 text-center">
                <h2 className="text-[12vw] leading-[0.9] font-black uppercase tracking-[-0.05em] mb-8">
                  Let's Talk
                </h2>
                <Link 
                  to="/kontakt"
                  className="inline-block bg-black text-white px-12 py-5 text-xl font-bold uppercase tracking-widest hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
                >
                  Start Project
                </Link>
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

      {/* CSS for animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Services;

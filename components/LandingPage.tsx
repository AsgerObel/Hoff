import React from 'react';
import { Link } from 'react-router-dom';
import LiveClock from './LiveClock';

const LandingPage: React.FC = () => {
  const borderColor = "border-[#EBE9E9]";
  const marqueeServices = "BRAND IDENTITY — WEB DESIGN — ART DIRECTION — DIGITAL STRATEGY — CAMPAIGN — SOCIAL MEDIA — ";

  return (
    <div className="flex h-screen bg-white text-black font-sans selection:bg-[#1D5E2C] selection:text-white overflow-hidden">
      
      {/* LEFT FIXED COLUMN */}
      <div className={`w-[188px] flex flex-col justify-between border-r ${borderColor} relative z-50`}>
          {/* Top Left: SERVICES */}
          <div className={`h-24 flex items-center justify-center border-b ${borderColor} bg-white hover:bg-[#EBE9E9] transition-colors cursor-pointer`}>
              <span className="text-lg font-bold uppercase tracking-[-0.05em]">SERVICES</span>
          </div>

          {/* Middle Decoration (Optional) */}
          <div className="flex-1 flex flex-col justify-center items-center">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 rotate-180 [writing-mode:vertical-rl]">
                  EST. 2025 — AARHUS
              </div>
          </div>

          {/* Bottom Left: CASES */}
          <div className={`h-[72px] flex items-center justify-center border-t ${borderColor} bg-white hover:bg-[#EBE9E9] transition-colors cursor-pointer`}>
              <span className="text-lg font-bold uppercase tracking-[-0.05em]">CASES</span>
          </div>
      </div>

      {/* CENTER SCROLLABLE COLUMN */}
      <div className="flex-1 flex flex-col overflow-y-auto relative scrollbar-hide">
          
          {/* Sticky Header: LOGO */}
          <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm h-24 shrink-0 flex items-center justify-center border-b ${borderColor}`}>
              <div className="text-center pt-3">
                  <h1 className="text-2xl font-black uppercase tracking-[-0.05em] leading-none text-[#1D5E2C]">HOFFMEISTER</h1>
                  <h1 className="text-2xl font-black uppercase tracking-[-0.05em] leading-none text-[#1D5E2C]">STUDIO</h1>
              </div>
          </header>

          {/* HERO VIDEO - Adjusted for alignment */}
          <div className={`w-full flex flex-col items-center justify-center relative group border-b ${borderColor} min-h-[calc(100vh-6rem)]`}>
               <div className="w-full h-full absolute inset-0 bg-[url('https://picsum.photos/1600/900?grayscale')] bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
               <div className="relative z-10 bg-white p-6 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-xl font-bold uppercase tracking-[-0.05em]">SHOWREEL 2025</span>
               </div>
          </div>

          {/* MARQUEE */}
          <div className={`border-b ${borderColor} py-6 overflow-hidden bg-black text-white`}>
            <div className="animate-marquee whitespace-nowrap flex gap-8">
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-4xl md:text-6xl font-black uppercase tracking-[-0.05em] opacity-80">
                        {marqueeServices}
                    </span>
                ))}
            </div>
          </div>

          {/* PROJECTS LIST */}
          <div>
              {/* Project 1 */}
              <div className={`min-h-[600px] border-b ${borderColor} relative group overflow-hidden flex flex-col justify-end p-12`}>
                  <img src="https://picsum.photos/1200/800?random=1" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 z-0" alt="Mols Linjen" />
                  <div className="relative z-10 flex justify-between items-end text-white mix-blend-difference">
                       <span className="text-9xl font-black leading-none opacity-50">01</span>
                       <h2 className="text-6xl font-black uppercase tracking-[-0.05em] leading-none text-right">MOLS<br/>LINJEN</h2>
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-0 pointer-events-none"></div>
              </div>

               {/* Project 2 */}
               <div className={`min-h-[600px] border-b ${borderColor} relative group overflow-hidden flex flex-col justify-end p-12`}>
                  <img src="https://picsum.photos/1200/800?random=2" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 z-0" alt="Nordic Seaplanes" />
                   <div className="relative z-10 flex justify-between items-end text-white mix-blend-difference">
                       <h2 className="text-6xl font-black uppercase tracking-[-0.05em] leading-none text-left">NORDIC<br/>SEAPLANES</h2>
                       <span className="text-9xl font-black leading-none opacity-50">02</span>
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-0 pointer-events-none"></div>
              </div>
          </div>

          {/* MANIFESTO */}
          <section className={`bg-[#1D5E2C] text-white p-16 md:py-32 text-center border-b ${borderColor}`}>
             <p className="text-3xl md:text-5xl font-bold uppercase leading-tight tracking-[-0.05em] max-w-4xl mx-auto">
                "Brutally simple digital products for complex problems."
             </p>
             <button className="mt-12 border border-white px-8 py-4 text-lg font-bold uppercase tracking-widest hover:bg-white hover:text-[#1D5E2C] transition-colors">
                Start a Project
             </button>
          </section>

          {/* FOOTER CONTENT (Newsletter, Legal) */}
          <footer className="px-16 py-10 border-t border-[#EBE9E9] mt-64">
             <div className="grid grid-cols-3 w-full h-full items-start">
                {/* Left: Socials */}
                <div className="flex flex-col justify-between h-full">
                    <span className="text-sm font-bold uppercase tracking-widest">©2025</span>
                    <div className="flex flex-col gap-2 mt-8">
                        <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-[#1D5E2C] flex items-center gap-2">
                            <span className="text-gray-300">//</span> LinkedIn
                        </a>
                        <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-[#1D5E2C] flex items-center gap-2">
                            <span className="text-gray-300">//</span> Instagram
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
                <div className="flex flex-col justify-between h-full text-right">
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

      {/* RIGHT FIXED COLUMN */}
      <div className={`w-[188px] flex flex-col justify-between border-l ${borderColor} relative z-50`}>
          {/* Top Right: LOGIN */}
          <div className={`h-24 flex items-center justify-center border-b ${borderColor} bg-white hover:bg-[#EBE9E9] transition-colors cursor-pointer`}>
              <Link to="/login" className="text-lg font-bold uppercase tracking-[-0.05em] w-full h-full flex items-center justify-center">LOGIN</Link>
          </div>

          {/* Middle Decoration (Scroll Indicator) */}
          <div className="flex-1 flex flex-col justify-center items-center">
               <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 rotate-180 [writing-mode:vertical-rl]">
                  56° 09' N — 10° 12' E
              </div>
          </div>

          {/* Bottom Right: KONTAKT */}
          <Link to="/kontakt" className={`h-[72px] flex items-center justify-center border-t ${borderColor} bg-white hover:bg-[#EBE9E9] transition-colors cursor-pointer`}>
              <span className="text-lg font-bold uppercase tracking-[-0.05em]">KONTAKT</span>
          </Link>
      </div>

    </div>
  );
};

export default LandingPage;

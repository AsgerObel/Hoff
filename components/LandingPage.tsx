import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const borderColor = "border-[#EBE9E9]";

  return (
    <div className="flex flex-col h-screen bg-white text-black font-sans overflow-hidden">
      {/* Header Navigation Row */}
      <header className={`grid grid-cols-[250px_1fr_250px] h-24 border-b ${borderColor}`}>
        {/* Cell 1: Services */}
        <div className={`flex items-center justify-center border-r ${borderColor}`}>
           <span className="text-xl font-bold uppercase tracking-[-0.05em]">SERVICES</span>
        </div>
        
        {/* Cell 2: Logo */}
        <div className={`flex items-center justify-center border-r ${borderColor}`}>
           <div className="text-center">
              <h1 className="text-3xl font-black uppercase tracking-[-0.05em] leading-none text-[#1D5E2C]">HOFFMEISTER</h1>
              <h1 className="text-3xl font-black uppercase tracking-[-0.05em] leading-none text-[#1D5E2C]">STUDIO</h1>
           </div>
        </div>

        {/* Cell 3: Login */}
        <div className="flex items-center justify-center">
           <Link to="/login" className="text-xl font-bold uppercase tracking-[-0.05em] hover:opacity-50 transition-opacity">LOGIN</Link>
        </div>
      </header>

      {/* Main Content Row */}
      <main className={`flex-1 grid grid-cols-[250px_1fr_250px] border-b ${borderColor}`}>
        {/* Column 1 */}
        <div className={`hidden md:block border-r ${borderColor}`}></div>

        {/* Column 2: Video */}
        <div className={`flex items-center justify-center p-8 md:p-12 border-r ${borderColor}`}>
           <div className="w-full aspect-video bg-[#D9D9D9] flex flex-col items-center justify-center shadow-sm">
              <span className="text-xl font-bold uppercase tracking-[-0.05em]">VIDEO</span>
           </div>
        </div>

        {/* Column 3 */}
        <div className="hidden md:block"></div>
      </main>

      {/* Footer Navigation Row */}
      <footer className="grid grid-cols-[250px_1fr_250px] h-24">
         {/* Cell 1: Cases */}
         <div className={`flex items-center justify-center border-r ${borderColor}`}>
            <span className="text-xl font-bold uppercase tracking-[-0.05em]">CASES</span>
         </div>

         {/* Cell 2: Empty Center */}
         <div className={`border-r ${borderColor}`}></div>

         {/* Cell 3: Kontakt */}
         <div className="flex items-center justify-center">
            <span className="text-xl font-bold uppercase tracking-[-0.05em]">KONTAKT</span>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;

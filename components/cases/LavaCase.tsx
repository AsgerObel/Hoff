import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ArrowLeft, Play, X } from 'lucide-react';
import PublicSidebar from '../PublicSidebar';
import LiveClock from '../LiveClock';

const LavaCase: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Lava case content
  const caseInfo = {
    title: 'Lava',
    category: 'Social Media',
    year: '2024',
    description: 'Social media strategi og content creation for Lava — en serie af engagerende posts, stories og video content der fanger restaurantens unikke atmosfære.',
    services: ['Social Media Posts', 'Instagram Stories', 'Video Content'],
  };

  // Group images by type
  const instagramPosts = [
    { src: '/cases/lava/maanedens-ret.png', title: 'Månedens ret' },
    { src: '/cases/lava/maanedens-ret-januar.png', title: 'Månedens ret - Januar' },
    { src: '/cases/lava/maanedens-ret-februar.png', title: 'Månedens ret - Februar' },
    { src: '/cases/lava/maanedens-ret-december.png', title: 'Månedens ret - December' },
    { src: '/cases/lava/maanedens-cocktail-post.png', title: 'Månedens cocktail' },
    { src: '/cases/lava/frokost-post.png', title: 'Frokost tilbud' },
  ];

  const stories = [
    { src: '/cases/lava/maanedens-cocktail-story.png', title: 'Månedens cocktail story' },
    { src: '/cases/lava/frokost-story.png', title: 'Frokost tilbud story' },
  ];

  const video = {
    src: '/cases/lava/maanedens-cocktail-video.mp4',
    title: 'Månedens cocktail - November',
    thumbnail: '/cases/lava/maanedens-cocktail-post.png'
  };

  return (
    <div className="flex h-screen bg-[#0C3925] text-white font-sans overflow-hidden selection:bg-white selection:text-[#0C3925]">
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0C3925] border-b border-white/10 flex items-center justify-between px-6 z-40">
        <Link to="/" className="font-black uppercase tracking-[-0.05em] text-lg">Hoffmeister Studio</Link>
        <button onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <PublicSidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        darkMode={true}
        backgroundColor="#0C3925"
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0">
        {/* Font Imports */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
          
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
               backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', 
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
            <div className="w-full md:w-[60%] border-r border-white/10 relative">
              
              {/* Visuals Container - Padding matches right side */}
              <div className="p-4 md:p-12 space-y-24 pb-24 relative">
                
                {/* 1. Video Visual */}
                <div className="space-y-6">
                  <div className="md:hidden mb-4">
                    <h2 className="text-sm font-black uppercase tracking-widest text-white mb-2">Video Content</h2>
                    <p className="text-white/90 text-sm leading-relaxed">
                      En dynamisk videoproduktion der viser 'Månedens Cocktail' i aktion.
                    </p>
                  </div>
                  <div 
                    className="relative aspect-[9/16] w-full rounded-lg overflow-hidden cursor-pointer group bg-black/20"
                    onClick={() => setVideoModalOpen(true)}
                  >
                    <video 
                      src={video.src}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  </div>
                </div>

                {/* 2. Posts Visuals */}
                <div className="space-y-6">
                   <div className="md:hidden mb-4">
                    <h2 className="text-sm font-black uppercase tracking-widest text-white mb-2">Instagram Posts</h2>
                    <p className="text-white/90 text-sm leading-relaxed">
                      En konsistent visuel identitet på tværs af opslag sikrer genkendelighed.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    {instagramPosts.map((post, idx) => (
                      <div 
                        key={idx}
                        className={`aspect-square overflow-hidden rounded-lg cursor-pointer image-hover bg-black/20`}
                        onClick={() => setSelectedImage(post.src)}
                      >
                        <img 
                          src={post.src} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Stories Visuals */}
                <div className="space-y-6">
                  <div className="md:hidden mb-4">
                    <h2 className="text-sm font-black uppercase tracking-widest text-white mb-2">Instagram Stories</h2>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Stories bruges til her-og-nu kommunikation og tilbud.
                    </p>
                  </div>
                  <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 md:flex-wrap">
                    {stories.map((story, idx) => (
                      <div 
                        key={idx}
                        className={`w-[200px] md:w-[45%] shrink-0 aspect-[9/16] overflow-hidden rounded-xl cursor-pointer image-hover bg-black/20`}
                        onClick={() => setSelectedImage(story.src)}
                      >
                        <img 
                          src={story.src} 
                          alt={story.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              
              {/* Mobile Next Case CTA (Visible only on mobile at bottom of content) */}
              <div className="md:hidden border-t border-white/10 p-8">
                <Link to="/cases" className="group flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Se flere</span>
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
                    <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-[-0.05em] leading-[0.9] mb-6">
                      {caseInfo.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {caseInfo.services.map((service, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider border border-white/20 text-white/80"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Section Descriptions - Contextual */}
                  <div className="space-y-6 pt-6 border-t border-white/10">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-white mb-1">Content Production</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Produktion af high-end billedmateriale til sociale medier med fokus på 'Månedens Ret' og cocktails. Billedstilen er holdt i mørke, varme toner for at spejle restaurantens intime atmosfære og fremhæve råvarernes tekstur.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-white mb-1">Video & Motion</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Udvikling af engagerende reels der dokumenterer bartenderens håndværk. Videoerne fungerer som blikfang i feedet og giver potentielle gæster en forsmag på oplevelsen, hvilket styrker brandets digitale tilstedeværelse.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-white mb-1">Campaign Strategy</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Strategisk eksekvering af stories og opslag til promotion af frokosttilbud. Vi har skabt et fleksibelt grafisk univers, der gør det muligt at kommunikere skarpe priser og tilbud, samtidig med at det eksklusive udtryk bevares.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 border-t border-white/10 mt-auto">
                  <Link 
                    to="/cases"
                    className="group flex items-center justify-between hover:opacity-70 transition-opacity"
                  >
                    <div>
                      <span className="text-xs font-medium text-white/60 uppercase tracking-widest">Se flere</span>
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
          <footer className="px-8 md:px-16 py-10 border-t border-white/10 bg-[#0C3925] z-20 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full h-full items-start">
              {/* Left: Socials */}
              <div className="flex flex-col justify-between h-full">
                <span className="text-sm font-bold uppercase tracking-widest text-white/60">©2025</span>
                <div className="flex flex-col gap-2 mt-8">
                  <a href="#" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white flex items-center gap-2 transition-colors">
                    <span className="text-white/40">//</span> LinkedIn
                  </a>
                  <a href="#" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white flex items-center gap-2 transition-colors">
                    <span className="text-white/40">//</span> Instagram
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
                  <a href="mailto:NIKOLAJ@gmail.com" className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white hover:underline transition-colors">NIKOLAJ@gmail.com</a>
                  <span className="text-sm font-bold uppercase tracking-widest text-white/60">+45123456789</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Video Modal */}
      {videoModalOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={() => setVideoModalOpen(false)}
          >
            <X size={32} />
          </button>
          <video 
            src={video.src}
            className="max-h-[90vh] max-w-full rounded-lg"
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

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

export default LavaCase;

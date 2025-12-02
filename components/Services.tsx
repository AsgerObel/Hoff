import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Palette, Monitor, Box, Briefcase, Target, Megaphone, ArrowRight } from 'lucide-react';
import PublicSidebar from './PublicSidebar';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const Services: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const services: ServiceItem[] = [
    {
      id: 'branding',
      title: 'Branding',
      description: 'Vi skaber stærke brands der skiller sig ud og skaber forbindelse til din målgruppe.',
      icon: <Briefcase size={24} />,
      features: ['Logo Design', 'Brand Guidelines', 'Tone of Voice', 'Brand Strategy', 'Navngivning']
    },
    {
      id: 'identity',
      title: 'Visuel Identitet',
      description: 'Sammenhængende visuelle systemer der styrker dit brand på tværs af alle touchpoints.',
      icon: <Palette size={24} />,
      features: ['Farvepalette', 'Typografi', 'Ikonografi', 'Billedstil', 'Templates']
    },
    {
      id: 'web',
      title: 'Web Design',
      description: 'Moderne, responsive websites der konverterer besøgende til kunder.',
      icon: <Monitor size={24} />,
      features: ['UI/UX Design', 'Responsive Design', 'E-commerce', 'CMS Integration', 'Performance']
    },
    {
      id: 'some',
      title: 'Social Media',
      description: 'Strategisk indhold og kampagner der engagerer din målgruppe på sociale medier.',
      icon: <Box size={24} />,
      features: ['Content Strategi', 'Grafisk Design', 'Kampagner', 'Community Management', 'Analytics']
    },
    {
      id: 'strategy',
      title: 'Digital Strategi',
      description: 'Datadrevet strategi der sikrer at din digitale tilstedeværelse understøtter dine forretningsmål.',
      icon: <Target size={24} />,
      features: ['Markedsanalyse', 'Konkurrentanalyse', 'Målgruppeanalyse', 'KPI Definition', 'Roadmap']
    },
    {
      id: 'campaign',
      title: 'Kampagner',
      description: 'Kreative kampagner der skaber opmærksomhed og driver resultater.',
      icon: <Megaphone size={24} />,
      features: ['Konceptudvikling', 'Art Direction', 'Produktion', 'Media Planning', 'Rapportering']
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
                SERVICES
              </h1>
            </div>
          </div>

          {/* Services List */}
          <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-8 md:py-12">
            <div className="space-y-4">
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  className="border border-[#EBE9E9] bg-white hover:border-black transition-colors"
                >
                  {/* Service Header - Always visible */}
                  <button
                    onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                    className="w-full p-6 md:p-8 flex items-center gap-6 text-left group"
                  >
                    {/* Number */}
                    <span className="text-4xl md:text-5xl font-black text-gray-200 leading-none select-none w-16 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Icon */}
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center shrink-0 group-hover:bg-gray-800 transition-colors">
                      {service.icon}
                    </div>

                    {/* Title & Description */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-[-0.05em] mb-1">{service.title}</h3>
                      <p className="text-sm text-gray-500 font-medium hidden md:block">{service.description}</p>
                    </div>

                    {/* Expand Icon */}
                    <div className={`w-10 h-10 border border-black flex items-center justify-center shrink-0 transition-transform ${expandedService === service.id ? 'rotate-90' : ''}`}>
                      <ArrowRight size={16} />
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {expandedService === service.id && (
                    <div className="border-t border-[#EBE9E9] p-6 md:p-8 md:pl-[104px] animate-enter">
                      <p className="text-sm text-gray-600 mb-6 md:hidden">{service.description}</p>
                      
                      <div className="mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">
                          Hvad vi tilbyder
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature) => (
                            <span 
                              key={feature}
                              className="px-3 py-1.5 bg-[#F9F9F9] border border-[#EBE9E9] text-xs font-bold uppercase tracking-[-0.05em]"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link 
                        to="/kontakt"
                        className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold uppercase text-xs tracking-[-0.05em] hover:bg-gray-800 transition-colors group"
                      >
                        <span>Start et projekt</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 p-8 md:p-12 bg-[#F9F9F9] border border-[#EBE9E9] text-center">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-[-0.05em] mb-4">
                Har du et projekt i tankerne?
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Vi hjælper dig med at finde den rette løsning. Kontakt os for en uforpligtende snak.
              </p>
              <Link 
                to="/kontakt"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold uppercase text-sm tracking-[-0.05em] hover:bg-gray-800 transition-colors group"
              >
                <span>Kontakt os</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Services;


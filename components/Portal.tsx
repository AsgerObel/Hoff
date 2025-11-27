import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Settings from './Settings';
import ProjectCard from './ProjectCard';
import { User, UserRole, ProjectTask, ProjectStatus, Comment } from '../types';
import { Menu } from 'lucide-react';

// Initial Mock Data
const INITIAL_USER: User = {
  id: 'u1',
  name: 'Sebastian Bang',
  initials: 'SB',
  role: UserRole.CLIENT,
};

const INITIAL_TASKS: ProjectTask[] = [
  {
    id: 't1',
    category: 'Branding',
    title: 'Emballage Design',
    status: ProjectStatus.PENDING,
    imageUrl: 'https://picsum.photos/600/600?random=1', // Placeholder
    createdAt: '2025-10-20T09:00:00',
    lastUpdated: new Date().toISOString(),
    assets: [
        { name: 'Emballage_V1.pdf', url: '#', type: 'PDF', size: '2.4 MB' },
        { name: 'Die_Cut_Line.ai', url: '#', type: 'AI', size: '12 MB' }
    ],
    comments: [
      {
        id: 'c1',
        userId: 'admin',
        text: 'Kan Berry Bad Boy varianten laves i en mere blå nuance?',
        timestamp: '2025-08-10T15:14:00'
      }
    ]
  },
  {
    id: 't2',
    category: 'Visuel Identitet',
    title: 'Logo',
    status: ProjectStatus.IN_PROGRESS,
    imageUrl: 'https://picsum.photos/600/600?random=2',
    createdAt: '2025-11-15T14:30:00',
    lastUpdated: new Date().toISOString(),
    assets: [],
    comments: [
      {
        id: 'c2',
        userId: 'u1', // Client
        text: 'Flot design, man kan vi få ændret kaffekoppen til at være en telefon i stedet for?',
        timestamp: '2025-11-20T10:35:00'
      },
      {
        id: 'c3',
        userId: 'admin',
        text: 'Kaffekoppen bliver ændret til en telefon.',
        timestamp: '2025-11-20T14:15:00'
      }
    ]
  },
  {
    id: 't3',
    category: 'Web Design',
    title: 'Forside Layout',
    status: ProjectStatus.APPROVED,
    imageUrl: 'https://picsum.photos/600/400?random=3',
    createdAt: '2025-09-01T10:00:00',
    lastUpdated: new Date().toISOString(),
    assets: [
        { name: 'Final_Homepage_Design.fig', url: '#', type: 'JPG', size: '4.1 MB' },
        { name: 'Assets_Export.zip', url: '#', type: 'PDF', size: '25 MB' }
    ],
    comments: [
        { id: 'c4', userId: 'u1', text: 'Ser super godt ud! Godkendt herfra.', timestamp: new Date().toISOString() }
    ]
  },
  // New Tasks for Testing
  {
    id: 't4',
    category: 'SoMe',
    title: 'Instagram Kampagne Q4',
    status: ProjectStatus.PENDING,
    imageUrl: 'https://picsum.photos/600/800?random=4',
    createdAt: '2025-12-05T09:00:00',
    lastUpdated: new Date().toISOString(),
    assets: [
        { name: 'IG_Story_Mockup.png', url: '#', type: 'PNG', size: '1.2 MB' }
    ],
    comments: [
        { id: 'c5', userId: 'admin', text: 'Skal vi bruge billeder fra den nye fotoshoot til disse opslag?', timestamp: '2025-12-05T11:00:00' }
    ]
  },
  {
    id: 't5',
    category: 'Visuel Identitet',
    title: 'Farvepalette Guide',
    status: ProjectStatus.APPROVED,
    imageUrl: 'https://picsum.photos/600/600?random=5',
    createdAt: '2025-06-15T10:00:00',
    lastUpdated: new Date().toISOString(),
    assets: [
        { name: 'Brand_Guidelines_V2.pdf', url: '#', type: 'PDF', size: '8.5 MB' },
        { name: 'Color_Codes.txt', url: '#', type: 'PDF', size: '2 KB' }
    ],
    comments: [
        { id: 'c6', userId: 'u1', text: 'Præcis de farver vi ledte efter. Tak!', timestamp: '2025-06-16T09:30:00' }
    ]
  },
  {
    id: 't6',
    category: 'Web Design',
    title: 'Kontaktformular Flow',
    status: ProjectStatus.IN_PROGRESS,
    imageUrl: 'https://picsum.photos/800/600?random=6',
    createdAt: '2025-11-25T13:45:00',
    lastUpdated: new Date().toISOString(),
    assets: [],
    comments: [
        { id: 'c7', userId: 'admin', text: 'Vi har tilføjet validering på email feltet som aftalt.', timestamp: '2025-11-26T10:00:00' }
    ]
  },
  {
    id: 't7',
    category: 'Branding',
    title: 'Mulepose Mockup',
    status: ProjectStatus.PENDING,
    imageUrl: 'https://picsum.photos/600/700?random=7',
    createdAt: '2026-01-10T08:30:00',
    lastUpdated: new Date().toISOString(),
    assets: [
        { name: 'Tote_Bag_Mockup.psd', url: '#', type: 'PNG', size: '45 MB' }
    ],
    comments: [
        { id: 'c8', userId: 'u1', text: 'Kan logoet gøres ca 20% større på forsiden?', timestamp: '2026-01-10T14:20:00' }
    ]
  },
  {
    id: 't8',
    category: 'SoMe',
    title: 'LinkedIn Bannere',
    status: ProjectStatus.IN_PROGRESS,
    imageUrl: 'https://picsum.photos/800/400?random=8',
    createdAt: '2025-10-01T12:00:00',
    lastUpdated: new Date().toISOString(),
    assets: [],
    comments: []
  },
  {
    id: 't9',
    category: 'Visuel Identitet',
    title: 'Ikonpakke (Outline)',
    status: ProjectStatus.PENDING,
    imageUrl: 'https://picsum.photos/500/500?random=9',
    createdAt: '2025-12-20T15:00:00',
    lastUpdated: new Date().toISOString(),
    assets: [
         { name: 'Icons_All.svg', url: '#', type: 'SVG', size: '150 KB' }
    ],
    comments: [
        { id: 'c9', userId: 'admin', text: 'Her er første udkast til de 10 primære ikoner.', timestamp: '2025-12-20T15:05:00' }
    ]
  },
  {
    id: 't10',
    category: 'Web Design',
    title: 'Mobil Optimering',
    status: ProjectStatus.APPROVED,
    imageUrl: 'https://picsum.photos/400/800?random=10',
    createdAt: '2025-08-15T09:15:00',
    lastUpdated: new Date().toISOString(),
    assets: [
        { name: 'Mobile_Screens_Export.png', url: '#', type: 'PNG', size: '2.2 MB' }
    ],
    comments: [
        { id: 'c10', userId: 'u1', text: 'Menuen fungerer perfekt på iPhone nu.', timestamp: '2025-08-20T11:00:00' }
    ]
  }
];

const Portal: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USER);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState<ProjectTask[]>(INITIAL_TASKS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [focusedTaskId, setFocusedTaskId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleUpdateProfile = (firstName: string, lastName: string, email: string) => {
    const newName = `${firstName.trim()} ${lastName.trim()}`.trim();
    
    // Generate initials: First letter of first name + First letter of last name
    const firstInitial = firstName.trim().charAt(0) || '';
    const lastInitial = lastName.trim().charAt(0) || '';
    const newInitials = (firstInitial + lastInitial).toUpperCase();

    setCurrentUser(prev => ({
      ...prev,
      name: newName,
      initials: newInitials
    }));
    // In a real app, you would also save email to the user object or backend
    setActiveTab('dashboard'); // Redirect to dashboard to show changes
  };

  const handleAddComment = (taskId: string, text: string, attachments: string[] = []) => {
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
      attachments // Attachments included
    };

    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          comments: [...task.comments, newComment]
        };
      }
      return task;
    }));
  };

  const handleApprove = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return { ...task, status: ProjectStatus.APPROVED };
      }
      return task;
    }));
  };

  const handleUndoApprove = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        // Revert to PENDING to allow re-evaluation
        return { ...task, status: ProjectStatus.PENDING };
      }
      return task;
    }));
  };

  const handleCloseFocus = () => {
    setIsClosing(true);
    setTimeout(() => {
        setFocusedTaskId(null);
        setIsClosing(false);
    }, 250); // Match animation duration (slightly less than CSS to be safe)
  };

  const getPageTitle = () => {
    switch(activeTab) {
      case 'dashboard': 
        // Display only the first name in the welcome message
        return `VELKOMMEN ${currentUser.name.split(' ')[0].toUpperCase()}`;
      case 'some': return 'SoMe';
      case 'web': return 'WEB DESIGN';
      case 'identity': return 'VISUEL IDENTITET';
      case 'branding': return 'BRANDING';
      default: return 'OVERSIGT';
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    if (activeTab === 'settings') {
        return <Settings user={currentUser} onSave={handleUpdateProfile} />;
    }
    
    // Filter tasks if specific tab is selected (mock logic)
    let displayTasks = tasks;
    if (activeTab !== 'dashboard') {
        // Simple mapping for demo purposes
        const catMap: Record<string, string> = {
            'branding': 'Branding',
            'identity': 'Visuel Identitet',
            'web': 'Web Design',
            'some': 'SoMe'
        };
        const targetCat = catMap[activeTab];
        if (targetCat) {
            displayTasks = tasks.filter(t => t.category === targetCat);
        }
    }

    return (
      <Dashboard 
        key={activeTab}
        title={getPageTitle()}
        tasks={displayTasks} 
        currentUser={currentUser} 
        onAddComment={handleAddComment}
        onApprove={handleApprove}
        onUndoApprove={handleUndoApprove}
        onFocusTask={setFocusedTaskId}
      />
    );
  };

  const focusedTask = tasks.find(t => t.id === focusedTaskId);

  return (
    <div className="flex h-screen bg-white text-black font-sans overflow-hidden selection:bg-black selection:text-white">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#EBE9E9] flex items-center justify-between px-6 z-40">
        <span className="font-black uppercase tracking-[-0.05em] text-lg">Hoffmeister Studio</span>
        <button onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
        </button>
      </div>

      <Sidebar 
        currentUser={currentUser} 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      
      {/* Main Content Area: Removed padding on desktop to allow full-bleed sticky headers */}
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0">
         {/* Subtle Grid Background Pattern */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
              style={{ 
                  backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
                  backgroundSize: '40px 40px' 
              }}>
         </div>

         <div className="relative z-10 animate-enter h-full">
            {renderContent()}
         </div>
      </main>

       {/* FOCUS MODE OVERLAY - Outside Main Scroll Context for proper fixed positioning */}
       {focusedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
             {/* Background layer with fade in/out */}
             <div 
                className={`absolute inset-0 bg-white/95 backdrop-blur-sm ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`} 
                onClick={handleCloseFocus}
             ></div>
             
             {/* Content layer with spring zoom in/out */}
             <div className={`w-[95%] h-[95%] md:w-[90%] md:h-[90%] max-w-[1600px] flex flex-col relative shadow-2xl z-10 pointer-events-auto ${isClosing ? 'animate-modal-out' : 'animate-modal-in'}`}>
                <ProjectCard 
                    task={focusedTask} 
                    currentUser={currentUser}
                    onAddComment={handleAddComment}
                    onApprove={handleApprove}
                    onUndoApprove={handleUndoApprove}
                    isExpanded={true}
                    onExpand={handleCloseFocus} 
                />
             </div>
        </div>
      )}
    </div>
  );
};

export default Portal;


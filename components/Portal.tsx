import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Settings from './Settings';
import ProjectCard from './ProjectCard';
import AddProjectModal from './AddProjectModal';
import { User, UserRole, ProjectTask, ProjectStatus, Comment } from '../types';
import { Menu } from 'lucide-react';
import { useTheme } from './ThemeContext';

// Testdata
const INITIAL_USER: User = {
  id: 'u1',
  name: 'Hoffmeister Studio',
  initials: 'HS',
  role: UserRole.ADMIN,
};

const INITIAL_TASKS: ProjectTask[] = [
  {
    id: 't1',
    category: 'Branding',
    title: 'Emballage Design',
    status: ProjectStatus.IN_PROGRESS,
    imageUrl: 'https://picsum.photos/600/600?random=1',
    createdAt: '2025-10-20T09:00:00',
    lastUpdated: new Date().toISOString(),
    assets: [
        { name: 'Emballage_V1.pdf', url: '#', type: 'PDF', size: '2.4 MB' },
        { name: 'Die_Cut_Line.ai', url: '#', type: 'AI', size: '12 MB' }
    ],
    comments: [
      {
        id: 'c1',
        userId: 'c1',
        text: 'Kan vi prøve at gøre farven lidt mørkere, så den står skarpere?',
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
        userId: 'c1',
        text: 'Flot design, men kan vi få ændret farven på ikonet til at være mere fremtrædende?',
        timestamp: '2025-11-20T10:35:00'
      },
      {
        id: 'c3',
        userId: 'u1',
        text: 'Vi kigger på det og sender et nyt udkast i morgen.',
        timestamp: '2025-11-20T14:15:00'
      }
    ]
  },
  {
    id: 't3',
    category: 'Web Design',
    title: 'Hjemmeside Layout',
    status: ProjectStatus.APPROVED,
    imageUrl: 'https://picsum.photos/600/400?random=3',
    createdAt: '2025-09-01T10:00:00',
    lastUpdated: new Date().toISOString(),
    assets: [
        { name: 'Final_Homepage_Design.fig', url: '#', type: 'JPG', size: '4.1 MB' },
        { name: 'Assets_Export.zip', url: '#', type: 'PDF', size: '25 MB' }
    ],
    comments: [
        { id: 'c4', userId: 'c1', text: 'Ser super godt ud! Godkendt herfra.', timestamp: new Date().toISOString() }
    ]
  },
  {
    id: 't4',
    category: 'SoMe',
    title: 'Instagram Opslag',
    status: ProjectStatus.PENDING,
    imageUrl: 'https://picsum.photos/600/800?random=4',
    createdAt: '2025-12-05T09:00:00',
    lastUpdated: new Date().toISOString(),
    assets: [
        { name: 'IG_Story_Mockup.png', url: '#', type: 'PNG', size: '1.2 MB' }
    ],
    comments: [
        { id: 'c5', userId: 'u1', text: 'Her er udkast til jeres opslag. Er teksten som I ønskede?', timestamp: '2025-12-05T11:00:00' }
    ]
  },
  {
    id: 't5',
    category: 'Visuel Identitet',
    title: 'Brand Farver',
    status: ProjectStatus.APPROVED,
    imageUrl: 'https://picsum.photos/600/600?random=5',
    createdAt: '2025-06-15T10:00:00',
    lastUpdated: new Date().toISOString(),
    assets: [
        { name: 'Brand_Guidelines_V2.pdf', url: '#', type: 'PDF', size: '8.5 MB' },
        { name: 'Color_Codes.txt', url: '#', type: 'PDF', size: '2 KB' }
    ],
    comments: [
        { id: 'c6', userId: 'c1', text: 'Præcis de farver vi ledte efter. Tak!', timestamp: '2025-06-16T09:30:00' }
    ]
  },
  {
    id: 't6',
    category: 'Web Design',
    title: 'Hjemmeside Design',
    status: ProjectStatus.IN_PROGRESS,
    imageUrl: 'https://picsum.photos/800/600?random=6',
    createdAt: '2025-11-25T13:45:00',
    lastUpdated: new Date().toISOString(),
    assets: [],
    comments: [
        { id: 'c7', userId: 'u1', text: 'Vi har opdateret layoutet, så det matcher jeres ønsker.', timestamp: '2025-11-26T10:00:00' }
    ]
  },
  {
    id: 't7',
    category: 'Branding',
    title: 'Mulepose',
    status: ProjectStatus.IN_PROGRESS,
    imageUrl: 'https://picsum.photos/600/700?random=7',
    createdAt: '2026-01-10T08:30:00',
    lastUpdated: new Date().toISOString(),
    assets: [
        { name: 'Tote_Bag_Mockup.psd', url: '#', type: 'PNG', size: '45 MB' }
    ],
    comments: [
        { id: 'c8', userId: 'c1', text: 'Ser godt ud. Kan vi se det med sort baggrund også?', timestamp: '2026-01-10T14:20:00' }
    ]
  },
  {
    id: 't8',
    category: 'SoMe',
    title: 'LinkedIn Grafik',
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
    title: 'Ikoner',
    status: ProjectStatus.PENDING,
    imageUrl: 'https://picsum.photos/500/500?random=9',
    createdAt: '2025-12-20T15:00:00',
    lastUpdated: new Date().toISOString(),
    assets: [
         { name: 'Icons_All.svg', url: '#', type: 'SVG', size: '150 KB' }
    ],
    comments: [
        { id: 'c9', userId: 'u1', text: 'Her er første udkast til de 10 primære ikoner.', timestamp: '2025-12-20T15:05:00' }
    ]
  },
  {
    id: 't10',
    category: 'Web Design',
    title: 'Mobil Design',
    status: ProjectStatus.APPROVED,
    imageUrl: 'https://picsum.photos/400/800?random=10',
    createdAt: '2025-08-15T09:15:00',
    lastUpdated: new Date().toISOString(),
    assets: [
        { name: 'Mobile_Screens_Export.png', url: '#', type: 'PNG', size: '2.2 MB' }
    ],
    comments: [
        { id: 'c10', userId: 'c1', text: 'Menuen fungerer perfekt nu. Godt arbejde!', timestamp: '2025-08-20T11:00:00' }
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
  const [showAddModal, setShowAddModal] = useState(false);
  const { darkMode } = useTheme();

  const bgColor = darkMode ? 'bg-[#1b1b1b]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-white/20' : 'border-[#EBE9E9]';
  const gridColor = darkMode ? '#ffffff' : '#1b1b1b';
  const selectionClass = darkMode ? 'selection:bg-white selection:text-black' : 'selection:bg-black selection:text-white';
  const mobileHeaderBg = darkMode ? 'bg-[#1b1b1b]' : 'bg-white';

  const handleUpdateProfile = (firstName: string, lastName: string, email: string) => {
    const newName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const firstInitial = firstName.trim().charAt(0) || '';
    const lastInitial = lastName.trim().charAt(0) || '';
    const newInitials = (firstInitial + lastInitial).toUpperCase();

    setCurrentUser(prev => ({
      ...prev,
      name: newName,
      initials: newInitials
    }));
    setActiveTab('dashboard');
  };

  const handleAddComment = (taskId: string, text: string, attachments: string[] = []) => {
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
      attachments
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
        return { ...task, status: ProjectStatus.IN_PROGRESS };
      }
      return task;
    }));
  };

  const handleAddProject = (data: { title: string; category: string; figmaUrl: string }) => {
    const newTask: ProjectTask = {
      id: `t${Date.now()}`,
      category: data.category,
      title: data.title,
      status: ProjectStatus.IN_PROGRESS,
      imageUrl: data.figmaUrl, // Store the Figma URL
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      assets: [],
      comments: []
    };
    
    setTasks(prev => [newTask, ...prev]);
  };

  const handleCloseFocus = () => {
    setIsClosing(true);
    setTimeout(() => {
        setFocusedTaskId(null);
        setIsClosing(false);
    }, 250);
  };

  const getPageTitle = () => {
    switch(activeTab) {
      case 'dashboard': 
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
    
    let displayTasks = tasks;
    if (activeTab !== 'dashboard') {
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
        onOpenAddModal={() => setShowAddModal(true)}
      />
    );
  };

  const focusedTask = tasks.find(t => t.id === focusedTaskId);

  return (
    <div className={`flex h-screen ${bgColor} ${textColor} font-sans overflow-hidden ${selectionClass} transition-colors duration-300`}>
      {/* Mobil header */}
      <div className={`md:hidden fixed top-0 left-0 right-0 h-16 ${mobileHeaderBg} border-b ${borderColor} flex items-center justify-between px-6 z-40 transition-colors duration-300`}>
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
      
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0">
         {/* Grid baggrund */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 transition-colors duration-300" 
              style={{ 
                  backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, 
                  backgroundSize: '40px 40px' 
              }}>
         </div>

         <div className="relative z-10 animate-enter h-full">
            {renderContent()}
         </div>
      </main>

       {/* Fokus-tilstand overlay */}
       {focusedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
             <div 
                className={`absolute inset-0 ${darkMode ? 'bg-black/90' : 'bg-white/95'} backdrop-blur-sm ${isClosing ? 'animate-fade-out' : 'animate-fade-in'} transition-colors duration-300`} 
                onClick={handleCloseFocus}
             ></div>
             
             <div className={`w-[95%] h-[95%] md:w-[90%] md:h-[90%] max-w-[1600px] flex flex-col relative shadow-2xl z-10 pointer-events-auto ${isClosing ? 'animate-modal-out' : 'animate-modal-in'}`}>
                <ProjectCard 
                    task={focusedTask} 
                    currentUser={currentUser}
                    onAddComment={handleAddComment}
                    onApprove={handleApprove}
                    onUndoApprove={handleUndoApprove}
                    isExpanded={true}
                    onExpand={handleCloseFocus} 
                    darkMode={darkMode}
                />
             </div>
        </div>
      )}

      {/* Tilføj projekt modal */}
      <AddProjectModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={(data) => {
          handleAddProject(data);
          setShowAddModal(false);
        }}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Portal;

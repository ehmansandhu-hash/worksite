
import React, { useState, useCallback } from 'react';
import { UserRole, ProjectData, AppTab } from './types';
import { INITIAL_PROJECT_DATA } from './constants';
import { FinancialEngine } from './components/FinancialEngine';
import { ProgressFeed } from './components/ProgressFeed';
import { CostCalculator } from './components/CostCalculator';
import { Contracts } from './components/Contracts';
import { Marketplace } from './components/Marketplace';
import { LeadsPipeline } from './components/LeadsPipeline';
import { Messages } from './components/Messages';
import { Team } from './components/Team';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('HOMEOWNER');
  const [activeTab, setActiveTab] = useState<AppTab>('DASHBOARD');
  const [project, setProject] = useState<ProjectData>(INITIAL_PROJECT_DATA);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleApproveMilestone = useCallback((milestoneId: string) => {
    setProject(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => 
        m.id === milestoneId ? { ...m, status: 'RELEASED' } : m
      )
    }));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const switchTab = (tab: AppTab) => {
    setActiveTab(tab);
    closeSidebar();
  };

  const renderContent = () => {
    if (activeTab === 'MARKETPLACE') return <Marketplace />;
    if (activeTab === 'LEADS') return <LeadsPipeline />;
    if (activeTab === 'MESSAGES') return <Messages role={role} />;
    if (activeTab === 'TEAM') return <Team role={role} />;
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column: Financials and Legal */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          <FinancialEngine 
            project={project} 
            role={role} 
            onApproveMilestone={handleApproveMilestone} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <Contracts project={project} />
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-between">
                Project Timeline
                <i className="fa-solid fa-calendar-days text-indigo-500"></i>
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-50 flex flex-col items-center justify-center text-indigo-600">
                    <span className="text-[10px] font-bold uppercase">Mar</span>
                    <span className="text-lg font-black">01</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Kickoff Date</p>
                    <p className="text-xs text-slate-500">Mobilization & Safety Briefing</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 flex flex-col items-center justify-center text-slate-400">
                    <span className="text-[10px] font-bold uppercase">Apr</span>
                    <span className="text-lg font-black">15</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Target Completion</p>
                    <p className="text-xs text-slate-500 text-emerald-600 font-semibold">On Track</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 font-bold text-sm rounded-lg hover:bg-slate-100 transition">
                Full Shared Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Feed and Tools */}
        <div className="space-y-6 lg:space-y-8">
          <ProgressFeed feed={project.progressFeed} role={role} />
          <CostCalculator />
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen relative overflow-x-hidden">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Responsive Sidebar */}
      <aside className={`
        w-64 bg-slate-900 text-white flex flex-col fixed h-full z-50 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center">
              <i className="fa-solid fa-building-circle-check"></i>
            </div>
            <h1 className="text-2xl font-black tracking-tighter">WORKSITE</h1>
          </div>
          <button onClick={closeSidebar} className="lg:hidden text-slate-400 hover:text-white">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Core Platform</h3>
            <div className="space-y-1">
              <button 
                onClick={() => switchTab('DASHBOARD')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-semibold ${activeTab === 'DASHBOARD' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
              >
                <i className="fa-solid fa-chart-line w-5 text-center"></i>
                Dashboard
              </button>
              {role === 'HOMEOWNER' ? (
                <button 
                  onClick={() => switchTab('MARKETPLACE')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-semibold ${activeTab === 'MARKETPLACE' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                >
                  <i className="fa-solid fa-search w-5 text-center"></i>
                  Marketplace
                </button>
              ) : (
                <button 
                  onClick={() => switchTab('LEADS')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-semibold ${activeTab === 'LEADS' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                >
                  <i className="fa-solid fa-bullseye w-5 text-center"></i>
                  Lead Center
                </button>
              )}
              <button 
                onClick={() => switchTab('MESSAGES')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-semibold ${activeTab === 'MESSAGES' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
              >
                <i className="fa-solid fa-message w-5 text-center"></i>
                Messages
                <span className="ml-auto bg-rose-500 text-[10px] text-white px-1.5 rounded-full">3</span>
              </button>
              <button 
                onClick={() => switchTab('TEAM')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-semibold ${activeTab === 'TEAM' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
              >
                <i className="fa-solid fa-people-group w-5 text-center"></i>
                Project Team
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Pitch Controls</h3>
            <div className="space-y-2">
              <button 
                onClick={() => { setRole('HOMEOWNER'); switchTab('DASHBOARD'); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition text-xs font-semibold ${role === 'HOMEOWNER' ? 'bg-slate-800 text-indigo-400 border border-indigo-500/50' : 'text-slate-500 hover:bg-slate-800'}`}
              >
                <i className="fa-solid fa-house-user"></i>
                As Homeowner
              </button>
              <button 
                onClick={() => { setRole('CONTRACTOR'); switchTab('DASHBOARD'); }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition text-xs font-semibold ${role === 'CONTRACTOR' ? 'bg-slate-800 text-indigo-400 border border-indigo-500/50' : 'text-slate-500 hover:bg-slate-800'}`}
              >
                <i className="fa-solid fa-hammer"></i>
                As Contractor
              </button>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800 mt-auto">
          <div className="p-4 bg-slate-800 rounded-xl">
            <p className="text-xs font-bold text-slate-300 mb-2">Platform Fee</p>
            <div className="flex items-center justify-between text-[10px] font-black uppercase text-indigo-400">
              <span>Standard 5%</span>
              <span className="bg-indigo-500/20 px-1.5 py-0.5 rounded italic">Locked</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 bg-slate-50 min-h-screen flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-30">
          <button onClick={toggleSidebar} className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-lg text-slate-600">
            <i className="fa-solid fa-bars-staggered"></i>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center text-[10px] text-white">
              <i className="fa-solid fa-building-circle-check"></i>
            </div>
            <span className="font-black tracking-tighter text-slate-900">WORKSITE</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-100 shadow-sm">
             <img src={role === 'HOMEOWNER' ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'} alt="Avatar" />
          </div>
        </header>

        <div className="p-4 lg:p-8 flex-1">
          <header className="hidden lg:flex justify-between items-end mb-10">
            <div>
              <nav className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                <span>Worksite</span>
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
                <span className="text-slate-600 font-medium capitalize">
                  {activeTab.toLowerCase()}
                </span>
              </nav>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {activeTab === 'DASHBOARD' ? (role === 'HOMEOWNER' ? 'My Project Hub' : 'Job Console') : 
                 activeTab === 'MARKETPLACE' ? 'Build Your Dream Team' : 
                 activeTab === 'LEADS' ? 'Scale Your Business' :
                 activeTab === 'MESSAGES' ? 'Client Collaboration' : 'Project Crew'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{role === 'HOMEOWNER' ? project.clientName : 'Precision Plumbing'}</p>
                <p className="text-xs text-slate-500">{role === 'HOMEOWNER' ? 'Homeowner' : 'Lead Specialist'}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white overflow-hidden shadow-sm">
                <img src={role === 'HOMEOWNER' ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'} alt="Avatar" />
              </div>
            </div>
          </header>

          {/* Mobile-only page title */}
          <div className="lg:hidden mb-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {activeTab === 'DASHBOARD' ? (role === 'HOMEOWNER' ? 'My Project' : 'Job Console') : 
               activeTab === 'MARKETPLACE' ? 'Marketplace' : 
               activeTab === 'LEADS' ? 'Lead Center' :
               activeTab === 'MESSAGES' ? 'Messages' : 'Project Team'}
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              {activeTab === 'DASHBOARD' ? project.projectTitle : 'Worksite v1.2'}
            </p>
          </div>

          <div className="transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

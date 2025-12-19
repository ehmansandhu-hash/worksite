
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

  // Key to force re-animation on tab switch
  const contentKey = activeTab + role;

  const renderContent = () => {
    switch (activeTab) {
      case 'MARKETPLACE': return <Marketplace />;
      case 'LEADS': return <LeadsPipeline />;
      case 'MESSAGES': return <Messages role={role} />;
      case 'TEAM': return <Team role={role} />;
      default:
        return (
          <div className="grid-gap" style={{ gridTemplateColumns: '1fr' }}>
            {/* Main Financial Card - immediate load */}
            <div className="animate-enter delay-100">
              <FinancialEngine
                project={project}
                role={role}
                onApproveMilestone={handleApproveMilestone}
              />
            </div>

            {/* Split Row - slightly delayed */}
            <div className="grid-gap md-cols-2 animate-enter delay-200">
              <Contracts project={project} />
              <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div className="section-header">
                  <div className="accent-bar"></div>
                  <h2>Critical Path</h2>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '12px',
                      background: 'var(--copper-50)', color: 'var(--copper-600)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid var(--copper-100)'
                    }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase' }}>Mar</span>
                      <span style={{ fontSize: '1.25rem', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}>01</span>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Project Kickoff</h4>
                      <p style={{ color: 'var(--stone-500)', fontSize: '0.875rem' }}>Mobilization & Safety Brief</p>
                    </div>
                  </div>

                  <div style={{ height: '1px', background: 'var(--stone-200)', margin: '0 1rem' }}></div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '12px',
                      background: 'var(--stone-50)', color: 'var(--stone-400)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid var(--stone-200)'
                    }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase' }}>Apr</span>
                      <span style={{ fontSize: '1.25rem', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}>15</span>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Target Completion</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success-600)' }}></span>
                        <span style={{ color: 'var(--success-600)', fontSize: '0.875rem', fontWeight: 500 }}>On Schedule</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - more delayed */}
            <div className="grid-gap md-cols-2 animate-enter delay-300">
              <ProgressFeed feed={project.progressFeed} role={role} />
              <CostCalculator />
            </div>
          </div>
        );
    }
  };

  const navItems = [
    { id: 'DASHBOARD' as AppTab, label: 'Overview', icon: 'fa-chart-pie' },
    ...(role === 'HOMEOWNER'
      ? [{ id: 'MARKETPLACE' as AppTab, label: 'Marketplace', icon: 'fa-magnifying-glass' }]
      : [{ id: 'LEADS' as AppTab, label: 'Lead Pipeline', icon: 'fa-bullseye' }]
    ),
    { id: 'MESSAGES' as AppTab, label: 'Messages', icon: 'fa-comments', badge: 3 },
    { id: 'TEAM' as AppTab, label: 'Project Team', icon: 'fa-users-line' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--cream-100)' }}>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          style={{ position: 'fixed', inset: 0, background: 'rgba(28, 25, 23, 0.6)', backdropFilter: 'blur(2px)', zIndex: 40 }}
        />
      )}

      {/* Sidebar */}
      <aside className="sidebar" style={{
        width: '280px',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100%',
        zIndex: 50,
        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        borderRight: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ padding: '2rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px', height: '40px',
              background: 'linear-gradient(135deg, var(--copper-500), var(--copper-600))',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)'
            }}>
              <i className="fa-solid fa-layer-group" style={{ fontSize: '1.25rem' }}></i>
            </div>
            <div>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--white)', lineHeight: 1 }}>Worksite</h1>
              <p style={{ fontSize: '0.75rem', fontWeight: 500, opacity: 0.6, letterSpacing: '0.05em' }}>PRO</p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '0 1rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--stone-600)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', paddingLeft: '1rem' }}>Menu</p>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); closeSidebar(); }}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
            >
              <i className={`fa-solid ${item.icon}`} style={{ width: '20px', textAlign: 'center' }}></i>
              {item.label}
              {item.badge && (
                <span style={{
                  marginLeft: 'auto',
                  background: 'var(--copper-500)',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.125rem 0.5rem',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 4px rgba(234, 88, 12, 0.25)'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--stone-400)' }}>CURRENT VIEW</span>
              <span style={{ width: '8px', height: '8px', background: 'var(--success-600)', borderRadius: '50%', boxShadow: '0 0 8px rgba(5, 150, 105, 0.4)' }}></span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setRole('HOMEOWNER')}
                style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, background: role === 'HOMEOWNER' ? 'var(--stone-100)' : 'transparent', color: role === 'HOMEOWNER' ? 'var(--stone-900)' : 'var(--stone-500)' }}
              >
                Client
              </button>
              <button
                onClick={() => setRole('CONTRACTOR')}
                style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, background: role === 'CONTRACTOR' ? 'var(--stone-100)' : 'transparent', color: role === 'CONTRACTOR' ? 'var(--stone-900)' : 'var(--stone-500)' }}
              >
                Pro
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: '0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{
          padding: '1.5rem 2rem',
          background: 'rgba(253, 251, 247, 0.8)',
          backdropFilter: 'blur(12px)',
          position: 'sticky', top: 0, zIndex: 30,
          borderBottom: '1px solid rgba(0,0,0,0.03)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={toggleSidebar} className="btn-secondary lg:hidden" style={{ padding: '0.5rem', height: '40px', width: '40px', display: 'flex', justifyContent: 'center' }}>
              <i className="fa-solid fa-bars"></i>
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>
                  {activeTab === 'DASHBOARD' ? 'Project Dashboard' :
                    activeTab === 'MARKETPLACE' ? 'Marketplace' :
                      activeTab === 'LEADS' ? 'Lead Pipeline' :
                        activeTab === 'MESSAGES' ? 'Messages' : 'Project Team'}
                </h2>
                <span className="badge badge-copper" style={{ fontSize: '0.6875rem' }}>ACTIVE</span>
              </div>
              <p style={{ color: 'var(--stone-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{project.projectTitle}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ textAlign: 'right', display: 'none', flexDirection: 'column', '@media (min-width: 768px)': { display: 'flex' } } as any}>
              <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{role === 'HOMEOWNER' ? 'Morgan Client' : 'Precision Plumbing'}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--stone-500)' }}>{role === 'HOMEOWNER' ? 'Homeowner' : 'Contractor'}</span>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--white)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <img
                src={role === 'HOMEOWNER'
                  ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
                  : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
                }
                alt="Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div style={{ padding: '2rem', flex: 1, maxWidth: '1600px', width: '100%', margin: '0 auto' }}>
          <div key={contentKey}>
            {renderContent()}
          </div>
        </div>
      </main>

      <style>{`
        @media (min-width: 1024px) {
          .sidebar { transform: translateX(0) !important; }
          main { margin-left: 280px !important; }
          .lg\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default App;

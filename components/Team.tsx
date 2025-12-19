
import React from 'react';
import { MOCK_TEAM } from '../constants';
import { UserRole } from '../types';

interface TeamProps {
  role: UserRole;
}

export const Team: React.FC<TeamProps> = ({ role }) => {
  return (
    <div className="animate-enter delay-100" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="section-header">
        <div className="accent-bar"></div>
        <div>
          <h2>Project Team</h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--stone-500)' }}>Manage onsite personnel and permissions.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {MOCK_TEAM.map((member, idx) => (
          <div key={member.id} className={`card animate-enter delay-${(idx % 4) + 1}00`} style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <img src={member.avatar} alt={member.name} style={{ width: '60px', height: '60px', borderRadius: '16px', border: '1px solid var(--stone-200)', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: 'var(--white)', padding: '2px', borderRadius: '50%' }}>
                <div style={{
                  width: '12px', height: '12px', borderRadius: '50%',
                  background: member.status === 'ON_SITE' ? 'var(--success-600)' : 'var(--stone-400)',
                  border: '2px solid white'
                }}></div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--ink-900)' }}>{member.name}</h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--copper-600)', fontWeight: 500, marginBottom: '0.375rem' }}>{member.role}</p>
              <span className={member.status === 'ON_SITE' ? 'badge badge-success' : 'badge badge-neutral'}>
                {member.status.replace('_', ' ')}
              </span>
            </div>
            <button className="btn btn-secondary" style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0, justifyContent: 'center' }}>
              <i className="fa-solid fa-phone"></i>
            </button>
          </div>
        ))}

        {role === 'CONTRACTOR' && (
          <button className="card" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            border: '2px dashed var(--stone-300)', boxShadow: 'none', background: 'transparent',
            cursor: 'pointer', height: '100%', minHeight: '120px'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--stone-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', color: 'var(--stone-500)' }}>
              <i className="fa-solid fa-plus"></i>
            </div>
            <span style={{ fontWeight: 600, color: 'var(--stone-600)' }}>Add Member</span>
          </button>
        )}
      </div>

      <div style={{
        background: 'var(--stone-900)', borderRadius: '16px', padding: '2rem',
        position: 'relative', overflow: 'hidden', color: 'white',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)'
      }}>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <i className="fa-solid fa-satellite-dish" style={{ color: 'var(--copper-500)' }}></i>
              Turnstile™ Monitoring
            </h3>
            <p style={{ color: 'var(--stone-400)', maxWidth: '500px', lineHeight: 1.6 }}>
              Real-time geofence logs verify crew hours automatically.
            </p>
          </div>
          <button className="btn btn-primary">View Logs</button>
        </div>

        {/* Abstract background graphic */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '300px',
          background: 'linear-gradient(90deg, transparent, rgba(234, 88, 12, 0.05))',
          pointerEvents: 'none'
        }}></div>
      </div>
    </div>
  );
};


import React from 'react';
import { ProjectData } from '../types';

interface ContractsProps {
  project: ProjectData;
}

export const Contracts: React.FC<ContractsProps> = ({ project }) => {
  return (
    <div className="card" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--stone-100)' }}>
        <div className="section-header" style={{ marginBottom: 0 }}>
          <div className="accent-bar"></div>
          <h2>Approvals & Safety</h2>
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { icon: 'fa-file-contract', title: 'Master Service Agreement', status: 'Signed', color: 'success' },
          { icon: 'fa-shield-halved', title: 'Insurance Certificate', status: 'Verified', color: 'success' },
          { icon: 'fa-file-invoice', title: 'Lien Waiver (Phase 1)', status: 'Pending', color: 'neutral' },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '0.75rem', borderRadius: '12px',
            transition: 'background 0.2s',
            cursor: 'pointer'
          }}
            className="hover:bg-stone-50"
          >
            <div style={{
              width: '42px', height: '42px', borderRadius: '10px',
              background: item.color === 'success' ? 'var(--success-100)' : 'var(--stone-100)',
              color: item.color === 'success' ? 'var(--success-600)' : 'var(--stone-500)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.125rem'
            }}>
              <i className={`fa-solid ${item.icon}`}></i>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--stone-800)' }}>{item.title}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--stone-500)' }}>PDF • 2.4 MB</p>
            </div>
            <span className={`badge badge-${item.color}`}>{item.status}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '1rem 1.5rem', background: 'var(--stone-50)', borderTop: '1px solid var(--stone-100)', borderRadius: '0 0 16px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <i className="fa-solid fa-lock" style={{ color: 'var(--copper-500)' }}></i>
          <p style={{ fontSize: '0.8125rem', color: 'var(--stone-600)', fontWeight: 500 }}>
            Documents secured via <span style={{ color: 'var(--ink-900)', fontWeight: 700 }}>ChainSign™</span> ledger.
          </p>
        </div>
      </div>
    </div>
  );
};

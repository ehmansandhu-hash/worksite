
import React from 'react';
import { ProjectData, UserRole } from '../types';

interface FinancialEngineProps {
  project: ProjectData;
  role: UserRole;
  onApproveMilestone: (id: string) => void;
}

export const FinancialEngine: React.FC<FinancialEngineProps> = ({ project, role, onApproveMilestone }) => {
  const commission = project.totalBudget * project.commissionRate;
  const totalPaid = project.milestones
    .filter(m => m.status === 'RELEASED')
    .reduce((acc, m) => acc + m.amount, 0);
  const inEscrow = project.milestones
    .filter(m => m.status === 'IN_ESCROW')
    .reduce((acc, m) => acc + m.amount, 0);

  return (
    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--stone-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="section-header" style={{ marginBottom: 0 }}>
          <div className="accent-bar"></div>
          <h2>Financial Ledger</h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--stone-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Project Value</p>
          <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1 }}>
            ${project.totalBudget.toLocaleString()}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', background: 'var(--stone-50)' }}>
        <div style={{ padding: '1.5rem', borderRight: '1px solid var(--stone-200)' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--stone-500)', fontWeight: 500, marginBottom: '0.5rem' }}>Paid to Date</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--stone-900)' }}>${totalPaid.toLocaleString()}</p>
        </div>
        <div style={{ padding: '1.5rem', borderRight: '1px solid var(--stone-200)' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--stone-500)', fontWeight: 500, marginBottom: '0.5rem' }}>Secured in Escrow</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--copper-600)' }}>${inEscrow.toLocaleString()}</p>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--stone-500)', fontWeight: 500, marginBottom: '0.5rem' }}>Worksite Fee (5%)</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--stone-400)' }}>${commission.toLocaleString()}</p>
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--stone-900)', marginBottom: '1rem', letterSpacing: '0.02em' }}>Milestone Progress</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {project.milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem 1.25rem',
                background: 'var(--white)',
                border: '1px solid var(--stone-200)',
                borderRadius: '12px',
                transition: 'all 0.2s',
                opacity: milestone.status === 'PENDING' ? 0.7 : 1
              }}
            >
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: milestone.status === 'RELEASED' ? 'var(--success-100)' : 'var(--stone-100)',
                color: milestone.status === 'RELEASED' ? 'var(--success-600)' : 'var(--stone-500)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, marginRight: '1rem', fontSize: '0.875rem'
              }}>
                {milestone.status === 'RELEASED' ? <i className="fa-solid fa-check"></i> : index + 1}
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, color: 'var(--ink-900)' }}>{milestone.title}</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8125rem', color: 'var(--stone-500)', marginTop: '0.125rem' }}>
                  <span><i className="fa-regular fa-calendar" style={{ marginRight: '0.375rem' }}></i>{milestone.dueDate}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 700, color: 'var(--ink-900)', fontSize: '1rem' }}>${milestone.amount.toLocaleString()}</p>
                {milestone.status === 'IN_ESCROW' ? (
                  role === 'HOMEOWNER' ? (
                    <button
                      onClick={() => onApproveMilestone(milestone.id)}
                      className="btn btn-primary"
                      style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', marginTop: '0.25rem', height: 'auto' }}
                    >
                      Release Funds
                    </button>
                  ) : (
                    <span className="badge badge-copper" style={{ marginTop: '0.25rem', display: 'inline-block' }}>Secured</span>
                  )
                ) : (
                  <span
                    className={milestone.status === 'RELEASED' ? 'badge badge-success' : 'badge badge-neutral'}
                    style={{ marginTop: '0.25rem', display: 'inline-block' }}
                  >
                    {milestone.status === 'RELEASED' ? 'Paid' : 'Pending'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

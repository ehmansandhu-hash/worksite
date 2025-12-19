
import React from 'react';
import { MOCK_LEADS } from '../constants';

export const LeadsPipeline: React.FC = () => {
  return (
    <div className="animate-enter delay-100" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="section-header">
        <div className="accent-bar"></div>
        <div>
          <h2>Lead Pipeline</h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--stone-500)' }}>Review and bid on local opportunities.</p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0 1rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--stone-500)', fontWeight: 600 }}>Project</th>
              <th style={{ textAlign: 'left', padding: '0 1rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--stone-500)', fontWeight: 600 }}>Location</th>
              <th style={{ textAlign: 'left', padding: '0 1rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--stone-500)', fontWeight: 600 }}>Budget</th>
              <th style={{ textAlign: 'left', padding: '0 1rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--stone-500)', fontWeight: 600 }}>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LEADS.map((lead, idx) => (
              <tr key={lead.id} className={`animate-enter delay-${(idx % 4) + 1}00`} style={{ background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <td style={{ padding: '1rem', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
                  <p style={{ fontWeight: 600, color: 'var(--ink-900)' }}>{lead.title}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--stone-500)' }}>Posted {lead.postedDate}</p>
                </td>
                <td style={{ padding: '1rem', color: 'var(--stone-600)' }}>
                  <i className="fa-solid fa-location-dot" style={{ marginRight: '0.5rem', color: 'var(--copper-500)' }}></i>
                  {lead.distance}
                </td>
                <td style={{ padding: '1rem', fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {lead.budget}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span className={lead.status === 'NEW' ? 'badge badge-copper' : 'badge badge-neutral'}>
                    {lead.status === 'NEW' ? 'New Opportunity' : 'Bid Sent'}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right', borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}>
                  <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

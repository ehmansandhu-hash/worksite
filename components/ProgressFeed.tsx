
import React from 'react';
import { ProgressUpdate, UserRole } from '../types';

interface ProgressFeedProps {
  feed: ProgressUpdate[];
  role: UserRole;
  onAddUpdate?: (update: Omit<ProgressUpdate, 'id'>) => void;
}

export const ProgressFeed: React.FC<ProgressFeedProps> = ({ feed, role }) => {
  return (
    <div className="card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--stone-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="section-header" style={{ marginBottom: 0 }}>
          <div className="accent-bar"></div>
          <h2>Site Journal</h2>
        </div>
        {role === 'CONTRACTOR' && (
          <button className="btn btn-secondary" style={{ width: '36px', height: '36px', padding: 0, justifyContent: 'center', borderRadius: '50%' }}>
            <i className="fa-solid fa-plus"></i>
          </button>
        )}
      </div>

      <div style={{ padding: '1.5rem', overflowY: 'auto', maxHeight: '500px' }}>
        <div style={{ position: 'relative', paddingLeft: '1rem', borderLeft: '2px solid var(--stone-200)', marginLeft: '0.5rem' }}>
          {feed.map((update, idx) => (
            <div key={update.id} style={{ marginBottom: idx === feed.length - 1 ? 0 : '2rem', position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '-23px', top: '0',
                width: '12px', height: '12px', borderRadius: '50%',
                background: 'var(--white)', border: '3px solid var(--copper-500)',
                zIndex: 2
              }}></div>

              <div style={{ paddingLeft: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--stone-800)' }}>{update.date}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--stone-400)' }}>{update.author}</span>
                </div>

                <div style={{
                  borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                }}>
                  <img src={update.imageUrl} alt="Update" style={{ width: '100%', height: '180px', objectFit: 'cover', transition: 'transform 0.3s' }} />
                </div>

                <div style={{ background: 'var(--stone-50)', padding: '1rem', borderRadius: '0 12px 12px 12px', border: '1px solid var(--stone-100)' }}>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--stone-700)', lineHeight: 1.6 }}>{update.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

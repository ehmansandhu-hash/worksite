
import React from 'react';
import { MOCK_CONTRACTORS } from '../constants';

export const Marketplace: React.FC = () => {
  return (
    <div className="animate-enter delay-100" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="section-header" style={{ marginBottom: '0.5rem' }}>
            <div className="accent-bar"></div>
            <h2>Verified Professionals</h2>
          </div>
          <p style={{ color: 'var(--stone-500)', maxWidth: '500px' }}>
            Our network of verified contractors is backed by <span style={{ fontWeight: 600, color: 'var(--ink-900)' }}>EscrowShield™</span> to ensure your project is completed to spec before funds are released.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary"><i className="fa-solid fa-filter"></i> Filters</button>
          <button className="btn btn-primary"><i className="fa-solid fa-map"></i> Map View</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {MOCK_CONTRACTORS.map((pro, idx) => (
          <div key={pro.id} className={`card animate-enter delay-${(idx % 4) + 1}00`} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <img src={pro.imageUrl} alt={pro.name} style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{pro.name}</h3>
                <p style={{ color: 'var(--copper-600)', fontWeight: 500, fontSize: '0.875rem' }}>{pro.specialty}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                  <i className="fa-solid fa-star" style={{ fontSize: '0.75rem', color: 'var(--copper-500)' }}></i>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{pro.rating}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--stone-400)' }}>({pro.completedJobs} jobs)</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '0 1.5rem 1.5rem', flex: 1 }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span className="badge badge-success">Verified Lic.</span>
                <span className="badge badge-neutral">Insured</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--stone-100)' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--stone-500)', textTransform: 'uppercase', fontWeight: 600 }}>Hourly Rate</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif" }}>${pro.hourlyRate}</p>
                </div>
                <button className="btn btn-secondary" style={{ fontSize: '0.875rem' }}>View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


import React, { useState } from 'react';

export const CostCalculator: React.FC = () => {
  const [items] = useState([
    { id: '1', label: 'Rough Plumbing', cost: 2500 },
    { id: '2', label: 'Electrical Wiring', cost: 1800 },
    { id: '3', label: 'Permits', cost: 1000 },
  ]);

  const total = items.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="card" style={{ padding: '1.5rem', background: 'var(--stone-900)', color: 'white', border: 'none' }}>
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div className="accent-bar" style={{ background: 'var(--copper-500)' }}></div>
        <h2 style={{ color: 'white' }}>Estimator</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {items.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ color: 'var(--stone-400)', fontSize: '0.9375rem' }}>{item.label}</span>
            <span style={{ fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif", letterSpacing: '0.05em' }}>${item.cost.toLocaleString()}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem' }}>
          <span style={{ color: 'var(--copper-400)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8125rem', letterSpacing: '0.05em' }}>Current Total</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif" }}>${total.toLocaleString()}</span>
        </div>
      </div>

      <button className="btn" style={{
        width: '100%', justifyContent: 'center',
        background: 'rgba(255,255,255,0.1)', color: 'white',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <i className="fa-solid fa-plus"></i> Add Line Item
      </button>
    </div>
  );
};

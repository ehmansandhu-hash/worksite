
import React, { useState } from 'react';

export const CostCalculator: React.FC = () => {
  const [items, setItems] = useState([
    { id: '1', label: 'Labor (Plumbing/Electric)', cost: 2500 },
    { id: '2', label: 'Tile & Materials', cost: 1800 },
    { id: '3', label: 'Cabinetry', cost: 1200 },
    { id: '4', label: 'Permits & Fees', cost: 1000 },
  ]);

  const total = items.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Estimator Tool</h2>
      <p className="text-sm text-slate-500 mb-6">Manage your line-items to prevent sticker shock and scope creep.</p>
      
      <div className="space-y-3 mb-6">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="text-slate-700 font-medium">{item.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-slate-900 font-bold">${item.cost.toLocaleString()}</span>
              <button className="text-slate-300 hover:text-red-500 transition"><i className="fa-solid fa-trash-can text-sm"></i></button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Estimated Total</span>
        <span className="text-2xl font-black text-indigo-600">${total.toLocaleString()}</span>
      </div>
      
      <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 font-medium hover:border-indigo-400 hover:text-indigo-600 transition flex items-center justify-center gap-2">
        <i className="fa-solid fa-plus text-sm"></i>
        Add New Line Item
      </button>
    </div>
  );
};


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
  const pending = project.milestones
    .filter(m => m.status === 'PENDING' || m.status === 'COMPLETED')
    .reduce((acc, m) => acc + m.amount, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Financial Ledger</h2>
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wider">
          Total Project: ${project.totalBudget.toLocaleString()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
          <p className="text-xs text-emerald-600 font-medium uppercase mb-1">Paid to Contractor</p>
          <p className="text-2xl font-bold text-emerald-700">${totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <p className="text-xs text-amber-600 font-medium uppercase mb-1">Held in Escrow</p>
          <p className="text-2xl font-bold text-amber-700">${inEscrow.toLocaleString()}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p className="text-xs text-slate-500 font-medium uppercase mb-1">Worksite Fee (5%)</p>
          <p className="text-2xl font-bold text-slate-700">${commission.toLocaleString()}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <p className="text-xs text-indigo-600 font-medium uppercase mb-1">Remaining Balance</p>
          <p className="text-2xl font-bold text-indigo-700">${pending.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase">Milestone Status</h3>
        {project.milestones.map((milestone) => (
          <div key={milestone.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="font-semibold text-slate-800">{milestone.title}</p>
              <p className="text-sm text-slate-500">Due: {milestone.dueDate}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-slate-700">${milestone.amount.toLocaleString()}</span>
              {milestone.status === 'RELEASED' ? (
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">RELEASED</span>
              ) : milestone.status === 'IN_ESCROW' ? (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">SECURED IN ESCROW</span>
                  {role === 'HOMEOWNER' && (
                    <button 
                      onClick={() => onApproveMilestone(milestone.id)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold hover:bg-indigo-700 transition"
                    >
                      Release Funds
                    </button>
                  )}
                </div>
              ) : milestone.status === 'COMPLETED' ? (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">AWAITING INSPECTION</span>
              ) : (
                <span className="px-3 py-1 bg-slate-200 text-slate-600 rounded-full text-xs font-bold">NOT STARTED</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

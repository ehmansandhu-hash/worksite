
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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 lg:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-slate-800">Financial Ledger</h2>
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] lg:text-xs font-semibold rounded-full uppercase tracking-wider">
          Total Project: ${project.totalBudget.toLocaleString()}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
          <p className="text-[10px] text-emerald-600 font-medium uppercase mb-1">Paid Out</p>
          <p className="text-lg lg:text-2xl font-bold text-emerald-700">${totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <p className="text-[10px] text-amber-600 font-medium uppercase mb-1">In Escrow</p>
          <p className="text-lg lg:text-2xl font-bold text-amber-700">${inEscrow.toLocaleString()}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p className="text-[10px] text-slate-500 font-medium uppercase mb-1">Worksite Fee</p>
          <p className="text-lg lg:text-2xl font-bold text-slate-700">${commission.toLocaleString()}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <p className="text-[10px] text-indigo-600 font-medium uppercase mb-1">Remaining</p>
          <p className="text-lg lg:text-2xl font-bold text-indigo-700">${pending.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase">Milestones</h3>
        {project.milestones.map((milestone) => (
          <div key={milestone.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 gap-4">
            <div>
              <p className="font-semibold text-slate-800 text-sm lg:text-base">{milestone.title}</p>
              <p className="text-xs text-slate-500">Due: {milestone.dueDate}</p>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0">
              <span className="text-base lg:text-lg font-bold text-slate-700">${milestone.amount.toLocaleString()}</span>
              <div className="flex items-center gap-2">
                {milestone.status === 'RELEASED' ? (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">RELEASED</span>
                ) : milestone.status === 'IN_ESCROW' ? (
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold">SECURED</span>
                    {role === 'HOMEOWNER' && (
                      <button 
                        onClick={() => onApproveMilestone(milestone.id)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-bold hover:bg-indigo-700 transition whitespace-nowrap"
                      >
                        Release Funds
                      </button>
                    )}
                  </div>
                ) : (
                  <span className="px-3 py-1 bg-slate-200 text-slate-600 rounded-full text-[10px] font-bold uppercase">{milestone.status}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

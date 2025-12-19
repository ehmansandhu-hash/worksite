
import React from 'react';
import { MOCK_TEAM } from '../constants';
import { UserRole } from '../types';

interface TeamProps {
  role: UserRole;
}

export const Team: React.FC<TeamProps> = ({ role }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Project Crew</h2>
          <p className="text-slate-500">Manage access and track who is currently on-site.</p>
        </div>
        {role === 'CONTRACTOR' && (
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-200">
            <i className="fa-solid fa-user-plus mr-2"></i> Add Sub-Contractor
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TEAM.map(member => (
          <div key={member.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center gap-4 hover:border-indigo-300 transition group">
            <div className="relative">
              <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full border-2 border-white shadow-sm" />
              <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${member.status === 'ON_SITE' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition">{member.name}</h4>
              <p className="text-xs text-slate-500 font-medium">{member.role}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${member.status === 'ON_SITE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {member.status.replace('_', ' ')}
                </span>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition">
              <i className="fa-solid fa-phone-flip text-xs"></i>
            </button>
          </div>
        ))}
      </div>

      <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Worksite Site-Watch™</h3>
          <p className="text-indigo-200 text-sm max-w-md">Our geofencing technology automatically logs crew arrival and departure times for verified payroll and homeowner peace of mind.</p>
          <button className="mt-6 px-6 py-2.5 bg-white text-indigo-900 rounded-xl font-bold text-sm">View Access Logs</button>
        </div>
        <i className="fa-solid fa-clock-rotate-left absolute -right-10 -bottom-10 text-[180px] text-white/5 pointer-events-none"></i>
      </div>
    </div>
  );
};

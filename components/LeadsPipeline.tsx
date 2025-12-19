
import React from 'react';
import { MOCK_LEADS } from '../constants';

export const LeadsPipeline: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Lead Center</h2>
          <p className="text-slate-500">Local projects matching your profile in a 10-mile radius.</p>
        </div>
        <div className="flex bg-slate-200 p-1 rounded-lg">
          <button className="px-4 py-1.5 bg-white shadow-sm rounded-md text-sm font-bold text-slate-900">List View</button>
          <button className="px-4 py-1.5 text-sm font-bold text-slate-500 hover:text-slate-700">Map View</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Available Projects</h3>
          {MOCK_LEADS.map(lead => (
            <div key={lead.id} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-6 hover:border-indigo-300 transition shadow-sm">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${lead.status === 'NEW' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                    {lead.status === 'NEW' ? 'New Opportunity' : 'Quote Sent'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{lead.postedDate}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">{lead.title}</h4>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><i className="fa-solid fa-user text-slate-300"></i> {lead.client}</span>
                  <span className="flex items-center gap-1"><i className="fa-solid fa-location-dot text-slate-300"></i> {lead.distance}</span>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end justify-between min-w-[140px]">
                <p className="text-lg font-black text-indigo-600">{lead.budget}</p>
                <button className={`mt-2 w-full md:w-auto px-6 py-2 rounded-lg font-bold text-xs transition ${lead.status === 'NEW' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                  {lead.status === 'NEW' ? 'Bid on Project' : 'Under Review'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-lg mb-4">Lead Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <span className="text-sm text-slate-400">Wins this month</span>
                <span className="text-xl font-black text-emerald-400">12</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <span className="text-sm text-slate-400">Response Time</span>
                <span className="text-xl font-black text-indigo-400">14m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Profile Strength</span>
                <span className="text-xl font-black text-amber-400">Elite</span>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-700 transition">
              Boost My Profile
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-4">Growth Tips</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-bolt text-[10px]"></i>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">Responding within 15 mins increases win rate by <span className="font-bold text-slate-900">4x</span>.</p>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-camera text-[10px]"></i>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">Add high-res photos to your profile for <span className="font-bold text-slate-900">22%</span> more leads.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

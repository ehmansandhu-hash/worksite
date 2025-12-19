
import React from 'react';
import { MOCK_CONTRACTORS } from '../constants';

export const Marketplace: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Discover Pros</h2>
          <p className="text-slate-500">Verified contractors with Worksite Escrow protection.</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search specialties (e.g. Tile)..." 
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64"
          />
          <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition">
            <i className="fa-solid fa-sliders mr-2"></i> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CONTRACTORS.map(pro => (
          <div key={pro.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition group">
            <div className="h-32 bg-indigo-600 relative">
              <div className="absolute -bottom-6 left-6 p-1 bg-white rounded-xl shadow-sm border border-slate-100">
                <img src={pro.imageUrl} alt={pro.name} className="w-16 h-16 rounded-lg object-cover" />
              </div>
              {pro.verified && (
                <div className="absolute top-4 right-4 bg-emerald-400 text-white text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wider">
                  <i className="fa-solid fa-certificate"></i> Verified
                </div>
              )}
            </div>
            <div className="pt-8 p-6">
              <div className="mb-4">
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition">{pro.name}</h3>
                <p className="text-sm text-slate-500 font-medium">{pro.specialty}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Trust Score</p>
                  <p className="text-sm font-bold text-indigo-600">{pro.trustScore}/100</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Jobs Done</p>
                  <p className="text-sm font-bold text-slate-700">{pro.completedJobs}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1 text-amber-400">
                  <i className="fa-solid fa-star"></i>
                  <span className="text-slate-900 font-bold">{pro.rating}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-medium">Starting at</p>
                  <p className="text-sm font-black text-slate-900">${pro.hourlyRate}/hr</p>
                </div>
              </div>

              <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 transition flex items-center justify-center gap-2">
                Request Instant Quote
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

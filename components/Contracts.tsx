
import React from 'react';
import { ProjectData } from '../types';

interface ContractsProps {
  project: ProjectData;
}

export const Contracts: React.FC<ContractsProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Legal & Safety</h2>
        <i className="fa-solid fa-shield-halved text-indigo-500 text-xl"></i>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <i className="fa-solid fa-file-signature"></i>
          </div>
          <div className="flex-1">
            <p className="font-bold text-emerald-900">Master Service Agreement</p>
            <p className="text-xs text-emerald-700 uppercase font-semibold">Status: Signed & Verified</p>
          </div>
          <button className="text-emerald-700 hover:underline text-sm font-medium">View PDF</button>
        </div>

        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
            <i className="fa-solid fa-file-shield"></i>
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-700">Insurance Certificate (COI)</p>
            <p className="text-xs text-slate-500 uppercase font-semibold">Valid until: 12/2024</p>
          </div>
          <button className="text-indigo-600 hover:underline text-sm font-medium">View PDF</button>
        </div>

        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
            <i className="fa-solid fa-gavel"></i>
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-700">Lien Waiver - Milestone 2</p>
            <p className="text-xs text-slate-500 uppercase font-semibold">Pending completion</p>
          </div>
          <button className="text-indigo-600 hover:underline text-sm font-medium">Review</button>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-indigo-50 rounded-lg text-xs text-indigo-800 border border-indigo-100">
        <p className="font-bold mb-1"><i className="fa-solid fa-circle-info mr-1"></i> Worksite Guarantee</p>
        All projects on Worksite are covered by our $50,000 protection policy against contractor abandonment or verified quality defects.
      </div>
    </div>
  );
};

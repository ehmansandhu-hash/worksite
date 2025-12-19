
import React from 'react';
import { ProgressUpdate, UserRole } from '../types';

interface ProgressFeedProps {
  feed: ProgressUpdate[];
  role: UserRole;
  onAddUpdate?: (update: Omit<ProgressUpdate, 'id'>) => void;
}

export const ProgressFeed: React.FC<ProgressFeedProps> = ({ feed, role }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Daily Progress Feed</h2>
        {role === 'CONTRACTOR' && (
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
            <i className="fa-solid fa-camera"></i>
            Post Update
          </button>
        )}
      </div>
      <div className="p-6 space-y-8 max-h-[600px] overflow-y-auto">
        {feed.map((update) => (
          <div key={update.id} className="relative pl-8 border-l-2 border-slate-100 pb-2">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white"></div>
            <div className="mb-2 flex justify-between">
              <span className="text-xs font-bold text-indigo-600 uppercase">{update.date}</span>
              <span className="text-xs text-slate-400 italic">By {update.author}</span>
            </div>
            <div className="rounded-xl overflow-hidden mb-3 shadow-md">
              <img src={update.imageUrl} alt="Progress" className="w-full h-48 object-cover" />
            </div>
            <p className="text-slate-600 leading-relaxed">{update.comment}</p>
          </div>
        ))}
        {feed.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <i className="fa-solid fa-images text-4xl mb-4 block opacity-20"></i>
            No progress updates yet.
          </div>
        )}
      </div>
    </div>
  );
};

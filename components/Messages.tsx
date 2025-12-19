
import React, { useState } from 'react';
import { MOCK_MESSAGES } from '../constants';
import { UserRole } from '../types';

interface MessagesProps {
  role: UserRole;
}

export const Messages: React.FC<MessagesProps> = ({ role }) => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      senderId: role === 'HOMEOWNER' ? 'morgan' : 'c1',
      senderName: role === 'HOMEOWNER' ? 'Morgan' : 'Precision Plumbing',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-[calc(100vh-250px)] flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-slate-50">
        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-sm font-bold">
          {role === 'HOMEOWNER' ? 'PP' : 'M'}
        </div>
        <div>
          <h3 className="font-bold text-slate-900">{role === 'HOMEOWNER' ? 'Precision Plumbing' : 'Morgan (Client)'}</h3>
          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-4 rounded-2xl text-sm ${msg.isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'}`}>
              {!msg.isMe && <p className="text-[10px] font-black uppercase text-indigo-400 mb-1">{msg.senderName}</p>}
              <p className="leading-relaxed">{msg.text}</p>
              <p className={`text-[9px] mt-2 ${msg.isMe ? 'text-indigo-200 text-right' : 'text-slate-400'}`}>{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full text-slate-400 hover:bg-slate-50 transition">
            <i className="fa-solid fa-plus"></i>
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..." 
            className="flex-1 px-4 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button 
            onClick={handleSend}
            className="w-10 h-10 rounded-full bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition"
          >
            <i className="fa-solid fa-paper-plane text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

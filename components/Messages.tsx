
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
      senderName: role === 'HOMEOWNER' ? 'Morgan' : 'C1',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="card animate-enter delay-100" style={{ height: 'calc(100vh - 180px)', padding: 0, display: 'flex', overflow: 'hidden' }}>
      {/* Sidebar List */}
      <div style={{ width: '300px', borderRight: '1px solid var(--stone-200)', background: 'var(--stone-50)', display: 'none', flexDirection: 'column', '@media (min-width: 768px)': { display: 'flex' } } as any}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--stone-200)' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Inbox</h3>
        </div>
        <div style={{ padding: '1rem' }}>
          <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid var(--copper-200)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 600 }}>{role === 'HOMEOWNER' ? 'Precision Plumbing' : 'Morgan Client'}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--stone-400)' }}>2m</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--stone-600)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {messages[messages.length - 1].text}
            </p>
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--stone-200)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--copper-100)', color: 'var(--copper-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
            {role === 'HOMEOWNER' ? 'PP' : 'MC'}
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{role === 'HOMEOWNER' ? 'Precision Plumbing' : 'Morgan Client'}</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--success-600)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success-500)' }}></span>
              Online now
            </p>
          </div>
        </div>

        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--white)' }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.isMe ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '70%',
                padding: '0.875rem 1.25rem',
                borderRadius: msg.isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.isMe ? 'var(--copper-500)' : 'var(--stone-100)',
                color: msg.isMe ? 'white' : 'var(--ink-900)',
                lineHeight: 1.5
              }}>
                <p>{msg.text}</p>
                <p style={{ fontSize: '0.6875rem', marginTop: '0.25rem', opacity: 0.7, textAlign: 'right' }}>{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '1.25rem', borderTop: '1px solid var(--stone-200)' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary" style={{ padding: '0.75rem' }}><i className="fa-solid fa-paperclip"></i></button>
            <input
              className="input"
              style={{ flex: 1 }}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="btn btn-primary" onClick={handleSend}><i className="fa-solid fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

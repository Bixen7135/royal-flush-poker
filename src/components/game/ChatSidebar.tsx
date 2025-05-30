import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage } from '../../types';

type ChatSidebarProps = {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
};

const ChatSidebar: React.FC<ChatSidebarProps> = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="h-full flex flex-col bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden">
      <div className="p-3 border-b border-gray-800">
        <h3 className="font-medium text-gradient">Table Chat</h3>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="flex space-x-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 overflow-hidden">
              {msg.avatarUrl ? (
                <img src={msg.avatarUrl} alt={msg.username} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  {msg.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline">
                <span className="font-medium text-accent-400 mr-2 truncate">{msg.username}</span>
                <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
              </div>
              <p className="text-sm text-gray-300 break-words">{msg.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-800">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-accent-600 px-3 rounded-r-md hover:bg-accent-500 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatSidebar;
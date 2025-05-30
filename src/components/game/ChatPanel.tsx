import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import Button from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
  type: 'chat' | 'system';
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose, roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();

  // Mock messages for testing
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        userId: 'system',
        username: 'System',
        content: 'Welcome to the table!',
        timestamp: new Date(Date.now() - 60000),
        type: 'system'
      },
      {
        id: '2',
        userId: 'player1',
        username: 'Player1',
        content: 'Good luck everyone!',
        timestamp: new Date(Date.now() - 45000),
        type: 'chat'
      },
      {
        id: '3',
        userId: 'player2',
        username: 'Player2',
        content: 'Thanks, you too!',
        timestamp: new Date(Date.now() - 30000),
        type: 'chat'
      }
    ];
    setMessages(mockMessages);
  }, [roomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'chat'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    // In a real app, this would send the message to the server
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="absolute top-0 right-0 w-80 h-full bg-background-800 border-l border-gray-700 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-bold">Chat</h3>
            <Button
              variant="ghost"
              onClick={onClose}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${
                  message.type === 'system' ? 'items-center' : 'items-start'
                }`}
              >
                {message.type === 'system' ? (
                  <div className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                    {message.content}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-200">
                        {message.username}
                      </span>
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="bg-gray-800/50 px-4 py-2 rounded-lg max-w-[90%]">
                      {message.content}
                    </div>
                  </>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 bg-background-700 border border-gray-700 rounded-lg focus:outline-none focus:border-accent-500"
              />
              <Button
                type="submit"
                variant="primary"
                className="p-2"
                disabled={!newMessage.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatPanel; 
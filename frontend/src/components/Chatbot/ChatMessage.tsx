import React from 'react';
import { User, Sparkles } from 'lucide-react';

export interface ChatMessageData {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: ChatMessageData;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex gap-3 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isAssistant
          ? 'bg-gradient-to-r from-blue-500 to-purple-600'
          : 'bg-gray-200'
      }`}>
        {isAssistant ? (
          <Sparkles className="w-4 h-4 text-white" />
        ) : (
          <User className="w-4 h-4 text-gray-600" />
        )}
      </div>

      {/* Message bubble */}
      <div className={`flex-1 max-w-[80%] ${isAssistant ? 'items-start' : 'items-end'}`}>
        <div className={`px-4 py-2 rounded-lg ${
          isAssistant
            ? 'bg-gray-100 text-gray-900'
            : 'bg-blue-600 text-white'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className="text-xs text-gray-400 mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

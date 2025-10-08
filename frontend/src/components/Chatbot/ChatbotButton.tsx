import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatbotButtonProps {
  onClick: () => void;
  isOpen: boolean;
  hasUnreadInsights?: boolean;
}

export const ChatbotButton: React.FC<ChatbotButtonProps> = ({
  onClick,
  isOpen,
  hasUnreadInsights = false
}) => {
  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      data-chatbot-button
      className="fixed bottom-6 right-6 min-w-[56px] min-h-[56px] w-14 h-14 bg-teal
                 rounded-full shadow-lg hover:shadow-xl transition-all duration-200
                 hover:scale-110 z-50 flex items-center justify-center group"
      aria-label="Open chat assistant"
    >
      {hasUnreadInsights && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger rounded-full
                         border-2 border-cloud animate-pulse" />
      )}
      <MessageCircle className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
    </button>
  );
};

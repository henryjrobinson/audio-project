import React, { useState } from 'react';
import { ChatbotButton } from './ChatbotButton';
import { ChatbotPanel } from './ChatbotPanel';

interface ChatbotProps {
  archiveName?: string;
  hasUnreadInsights?: boolean;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  archiveName,
  hasUnreadInsights = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatbotButton
        onClick={() => setIsOpen(true)}
        isOpen={isOpen}
        hasUnreadInsights={hasUnreadInsights}
      />
      <ChatbotPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        archiveName={archiveName}
      />
    </>
  );
};

export { ChatbotButton } from './ChatbotButton';
export { ChatbotPanel } from './ChatbotPanel';
export { ChatMessage } from './ChatMessage';
export { TypingIndicator } from './TypingIndicator';

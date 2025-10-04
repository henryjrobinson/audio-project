import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage, ChatMessageData } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ChatbotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  archiveName?: string;
}

export const ChatbotPanel: React.FC<ChatbotPanelProps> = ({
  isOpen,
  onClose,
  archiveName = "Your Family Archive"
}) => {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock mode indicator
  const isMockMode = true; // This will come from config later

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: `👋 Hi! I'm your Family Archive Assistant for "${archiveName}".\n\nI can help you:\n• Find stories and memories\n• Schedule calls with family\n• Invite family members\n• Answer questions about the archive\n\nWhat would you like to do?`,
        timestamp: new Date()
      }]);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessageData = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    setIsTyping(false);

    // Generate mock response based on keywords
    let response = "I'm here to help! What would you like to know?";
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('cooking') || lowerInput.includes('recipe')) {
      response = "I found 4 stories related to cooking:\n\n📖 'The Christmas with No Money' - Margaret talks about making cake\n📖 'Grandma's Kitchen Wisdom' - 3 family members share cooking memories\n📖 'Sunday Dinners' - Sarah's favorite meal memories\n📖 'The Peach Pie Recipe' - Margaret shares her famous recipe\n\nWould you like me to show you any of these?";
    } else if (lowerInput.includes('invite') || lowerInput.includes('family')) {
      response = "I can help you invite family members! You have two options:\n\n1. Click the 'Invite Family Member' button in the Family tab\n2. Tell me who you'd like to invite and I can guide you through it\n\nWho would you like to add to the archive?";
    } else if (lowerInput.includes('stories') || lowerInput.includes('how many')) {
      response = "Your archive currently has:\n\n📚 23 stories captured\n🎙️ 8 conversations completed\n👥 4 family members contributing\n🎨 3 themes discovered\n\nWould you like to explore any of these?";
    } else if (lowerInput.includes('schedule') || lowerInput.includes('call')) {
      response = "I can help you schedule a call! The next available time slots are:\n\n📅 Tomorrow at 2:00 PM\n📅 Thursday at 10:00 AM\n📅 Friday at 3:00 PM\n\nWould you like to schedule one of these, or choose a different time?";
    } else if (lowerInput.includes('theme')) {
      response = "Your family archive has 3 emerging themes:\n\n🍳 Grandma's Southern Cooking (7 contributions, 85% complete)\n🏠 Moving from South to North (3 contributions, 60% complete)\n👨‍👩‍👧‍👦 Raising Five Children (5 contributions, 70% complete)\n\nWhich theme would you like to explore?";
    } else if (lowerInput.includes('help') || lowerInput.includes('what can you')) {
      response = "I can help you with:\n\n🔍 Finding specific stories or memories\n📅 Scheduling calls with family members\n👥 Inviting and managing family members\n📊 Understanding archive statistics and progress\n🎨 Exploring themes and patterns in your stories\n📖 Reviewing and approving stories\n\nJust ask me anything!";
    }

    const assistantMessage: ChatMessageData = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl
                    flex flex-col z-50 border border-gray-200 animate-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <div>
            <h3 className="font-semibold text-gray-900">Family Archive Assistant</h3>
            {isMockMode && (
              <Badge variant="outline" className="mt-1 text-xs bg-yellow-50 text-yellow-700 border-yellow-300">
                <AlertCircle className="w-3 h-3 mr-1" />
                Mock Data Mode
              </Badge>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions (only show initially) */}
      {messages.length <= 1 && !isTyping && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput("How many stories do we have?")}
            className="text-xs"
          >
            📊 Show stats
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput("What themes have been discovered?")}
            className="text-xs"
          >
            🎨 View themes
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput("How do I invite family?")}
            className="text-xs"
          >
            👥 Invite family
          </Button>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                       flex items-center justify-center"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        {isMockMode && (
          <p className="text-xs text-yellow-600 mt-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Using simulated AI responses for demonstration
          </p>
        )}
      </div>
    </div>
  );
};

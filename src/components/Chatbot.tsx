'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import clsx from 'clsx';

type Message = {
  text: string;
  isBot: boolean;
  id: string; // Add unique id for better key prop
};

const predefinedQuestions = [
  "What technologies do you work with?",
  "Are you available for freelance work?",
  "What's your development process?"
] as const;

type PredefinedQuestion = typeof predefinedQuestions[number];

const predefinedAnswers: Record<PredefinedQuestion, string> = {
  "What technologies do you work with?": "I specialize in modern web technologies including React, Next.js, TypeScript, and Node.js. I also have experience with extended reality development using Unity and Three.js.",
  "Are you available for freelance work?": "Yes, I'm currently available for freelance projects! Feel free to reach out via email to discuss your project requirements.",
  "What's your development process?": "My development process follows an agile methodology, starting with thorough requirements gathering, followed by design, iterative development with regular client feedback, testing, and deployment with ongoing support."
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hi! I'm an AI assistant for Himanshu. How can I help you today?", 
      isBot: true,
      id: 'initial-message'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      text,
      isBot: false,
      id: `user-${Date.now()}`
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const answer = predefinedAnswers[text as PredefinedQuestion] || 
        "I can answer questions about Himanshu's skills and availability. Please select one from the options below or ask something similar.";
      
      const botMessage: Message = {
        text: answer,
        isBot: true,
        id: `bot-${Date.now()}`
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-[#1a1a1a] rounded-lg shadow-lg mb-4 w-[320px] overflow-hidden border border-gray-800"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-white" />
                <span className="font-semibold text-white">Himanshu's Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-[400px] overflow-y-auto p-4 flex flex-col gap-4 bg-[#0f0f0f]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={clsx(
                    "max-w-[80%] p-3 rounded-lg text-sm",
                    message.isBot ? 
                      "bg-[#252525] self-start rounded-tl-none text-gray-200" : 
                      "bg-blue-600 self-end rounded-br-none text-white"
                  )}
                >
                  {message.text}
                </motion.div>
              ))}
            </div>

            {/* Predefined Questions */}
            <div className="p-4 border-t border-[#252525] bg-[#1a1a1a]">
              <div className="flex flex-wrap gap-2 mb-3">
                {predefinedQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSendMessage(question)}
                    className="text-xs bg-[#252525] hover:bg-[#303030] px-3 py-1.5 rounded-full transition text-gray-300 hover:text-white"
                  >
                    {question}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && inputValue.trim()) {
                      handleSendMessage(inputValue.trim());
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#252525] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-white placeholder-gray-400"
                  aria-label="Type your message"
                />
                <button
                  onClick={() => inputValue.trim() && handleSendMessage(inputValue.trim())}
                  className="bg-blue-600 hover:bg-blue-700 rounded-lg p-2 transition disabled:opacity-50"
                  disabled={!inputValue.trim()}
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-4 shadow-lg transition-all",
          "hover:shadow-xl hover:from-blue-600 hover:to-purple-700",
          isOpen && "hidden"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <MessageCircle size={24} className="text-white" />
      </motion.button>
    </div>
  );
}
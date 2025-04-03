'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import clsx from 'clsx';

type Message = {
  text: string;
  isBot: boolean;
};

const predefinedQuestions = [
  "What technologies do you work with?",
  "Are you available for freelance work?",
  "What's your development process?"
];

const predefinedAnswers = {
  "What technologies do you work with?": "I specialize in modern web technologies including React, Next.js, TypeScript, and Node.js",
  "Are you available for freelance work?": "Yes, I'm currently available for freelance projects! Feel free to reach out via email to discuss your project requirements.",
  "What's your development process?": "My development process follows an agile methodology, starting with thorough requirements gathering, followed by design, iterative development with regular client feedback, testing, and deployment with ongoing support."
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm an AI assistant. How can I help you today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (text: string) => {
    // Add user message
    setMessages(prev => [...prev, { text, isBot: false }]);

    // Simulate bot response
    setTimeout(() => {
      const answer = predefinedAnswers[text as keyof typeof predefinedAnswers] || 
        "I can only answer predefined questions. Please select one from the options below.";
      setMessages(prev => [...prev, { text: answer, isBot: true }]);
    }, 500);

    setInputValue('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-[#1a1a1a] rounded-lg shadow-lg mb-4 w-[320px] overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-[#252525] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-blue-400" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-[400px] overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={clsx(
                    "max-w-[80%] p-3 rounded-lg",
                    message.isBot ? 
                      "bg-[#252525] self-start rounded-tl-none" : 
                      "bg-blue-600 self-end rounded-br-none"
                  )}
                >
                  {message.text}
                </motion.div>
              ))}
            </div>

            {/* Predefined Questions */}
            <div className="p-4 border-t border-[#252525] flex flex-wrap gap-2">
              {predefinedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(question)}
                  className="text-sm bg-[#252525] hover:bg-[#303030] px-3 py-1.5 rounded-full transition"
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[#252525]">
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
                  className="flex-1 bg-[#252525] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={() => inputValue.trim() && handleSendMessage(inputValue.trim())}
                  className="bg-blue-600 hover:bg-blue-700 rounded-lg p-2 transition"
                >
                  <Send size={20} />
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
        onClick={() => setIsOpen(true)}
        className={clsx(
          "bg-blue-600 hover:bg-blue-700 rounded-full p-4 shadow-lg transition",
          isOpen && "hidden"
        )}
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  );
}
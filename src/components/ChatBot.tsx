import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Minus, Maximize2, Loader2 } from 'lucide-react';
import { chatStream } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', parts: [{ text: "Greetings. I'm your Remote Schedulers Tactical Assistant. Ready to optimize your project's logic? Ask me about baseline CPM schedules, Primavera P6 integration, forensic delay analysis, or how we can secure your next time extension." }] }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: [{ text: userMessage }] }]);
    setIsLoading(true);

    try {
      const history = messages.slice(0, -1); // Basic history management
      let currentModelResponse = '';
      
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);
      
      const stream = chatStream(userMessage, history);
      
      for await (const chunk of stream) {
        currentModelResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { 
            role: 'model', 
            parts: [{ text: currentModelResponse }] 
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-gold text-navy rounded-full shadow-2xl flex items-center justify-center cursor-pointer group relative overflow-hidden"
            id="chat-trigger"
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <MessageSquare size={24} className="sm:hidden" />
            <MessageSquare size={28} className="hidden sm:block" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '60px' : 'min(500px, 80vh)',
              width: 'min(380px, 92vw)'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-[#0A1929] border border-gold/20 shadow-4xl flex flex-col overflow-hidden rounded-sm"
          >
            {/* Header */}
            <div className="bg-navy border-b border-gold/10 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-white-off text-xs font-bold tracking-widest uppercase">Tactical Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[9px] text-white-off/40 font-bold uppercase tracking-tighter">System Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white-off/40 hover:text-gold transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minus size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white-off/40 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            {!isMinimized && (
              <>
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar scroll-smooth"
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-6 h-6 rounded-sm flex items-center justify-center shrink-0 mt-1 ${
                          msg.role === 'user' ? 'bg-gold/20 text-gold' : 'bg-white-off/5 text-white-off/40 border border-white-off/10'
                        }`}>
                          {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                        </div>
                        <div className={`p-3 text-xs leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-gold text-navy font-bold rounded-sm' 
                            : 'text-white-off/70 font-light'
                        }`}>
                          {msg.parts[0].text}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && messages[messages.length-1].role === 'user' && (
                    <div className="flex justify-start">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-sm bg-white-off/5 border border-white-off/10 flex items-center justify-center text-white-off/40">
                          <Loader2 size={12} className="animate-spin" />
                        </div>
                        <div className="p-3 text-xs text-white-off/30 italic">
                          Analyzing planning sequences...
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-navy border-t border-gold/10">
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask about CPM, P6, or scheduling..."
                      className="flex-1 bg-white-off/5 border border-gold/20 px-4 py-2.5 text-white-off text-xs font-light focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white-off/20"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={isLoading}
                      className="bg-gold text-navy p-2.5 hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

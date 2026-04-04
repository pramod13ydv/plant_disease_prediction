import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const initMessages = [
  { role: "assistant", text: "Hello Dr. Sarah. I am Medisight AI Assistant. I can help interpret scan results, recommend therapies, or answer medical queries. How can I assist you today?" }
];

export default function Chat() {
  const [messages, setMessages] = useState(initMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        text: "Based on the recent scans, the elevated leukocyte count suggests a potential infection. A standard cephalosporin course is often recommended, but please refer to the culture tests." 
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-sm text-muted-foreground">Chat with our fine-tuned medical LLM.</p>
      </div>

      <div className="flex-1 glass-card rounded-2xl flex flex-col overflow-hidden shadow-sm">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx} 
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-primary text-white' : 'bg-secondary text-foreground'
              }`}>
                {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-secondary text-foreground rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
               <div className="h-8 w-8 rounded-full bg-secondary text-foreground flex items-center justify-center shrink-0">
                  <Bot className="h-5 w-5" />
               </div>
               <div className="bg-secondary text-foreground rounded-2xl rounded-tl-none px-5 py-4 flex gap-1 items-center">
                 <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                 <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.2s" }} />
                 <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.4s" }} />
               </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="p-4 bg-card border-t border-border">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about patient history, diagnostic results..."
              className="w-full bg-secondary/50 border-border rounded-full pl-6 pr-14 py-3.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 p-2 rounded-full bg-primary text-white disabled:opacity-50 hover:bg-blue-600 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
            <Sparkles className="absolute left-6 h-5 w-5 text-primary/50 pointer-events-none hidden" />
          </form>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Medisight AI can make mistakes. Always verify medical information.
          </p>
        </div>
      </div>
    </div>
  );
}

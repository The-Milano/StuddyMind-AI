import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatWithDocument } from '../lib/api';
import { useAppStore } from '../store/useAppStore';

export const ChatInterface = ({ sessionId, initialHistory = [] }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const addChatMessage = useAppStore(state => state.addChatMessage);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [initialHistory, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { q: input, a: '' };
    addChatMessage({ role: 'user', content: input });
    setInput('');
    setIsLoading(true);

    try {
      const historyFormatted = initialHistory
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map((m, i, arr) => {
          if (m.role === 'user' && arr[i+1]?.role === 'assistant') {
            return { q: m.content, a: arr[i+1].content };
          }
          return null;
        }).filter(Boolean);

      const response = await chatWithDocument(sessionId, userMessage.q, historyFormatted);
      addChatMessage({ role: 'assistant', content: response.answer });
    } catch (error) {
      addChatMessage({ role: 'assistant', content: "Sorry, I encountered an error while processing your request." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow h-[calc(100vh-230px)] bg-white/30 backdrop-blur-xl border border-border-subtle/30 rounded-2xl overflow-hidden shadow-sm animate-fade-in-up relative">
      
      {/* Scrollable Message List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-surface-container-lowest/10">
        
        {/* Date Divider */}
        <div className="flex justify-center my-2">
          <span className="text-[10px] font-bold text-text-muted/70 bg-white/60 backdrop-blur-sm border border-border-subtle/30 rounded-full px-3 py-1 font-mono uppercase tracking-wider shadow-sm">
            Chat Session Initialized
          </span>
        </div>

        {/* System Welcome Message */}
        <div className="flex items-start gap-4 max-w-[85%] self-start animate-fade-in-up">
          <div className="w-8 h-8 rounded-full bg-accent-dim border border-accent-border/30 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <Sparkles className="text-accent w-4 h-4" />
          </div>
          <div className="bg-white/80 backdrop-blur-md shadow-[0_2px_12px_rgba(58,48,42,0.03)] border border-white/80 rounded-2xl rounded-tl-sm p-4 text-text-primary text-[15px] leading-relaxed">
            <p>Hi! I've read your document successfully. Ask me any clarifying questions, ask for summaries, or let's work on study cards together.</p>
          </div>
        </div>
        
        {/* Render Chat History */}
        {initialHistory.map((msg, i) => (
          <div 
            key={i} 
            className={`flex items-start gap-4 max-w-[85%] chat-message-enter ${
              msg.role === 'user' 
                ? 'self-end ml-auto flex-row-reverse' 
                : 'self-start'
            }`}
          >
            {/* Avatar */}
            {msg.role === 'user' ? (
              <div className="w-8 h-8 rounded-full bg-accent2/10 border border-accent2-border/30 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <span className="text-xs font-bold text-accent2">U</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-accent-dim border border-accent-border/30 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Sparkles className="text-accent w-4 h-4" />
              </div>
            )}

            {/* Bubble */}
            <div 
              className={`p-5 rounded-2xl shadow-[0_2px_12px_rgba(58,48,42,0.03)] text-[15px] leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-accent/10 border border-accent-border/20 rounded-tr-sm text-text-primary' 
                  : 'bg-white/80 border border-white/80 rounded-tl-sm text-text-primary'
              }`}
            >
              {msg.role === 'user' ? (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <div className="prose-sahara prose-sm text-text-primary">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* AI Typing Indicator */}
        {isLoading && (
          <div className="flex items-start gap-4 max-w-[85%] self-start animate-fade-in-up">
            <div className="w-8 h-8 rounded-full bg-accent-dim border border-accent-border/30 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <Sparkles className="text-accent w-4 h-4" />
            </div>
            <div className="bg-white/80 backdrop-blur-md shadow-[0_2px_12px_rgba(58,48,42,0.03)] border border-white/80 rounded-2xl rounded-tl-sm p-4 flex gap-1.5 items-center h-[46px]">
              <div className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Area */}
      <div className="p-4 border-t border-border-subtle/30 bg-surface/30 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="relative flex items-center bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_20px_rgba(58,48,42,0.04)] rounded-[2rem] p-1.5 transition-all focus-within:bg-white/85 focus-within:border-accent/40">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the document..."
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-text-primary placeholder:text-text-muted/65 text-sm md:text-base py-2.5 px-4 font-body outline-none"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent/95 shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 shrink-0"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles, X, Send, Bot, User, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sendAIAssistantMessage } from '../../services/api';
import { Product } from '../../types';
import customAssistantImg from '../../assets/images/regenerated_image_1786367497123.png';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  products?: Product[];
}

export const AIStyleAssistant: React.FC = () => {
  const {
    isAIAssistantOpen,
    setIsAIAssistantOpen,
    addToCart,
    toggleWishlist,
    isInWishlist,
    loadOutfitIntoStudio,
    setCurrentView
  } = useApp();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Hello! I am your StyleSmart AI Fashion Assistant. Tell me your occasion, budget, or desired aesthetic (e.g. "Suggest an outfit for a wedding guest", "Find sneakers under ₹3,500") and I will generate bespoke recommendations!'
    }
  ]);

  const presetPrompts = [
    'Suggest an outfit for a wedding guest',
    'Find casual outfits under ₹2000',
    'Show black oversized hoodies',
    'Create a summer linen look'
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = { id: `u-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await sendAIAssistantMessage(query);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        sender: 'ai',
        text: res.message,
        products: res.products
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          sender: 'ai',
          text: 'Apologies, I encountered an issue fetching recommendations. Here are some top trending items from our catalog!'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isAIAssistantOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-lg bg-white dark:bg-zinc-950 h-full flex flex-col shadow-2xl border-l border-zinc-200 dark:border-zinc-800"
        >
          {/* Header */}
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-950 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm">StyleSmart AI Assistant</h3>
                <p className="text-[11px] text-zinc-300">Personalized Fashion & Outfit Advisor</p>
              </div>
            </div>
            <button
              onClick={() => setIsAIAssistantOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-zinc-300" />
            </button>
          </div>

          {/* Preset Prompts Bar */}
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 flex gap-2 overflow-x-auto text-xs">
            {presetPrompts.map(p => (
              <button
                key={p}
                onClick={() => handleSend(p)}
                className="px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 whitespace-nowrap hover:border-indigo-500 hover:text-indigo-600 transition-all font-medium text-[11px]"
              >
                ✨ {p}
              </button>
            ))}
          </div>

          {/* Chat Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-3`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none font-medium'
                        : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Embedded Product Recommendations */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <button
                        onClick={() => {
                          loadOutfitIntoStudio(msg.products!);
                          setCurrentView('outfit-builder');
                          setIsAIAssistantOpen(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:from-indigo-500 hover:to-violet-500 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Build This Outfit in Studio ({msg.products.length} items)</span>
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                      {msg.products.map(prod => (
                        <div
                          key={prod.id}
                          className="bg-white dark:bg-zinc-900 rounded-xl p-2 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
                        >

                          <img
                            src={prod.images[0] || customAssistantImg}
                            alt={prod.title}
                            className="w-full aspect-square object-cover rounded-lg mb-2"
                            referrerPolicy="no-referrer"
                          />

                          <div>
                            <span className="text-[10px] font-bold text-indigo-600 uppercase">
                              {prod.brand}
                            </span>
                            <h5 className="text-[11px] font-semibold text-zinc-900 dark:text-white line-clamp-1">
                              {prod.title}
                            </h5>
                            <span className="text-xs font-bold text-zinc-900 dark:text-white block mt-0.5">
                              ₹{prod.price.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex gap-1.5 mt-2">
                            <button
                              onClick={() => addToCart(prod)}
                              className="flex-1 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center gap-1"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              Add
                            </button>
                            <button
                              onClick={() => toggleWishlist(prod)}
                              className={`p-1 rounded border text-xs ${
                                isInWishlist(prod.id)
                                  ? 'bg-rose-500 text-white border-rose-500'
                                  : 'border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                              }`}
                            >
                              <Heart className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 text-white flex items-center justify-center shrink-0 text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center text-xs text-zinc-400">
                <Bot className="w-4 h-4 text-indigo-500 animate-spin" />
                <span>AI is analyzing fashion compatibility & budget...</span>
              </div>
            )}
          </div>

          {/* Bottom Chat Input Form */}
          <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask AI: e.g. 'College outfit under ₹3,000'..."
                className="flex-1 px-4 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 border border-transparent focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

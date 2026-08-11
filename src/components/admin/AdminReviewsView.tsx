import React, { useState } from 'react';
import { Star, CheckCircle2, Flag, MessageSquare, Trash2, X, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminReviewsView: React.FC = () => {
  const { adminReviews, updateReviewStatus, addReviewReply, deleteReview } = useApp();

  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyingReviewId && replyText.trim()) {
      addReviewReply(replyingReviewId, replyText);
      setReplyingReviewId(null);
      setReplyText('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Reviews & Rating Moderation</h2>
        <p className="text-xs text-slate-400">Approve customer feedback, flag inappropriate content, respond officially</p>
      </div>

      <div className="space-y-4">
        {adminReviews.map(review => (
          <div key={review.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={review.productImage} alt={review.productTitle} className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-800" />
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{review.productTitle}</h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
                      />
                    ))}
                    <span className="text-[11px] text-slate-400 font-mono ml-1">{review.rating}.0</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  review.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' : review.status === 'Pending' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {review.status}
                </span>

                <button
                  onClick={() => updateReviewStatus(review.id, 'Approved')}
                  className="p-1.5 rounded-lg bg-slate-950 text-emerald-400 hover:bg-emerald-500/20"
                  title="Approve Review"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => updateReviewStatus(review.id, 'Flagged')}
                  className="p-1.5 rounded-lg bg-slate-950 text-rose-400 hover:bg-rose-500/20"
                  title="Flag Review"
                >
                  <Flag className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteReview(review.id)}
                  className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-rose-400"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">{review.userName}</span>
                <span>{review.date}</span>
              </div>
              <p className="leading-relaxed">"{review.comment}"</p>

              {review.adminReply && (
                <div className="mt-3 p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-indigo-200 text-xs flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[10px] text-indigo-300">StyleSmart Official Reply</span>
                    <span>{review.adminReply}</span>
                  </div>
                </div>
              )}
            </div>

            {!review.adminReply && (
              <div className="text-right">
                <button
                  onClick={() => setReplyingReviewId(review.id)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 ml-auto"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Reply to Customer
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {replyingReviewId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100">Official Brand Response</h3>
              <button onClick={() => setReplyingReviewId(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReplySubmit} className="space-y-3">
              <textarea
                rows={4}
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Type your official customer service response..."
                required
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setReplyingReviewId(null)} className="px-3 py-1.5 text-xs text-slate-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl">
                  Publish Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

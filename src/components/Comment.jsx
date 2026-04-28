import { useState } from "react";
import { ThumbsUp, Heart, Star, Calendar, MessageCircle, ChevronDown, ChevronUp, User, Quote } from "lucide-react";

const reactionEmojis = {
  nice: "👍",
  love_it: "❤️",
  funny: "😂",
  confusing: "🤔",
  informative: "📚",
  well_written: "✍️",
  creative: "🎨",
};

const Comment = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { user = {}, review = "", date, reactions = {}, score, is_spoiler } = item;
  const fallbackAvatar = user.username?.charAt(0)?.toUpperCase() || "?";

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const isLongReview = review.length > 300;

  return (
    <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800/50 p-6 rounded-[2rem] hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden shadow-2xl">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-colors duration-500"></div>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600/20 rounded-2xl blur-sm group-hover:blur-md transition-all"></div>
            {user.images?.jpg?.image_url ? (
              <img
                src={user.images.jpg.image_url}
                alt={user.username}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-gray-800 group-hover:border-blue-500/50 transition-all relative z-10"
              />
            ) : (
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-xl border-2 border-gray-800 relative z-10">
                {fallbackAvatar}
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 bg-gray-950 border-2 border-gray-800 rounded-xl px-2 py-1 text-[11px] font-black text-yellow-500 flex items-center gap-1 shadow-lg z-20">
              <Star size={12} className="fill-yellow-500" />
              {score}
            </div>
          </div>
          <div>
            <h4 className="text-white text-lg font-black group-hover:text-blue-400 transition-colors flex items-center gap-2">
              {user.username}
              {index === 0 && (
                <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">Top Review</span>
              )}
            </h4>
            <div className="flex items-center gap-4 mt-1.5">
              <span className="text-[11px] text-gray-400 flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <Calendar size={12} className="text-blue-500" />
                {formatDate(date)}
              </span>
              {is_spoiler && (
                <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-lg font-black uppercase tracking-widest animate-pulse">
                  Spoiler Warning
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-2xl font-black text-gray-800 group-hover:text-blue-900/30 transition-colors">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 bg-gray-950/40 rounded-2xl p-4 border border-gray-800/30">
        <Quote className="absolute -top-2 -left-2 text-gray-800 w-8 h-8 -rotate-12 opacity-50" />
        <div className="relative">
          <p className={`text-gray-200 leading-relaxed text-[15px] font-medium whitespace-pre-line selection:bg-blue-500/30 ${!isExpanded ? 'line-clamp-5' : ''}`}>
            {review}
          </p>
          
          {isLongReview && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 w-full py-2 flex items-center justify-center gap-2 text-xs font-black text-blue-400 hover:text-white bg-blue-500/5 hover:bg-blue-600 rounded-xl transition-all border border-blue-500/10 hover:border-blue-500 shadow-sm"
            >
              {isExpanded ? (
                <>Collapse Review <ChevronUp size={14} /></>
              ) : (
                <>Read Full Experience <ChevronDown size={14} /></>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="mt-6 pt-6 border-t border-gray-800/50 flex items-center justify-between flex-wrap gap-4 relative z-10">
        <div className="flex flex-wrap gap-2">
          {Object.entries(reactions).map(([type, count]) =>
            type !== "overall" && count > 0 && reactionEmojis[type] ? (
              <div
                key={type}
                className="px-3 py-1.5 bg-gray-800/30 hover:bg-gray-800 rounded-xl text-xs flex items-center gap-2 text-gray-300 border border-gray-700/30 hover:border-blue-500/30 transition-all cursor-default"
                title={type.replace('_', ' ')}
              >
                <span className="text-sm">{reactionEmojis[type]}</span>
                <span className="font-black">{count}</span>
              </div>
            ) : null
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all border ${
              isLiked 
                ? "bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
                : "bg-gray-800/30 text-gray-400 border-gray-700/30 hover:text-red-400 hover:border-red-500/30"
            }`}
          >
            <Heart size={14} className={isLiked ? "fill-red-500" : ""} />
            {isLiked ? "Helpful" : "Was this helpful?"}
          </button>
          <button className="p-2.5 rounded-xl bg-gray-800/30 text-gray-400 border border-gray-700/30 hover:text-blue-400 hover:border-blue-500/30 transition-all">
            <MessageCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
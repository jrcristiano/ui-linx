import { Heart, MessageCircle, Share2 } from 'lucide-react';

export default function PostActions() {
  return (
    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors`}
      >
        <Heart size={18} className={''} />
        <span className="text-sm font-medium"></span>
      </button>

      <button className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
        <MessageCircle size={18} />
        <span className="text-sm font-medium"></span>
      </button>

      <button className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
        <Share2 size={18} />
        <span className="text-sm font-medium"></span>
      </button>
    </div>
  );
}

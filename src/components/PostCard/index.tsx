import { User } from 'lucide-react';
import type { Post } from '../../common/interfaces/posts/post.interface';
import PostActions from '../PostActions';

interface PostCardProps {
  post: Post;
  authUser: any;
}

export default function PostCard({ post, authUser }: PostCardProps) {
  return (
    <div className="border-b border-gray-100">
      <div className="p-4">
        {/* Post Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900">
                {post.user.name} {post.user.lastname}
              </h4>
              {post.user.id === authUser?.id && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Você
                </span>
              )}
              <span className="text-gray-500 text-sm">
                · {new Date(post.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-900 text-base leading-relaxed">{post.title}</p>
        </div>

        {/* Post Actions */}
        <PostActions />
      </div>
    </div>
  );
}

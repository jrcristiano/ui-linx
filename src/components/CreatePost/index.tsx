interface CreatePostProps {
  newPostTitle: string;
  setNewPostTitle: (value: string) => void;
  handleCreatePost: () => void;
  setShowCreatePost: (value: boolean) => void;
}

export default function CreatePost({
  newPostTitle,
  setNewPostTitle,
  handleCreatePost,
  setShowCreatePost
}: CreatePostProps) {
  return (
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Novo Post</h3>
        <textarea
          value={newPostTitle}
          onChange={e => setNewPostTitle(e.target.value)}
          placeholder="O que você está pensando?"
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleCreatePost}
            disabled={!newPostTitle.trim()}
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Publicar
          </button>
          <button
            onClick={() => {
              setShowCreatePost(false);
              setNewPostTitle('');
            }}
            className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

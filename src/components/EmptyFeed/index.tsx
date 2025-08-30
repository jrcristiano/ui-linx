import { MessageCircle } from 'lucide-react';

export default function EmptyFeed() {
  return (
    <div className="p-8 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <MessageCircle size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum post encontrado</h3>
    </div>
  );
}

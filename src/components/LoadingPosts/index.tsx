export default function LoadingPosts() {
  return (
    <div className="p-8 text-center">
      <div className="animate-pulse">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-48 mx-auto"></div>
      </div>
    </div>
  );
}

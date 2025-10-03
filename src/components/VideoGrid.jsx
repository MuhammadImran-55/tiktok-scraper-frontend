// src/components/VideoGrid.jsx
export default function VideoGrid({ videos }) {
  if (!Array.isArray(videos) || videos.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm py-4">
        No videos found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
        >
          {/* 🖼 Thumbnail */}
          <div className="relative aspect-[9/16] bg-gray-200">
            {video.thumbnail ? (
              <img
                src={video.thumbnail}
                alt={video.description || `Video ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No Thumbnail
              </div>
            )}
          </div>

          {/* 📊 Video Info */}
          <div className="p-3 space-y-2">
            <p className="text-sm font-medium line-clamp-2">
              {video.description || "No description"}
            </p>

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
              <div>👁 {video.views ?? "—"}</div>
              <div>❤️ {video.likes ?? "—"}</div>
              <div>💬 {video.comments ?? "—"}</div>
              <div>🔁 {video.shares ?? "—"}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

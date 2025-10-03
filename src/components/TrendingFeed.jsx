// src/components/TrendingFeed.jsx
export default function TrendingFeed({ data }) {
  const videos = Array.isArray(data) ? data : [];

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-pink-600 mb-6 text-center">🔥 Trending Videos</h2>

      {videos.length === 0 && <p className="text-center text-gray-500">😕 No trending videos found.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {videos.map((video, index) => (
          <div key={video.videoLink || index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 overflow-hidden relative">
            <div className="absolute top-0 left-0 z-10 bg-pink-600 text-white px-2 py-1 rounded-br-lg font-bold">
              #{index + 1}
            </div>

            <a href={video.videoLink} target="_blank" rel="noopener noreferrer">
              <img src={video.thumbnail || "/placeholder.jpg"} alt="Video thumbnail" className="w-full h-64 object-cover" />
            </a>

            <div className="p-4 flex items-center gap-3 border-t">
              <img src={video.avatar || "/avatar.png"} alt={video.username} className="w-12 h-12 rounded-full object-cover border" />
              <div className="flex flex-col">
                <a href={video.profileLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-pink-600 hover:underline">
                  @{video.username || "Unknown"}
                </a>
                <span className="text-gray-500 text-sm">❤️ {video.likeCount ?? video.likes ?? 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

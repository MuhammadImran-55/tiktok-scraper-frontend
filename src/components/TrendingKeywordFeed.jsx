// src/components/TrendingKeywordFeed.jsx
export default function TrendingKeywordFeed({ data }) {
  const videos = Array.isArray(data) ? data : [];

  if (!videos.length) {
    return (
      <div className="text-center text-gray-500 mt-10 text-lg">
        😕 No trending videos found for this keyword.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {videos.map((video, index) => (
        <div
          key={video.videoLink || index}
          className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition relative"
        >
          {/* Rank badge */}
          <div className="absolute top-0 left-0 z-10 bg-pink-600 text-white px-3 py-1 rounded-br-xl font-bold text-lg">
            #{index + 1}
          </div>

          <div className="relative w-full h-64 bg-gray-200">
            {video.thumbnail ? (
              <img src={video.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">No thumbnail</div>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              {video.avatar && <img src={video.avatar} alt={video.username} className="w-10 h-10 rounded-full" />}
              <div>
                <p className="font-semibold text-gray-800">@{video.username || "Unknown"}</p>
                {video.profileLink && (
                  <a href={video.profileLink} target="_blank" rel="noopener noreferrer" className="text-sm text-pink-600 hover:underline">
                    View Profile
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">❤️ {video.likeCount ?? video.likes ?? 0} Likes</p>

            {video.videoLink && (
              <a href={video.videoLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-pink-600 text-white text-sm px-4 py-2 rounded hover:bg-pink-700 transition">
                ▶ Watch Video
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

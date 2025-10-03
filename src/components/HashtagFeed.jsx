// src/components/HashtagFeed.jsx
export default function HashtagFeed({ data }) {
  const videos = Array.isArray(data) ? data : [];

  if (!videos.length) {
    return <div className="text-center text-gray-600 text-lg mt-10">📭 No videos found for this hashtag.</div>;
  }

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
      {videos.map((video, idx) => (
        <div key={video.videoLink || idx} className="relative bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300">
          <div className="absolute top-0 left-0 bg-pink-600 text-white px-2 py-1 rounded-tr-lg font-bold z-10">#{idx + 1}</div>

          {video.videoLink && (
            <a href={video.videoLink} target="_blank" rel="noopener noreferrer">
              <img src={video.thumbnail || "/placeholder.png"} alt={video.username || "TikTok video"} className="w-full h-60 object-cover" />
            </a>
          )}

          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              {video.avatar && <img src={video.avatar} alt={video.username} className="w-12 h-12 rounded-full border" />}
              <div>
                {video.profileLink ? (
                  <a href={video.profileLink} target="_blank" rel="noopener noreferrer" className="text-pink-600 font-semibold hover:underline">
                    @{video.username || "Unknown"}
                  </a>
                ) : (
                  <span className="text-gray-700 font-semibold">@{video.username || "Unknown"}</span>
                )}
              </div>
            </div>

            <div className="text-gray-600 text-sm">❤️ {video.likeCount ?? video.likes ?? "0"} likes</div>
          </div>
        </div>
      ))}
    </div>
  );
}

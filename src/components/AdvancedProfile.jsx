// src/components/AdvancedProfile.jsx
import VideoGrid from "./VideoGrid";

function Stat({ label, value }) {
  return (
    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded text-center">
      <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
      <div className="text-lg font-semibold">{value ?? "—"}</div>
    </div>
  );
}

export default function AdvancedProfile({ data }) {
  // ✅ expected shape:
  // {
  //   profile: {...},
  //   meta: {...},
  //   totalVideos,
  //   totalReposts,
  //   topVideos: [...]
  // }

  const profile = data?.profile || {};
  const meta = data?.meta || {};
  const videos = Array.isArray(data?.topVideos) ? data.topVideos : [];

  return (
    <div className="space-y-6">
      {/* 👤 Profile Header */}
      <div className="flex items-start gap-4">
        <img
          src={profile.avatar || "/default-avatar.png"}
          alt={profile.username || "avatar"}
          className="w-20 h-20 rounded-md object-cover bg-gray-100"
        />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{profile.username || "Unknown"}</h3>
              <div className="text-sm text-gray-600">{profile.name}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Loaded</div>
              <div className="font-medium">{meta.loadedVideoCards ?? 0}</div>
            </div>
          </div>

          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{profile.bio}</p>

          <div className="mt-3 grid grid-cols-3 gap-2 max-w-md">
            <Stat label="Followers" value={profile.followers} />
            <Stat label="Following" value={profile.following} />
            <Stat label="Likes" value={profile.likes} />
          </div>
        </div>
      </div>

      {/* 📊 Meta Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-white dark:bg-gray-800 rounded shadow-sm">
          <div className="text-sm text-gray-500">Total Videos (loaded)</div>
          <div className="text-xl font-semibold">{data.totalVideos ?? 0}</div>
        </div>

        {data.totalReposts !== undefined && (
          <div className="p-3 bg-white dark:bg-gray-800 rounded shadow-sm">
            <div className="text-sm text-gray-500">Total Reposts</div>
            <div className="text-xl font-semibold">{data.totalReposts}</div>
          </div>
        )}

        <div className="p-3 bg-white dark:bg-gray-800 rounded shadow-sm">
          <div className="text-sm text-gray-500">Has Repost Tab</div>
          <div className="text-xl font-semibold">{meta.hasRepostTab ? "Yes" : "No"}</div>
        </div>

        <div className="p-3 bg-white dark:bg-gray-800 rounded shadow-sm">
          <div className="text-sm text-gray-500">Has Liked Tab</div>
          <div className="text-xl font-semibold">{meta.hasLikedTab ? "Yes" : "No"}</div>
        </div>

        <div className="p-3 bg-white dark:bg-gray-800 rounded shadow-sm">
          <div className="text-sm text-gray-500">Requested Max</div>
          <div className="text-xl font-semibold">{meta.requestedMax ?? "—"}</div>
        </div>
      </div>

      {/* 🎥 Top Videos */}
      <div>
        <h4 className="text-lg font-semibold mb-2">Top Videos (preview)</h4>

        {videos.length === 0 ? (
          <div className="text-sm text-gray-500">No videos found.</div>
        ) : (
          <VideoGrid videos={videos} />
        )}
      </div>
    </div>
  );
}

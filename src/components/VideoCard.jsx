// src/components/VideoCard.jsx
export default function VideoCard({ video }) {
  const { thumbnail, description, views, likes, comments, shares, url } = video || {};

  return (
    <a
      href={url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white dark:bg-gray-800 rounded overflow-hidden shadow-sm hover:shadow-md transition"
    >
      <div className="w-full aspect-video bg-gray-200 overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={description || "thumbnail"} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
        )}
      </div>

      <div className="p-2 text-sm">
        <div className="font-medium truncate">{description || "—"}</div>
        <div className="mt-1 text-xs text-gray-500 flex flex-wrap gap-2">
          <span>👁 {views ?? "—"}</span>
          <span>❤ {likes ?? "—"}</span>
          <span>💬 {comments ?? "—"}</span>
          <span>🔁 {shares ?? "—"}</span>
        </div>
      </div>
    </a>
  );
}

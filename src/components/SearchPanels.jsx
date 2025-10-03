// src/components/SearchPanel.jsx
import { useState } from "react";

export default function SearchPanel({ activeTool, onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(activeTool, query.trim());
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      {activeTool === "trending-keyword" && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-pink-600">🔥 Search Trending Videos by Keyword</h2>
          <input
            type="text"
            placeholder="Enter trending keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
          >
            Search
          </button>
        </form>
      )}

      {activeTool === "hashtag" && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-pink-600">#️⃣ Search by Hashtag</h2>
          <input
            type="text"
            placeholder="Enter hashtag (without #)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
          >
            Search
          </button>
        </form>
      )}

      {activeTool === "advanced" && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-pink-600">👤 Advanced Profile Scraper</h2>
          <input
            type="text"
            placeholder="Enter TikTok username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
          >
            Scrape Profile
          </button>
        </form>
      )}
    </div>
  );
}

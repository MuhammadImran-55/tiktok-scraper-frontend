import { useState } from "react";

export function TrendingSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">🔥 Search Trending Videos</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch?.(query);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          placeholder="Enter keyword (e.g. cricket)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 w-72 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export function HashtagSearch({ onSearch }) {
  const [hashtag, setHashtag] = useState("");

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">#️⃣ Hashtag Scraper</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch?.(hashtag);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          placeholder="Enter hashtag (without #)"
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
          className="px-4 py-2 w-72 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          Scrape
        </button>
      </form>
    </div>
  );
}

export function AdvancedProfileSearch({ onSearch }) {
  const [username, setUsername] = useState("");

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">👤 Advanced Profile Scraper</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch?.(username);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          placeholder="Enter TikTok username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 w-72 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          Scrape
        </button>
      </form>
    </div>
  );
}

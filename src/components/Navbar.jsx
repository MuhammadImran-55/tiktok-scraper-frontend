import { useState } from "react";

export default function NavBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch("profile", query.trim());
  };

  return (
    <nav className="w-full bg-black text-white px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-md">
      <h1 className="text-2xl font-bold">TikTok Leaderboard</h1>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 mt-4 md:mt-0 w-full md:w-auto"
      >
        <input
          type="text"
          placeholder="Enter TikTok username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-700 focus:outline-none text-white w-full md:w-64 bg-gray-800"
        />

        <button
          type="submit"
          className="px-5 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition"
        >
          Go
        </button>
      </form>
    </nav>
  );
}

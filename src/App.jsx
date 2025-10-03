// src/App.jsx
import { useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Sidebar from "./components/Sidebar";
import SearchPanel from "./components/SearchPanels";
import './App.css';
import AdvancedProfile from "./components/AdvancedProfile";
import TrendingFeed from "./components/TrendingFeed";
import TrendingKeywordFeed from "./components/TrendingKeywordFeed";
import HashtagFeed from "./components/HashtagFeed";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState("profile");

  useEffect(() => {
    if (searchType === "trending-general") {
      handleSearch("trending-general");
    } else {
      setData(null);
      setError(null);
      setLoading(false);
    }
  }, [searchType]);

  const handleSearch = async (type, query = "") => {
    setSearchType(type);
    setLoading(true);
    setError(null);
    setData(null);

    try {
      let endpoint = "";

      if (type === "profile") {
        endpoint = `${API_BASE}/api/profile/${query}`;
      } else if (type === "advanced") {
        endpoint = `${API_BASE}/api/advanced-profile/${query}`;
      } else if (type === "trending-keyword") {
        endpoint = `${API_BASE}/api/trending/${query}`;
      } else if (type === "trending-general") {
        endpoint = `${API_BASE}/api/trending`;
      } else if (type === "hashtag") {
        endpoint = `${API_BASE}/api/hashtag/${query}`;
      } else {
        throw new Error("Unknown search type");
      }

      const res = await fetch(endpoint);
      if (!res.ok) {
        const txt = await res.text().catch(() => "no-body");
        throw new Error(`Failed to fetch data (${res.status}) - ${txt}`);
      }

      const result = await res.json();
      console.log("🔥 API raw result:", result);

      const arr = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
        ? result.data
        : null;

      if (!arr) {
        setData([]);
        setError("No data array returned from API.");
      } else {
        setData(arr);
      }
    } catch (err) {
      console.error("API error:", err);
      setError(err.message || "Unknown error");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black flex relative">
      <Sidebar onSelect={setSearchType} />

      <div className="flex-1 md:ml-12 transition-all duration-300">
        <header className="w-full bg-white shadow-md sticky top-0 z-30">
          <NavBar onSearch={handleSearch} />
        </header>

        <main className="px-6 py-10 space-y-10">
          <div className="transition-all duration-500 transform animate-slide-in">
            <SearchPanel activeTool={searchType} onSearch={handleSearch} />
          </div>

          {loading && <Loader message="⏳ Fetching data from TikTok..." />}
          {error && <ErrorMessage message={error} />}

          {searchType === "profile" && data && <ProfilePage data={data} />}
          {searchType === "advanced" && data && <AdvancedProfile data={data} />}

          {searchType === "trending-general" && Array.isArray(data) && (
            <TrendingFeed data={data} />
          )}

          {searchType === "trending-keyword" && Array.isArray(data) && (
            <TrendingKeywordFeed data={data} />
          )}

          {searchType === "hashtag" && Array.isArray(data) && (
            <HashtagFeed data={data} />
          )}

          {!loading && !error && !data && (
            <div className="text-center text-gray-500 mt-8">
              Select a tool or run a search to see results.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

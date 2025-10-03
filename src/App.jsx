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

export default function App() {
  const [data, setData] = useState(null); // will hold array when fetched
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState("profile");

  // Auto trigger general trending when sidebar selects it
  useEffect(() => {
    if (searchType === "trending-general") {
      handleSearch("trending-general");
    } else {
      // Clear results when changing tool (optional)
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
        endpoint = `http://localhost:5000/api/profile/${query}`;
      } else if (type === "advanced") {
        endpoint = `http://localhost:5000/api/advanced-profile/${query}`;
      } else if (type === "trending-keyword") {
        endpoint = `http://localhost:5000/api/trending/${query}`;
      } else if (type === "trending-general") {
        endpoint = `http://localhost:5000/api/trending`;
      } else if (type === "hashtag") {
        endpoint = `http://localhost:5000/api/hashtag/${query}`;
      } else {
        throw new Error("Unknown search type");
      }

      const res = await fetch(endpoint);
      if (!res.ok) {
        const txt = await res.text().catch(() => "no-body");
        throw new Error(`Failed to fetch data (${res.status}) - ${txt}`);
      }

      const result = await res.json();
      console.log("🔥 API raw result:", result); // helpful for debugging

      // If backend returns { success, count, data }, use result.data
      // If backend returns plain array (for any reason), accept it as well
      const arr = Array.isArray(result) ? result : Array.isArray(result?.data) ? result.data : null;

      if (!arr) {
        // no array returned — show user-friendly error message but don't crash
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

          {/* profile / advanced expect their own shapes — only render when data exists */}
          {searchType === "profile" && data && <ProfilePage data={data} />}

          {searchType === "advanced" && data && <AdvancedProfile data={data} />}

          {/* For trending feeds and hashtag we pass the array in `data` */}
          {searchType === "trending-general" && Array.isArray(data) && (
            <TrendingFeed data={data} />
          )}

          {searchType === "trending-keyword" && Array.isArray(data) && (
            <TrendingKeywordFeed data={data} />
          )}

          {searchType === "hashtag" && Array.isArray(data) && (
            <HashtagFeed data={data} />
          )}

          {/* If user selected a tool but no data yet and not loading, show hint */}
          {(!loading && !error && !data) && (
            <div className="text-center text-gray-500 mt-8">
              Select a tool or run a search to see results.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

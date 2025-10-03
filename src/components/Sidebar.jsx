// src/components/Sidebar.jsx
import { useState } from "react";
import { Flame, Hash, User, X, Menu, Zap } from "lucide-react";

export default function Sidebar({ onSelect }) {
  const [active, setActive] = useState("profile");
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (type) => {
    setActive(type);
    onSelect(type);
    setIsOpen(false);
  };

  return (
    <>
      {/* 📱 Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-pink-600 p-2 rounded-lg text-white shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 📌 Sidebar */}
      <div
        className={`fixed top-[5vh] left-4 h-[100vh] bg-white text-black w-64 p-5 z-40 rounded-2xl shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex md:flex-col md:static`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center text-pink-600">
          TikTok Tools
        </h2>

        <div className="space-y-4">
          {/* 🔥 General Trending - direct fetch */}
          <button
            onClick={() => handleClick("trending-general")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg text-lg transition ${
              active === "trending-general"
                ? "bg-pink-600 text-white"
                : "bg-gray-100 hover:bg-pink-100"
            }`}
          >
            <Zap size={22} /> General Trending
          </button>

          {/* 🔥 Trending by Keyword */}
          <button
            onClick={() => handleClick("trending-keyword")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg text-lg transition ${
              active === "trending-keyword"
                ? "bg-pink-600 text-white"
                : "bg-gray-100 hover:bg-pink-100"
            }`}
          >
            <Flame size={22} /> Trending by Keyword
          </button>

          {/* #️⃣ Hashtag Scraper */}
          <button
            onClick={() => handleClick("hashtag")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg text-lg transition ${
              active === "hashtag"
                ? "bg-pink-600 text-white"
                : "bg-gray-100 hover:bg-pink-100"
            }`}
          >
            <Hash size={22} /> Hashtag Scraper
          </button>

          {/* 👤 Advanced Scraper */}
          <button
            onClick={() => handleClick("advanced")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg text-lg transition ${
              active === "advanced"
                ? "bg-pink-600 text-white"
                : "bg-gray-100 hover:bg-pink-100"
            }`}
          >
            <User size={22} /> Advanced Scraper
          </button>
        </div>
      </div>

      {/* 📱 Overlay on mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
        ></div>
      )}
    </>
  );
}

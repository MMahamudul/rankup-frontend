import { useState } from "react";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

const Banner = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative -mt-16 bg-linear-to-b from-blue-900 to-blue-700">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-7xl mx-auto px-4 py-28 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Discover & Win Creative Contests
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Photography, Coding, Writing, Gaming & Business challenges —  
          showcase your talent and win exciting prizes.
        </p>

        {/* SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="mt-10 max-w-2xl mx-auto flex items-center bg-white rounded-full shadow-lg overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search contests by category or name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-6 py-4 text-gray-800 outline-none"
          />
          <button
            type="submit"
            className="px-6 py-6 bg-blue-700 hover:bg-blue-800 transition text-white"
          >
            <FaSearch />
          </button>
        </form>

        {/* Suggested tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          {["Photography", "Coding", "Writing", "Gaming", "Designing", "Business"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => navigate(`/search?query=${cat}`)}
                className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 transition"
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "Discover To Dominate",
    image:
      "https://i.ibb.co/gbv1q3x1/color-drops.png",
    showSearch: true,
  },
  {
    id: 2,
    title: "Showcase Yours Talent",
    subtitle:
      "Compete with creative minds worldwide and build your reputation.",
    image:
      "https://i.ibb.co/M5hg7HsK/brain.png",
    showSearch: false,
  },
  {
    id: 3,
    title: "Win Exciting Rewards",
    subtitle:
      "Cash prizes, certificates, recognition and opportunities.",
    image:
      "https://i.ibb.co/TM3ZMz72/Banner-removebg-preview.png",
    showSearch: false,
  },
];
/* https://i.ibb.co/TM3ZMz72/Banner-removebg-preview.png
https://i.ibb.co/Jj1FDm7g/bulb.png
https://i.ibb.co/M5hg7HsK/brain.png
https://i.ibb.co/gbv1q3x1/color-drops.png */
const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const slide = slides[current];

  return (
    <section className="relative -mt-16 overflow-hidden bg-linear-to-r from-blue-300 via-purple-200 to-gray-100">
      <div className="absolute inset-0 " />

      <div className="relative max-w-7xl mx-auto py-25 ">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.6 }}
            
          >
            
            <div className="flex gap-20 items-center justify-center ">
              {/* LEFT SIDE */}
              <div className="flex-1">
              <h1 className="text-lg md:text-5xl font-bold text-blue-950 leading-tight">
                {slide.title}
              </h1>

              <p className="mt-8
               text-xl md:text-xl text-blue-900 max-w-xl">
                {slide.subtitle}
              </p>

              {/* SEARCH ONLY ON FIRST SLIDE */}
              {slide.showSearch && (
                <>
                  <form
                    onSubmit={handleSearch}
                    className="mt-6 max-w-xl flex items-center bg-blue-100 rounded-full shadow-lg overflow-hidden "
                  >
                    <input
                      type="text"
                      placeholder="Search contests by category or name..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="flex-1 px-6 py-2 text-gray-800 outline-none "
                    />
                    <button
                      type="submit"
                      className="px-6 py-4 bg-blue-300 hover:bg-blue-800 transition text-white"
                    >
                      <FaSearch />
                    </button>
                  </form>

                  {/* TAGS */}
                  <div className="mt-6 flex flex-wrap gap-3 text-sm">
                    {[
                      "Photography",
                      "Coding",
                      "Writing",
                      "Gaming",
                      "Designing",
                      "Business",
                    ].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => navigate(`/search?query=${cat}`)}
                        className="px-4 py-1.5 rounded-full bg-blue-900 text-white hover:bg-blue-600 transition"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="flex-1">
              <img
                src={slide.image}
                alt="Banner slide"
                className="w-150 h-120 object-cover"
              />
            </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Banner;

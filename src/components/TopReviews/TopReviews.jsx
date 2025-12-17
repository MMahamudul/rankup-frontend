const reviews = [
  {
    id: 1,
    name: "Abdul Basit",
    country: "Bangladesh",
    role: "Contest Creator",
    image: "https://i.pravatar.cc/100?img=12",
    review:
      "Amazing experience hosting contests here. The dashboard is clean, participants are active, and winner declaration is smooth.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sara Khan",
    country: "Pakistan",
    role: "Participant",
    image: "https://i.pravatar.cc/100?img=32",
    review:
      "Submitting my entry was super easy. I love the transparency and clear deadlines. Definitely a trustworthy platform.",
    rating: 5,
  },
  {
    id: 3,
    name: "David Lee",
    country: "United States",
    role: "Participant",
    image: "https://i.pravatar.cc/100?img=45",
    review:
      "The contest variety is impressive. Payment flow is secure and the UI feels very professional.",
    rating: 4,
  },
  {
    id: 4,
    name: "Fatima Noor",
    country: "UAE",
    role: "Contest Creator",
    image: "https://i.pravatar.cc/100?img=47",
    review:
      "Customer support was responsive and helpful. Highly recommended for anyone hosting creative contests.",
    rating: 5,
  },
];

const Stars = ({ count }) => (
  <div className="flex justify-center gap-1 mt-4">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`h-5 w-5 ${
          i < count ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
      </svg>
    ))}
  </div>
);

const TopReviews = () => {
  return (
    <section className="my-4 bg-linear-to-b from-blue-900 to-blue-700 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center text-white">
        {/* Header */}
        <p className="uppercase tracking-widest text-blue-200 font-semibold">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
          What Our Users Say About Us
        </h2>
        <p className="max-w-2xl mx-auto mt-4 text-blue-100">
          Trusted by contest creators and participants worldwide.  
          Here’s what they think about our platform.
        </p>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white text-gray-800 rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition"
            >
              {/* Avatar */}
              <div className="flex justify-center">
                <img
                  src={r.image}
                  alt={r.name}
                  className="h-20 w-20 rounded-full border-4 border-blue-600 object-cover -mt-16 bg-white"
                />
              </div>

              {/* Name */}
              <h3 className="mt-4 font-bold text-lg">{r.name}</h3>
              <p className="text-sm text-blue-600 font-semibold">
                {r.country}
              </p>

              <p className="text-xs text-gray-500 mb-3">{r.role}</p>

              {/* Review */}
              <p className="text-sm text-gray-600 leading-relaxed">
                “{r.review}”
              </p>

              {/* Rating */}
              <Stars count={r.rating} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopReviews;

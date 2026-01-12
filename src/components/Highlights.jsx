import { FaGlobe, FaBalanceScale, FaTrophy } from "react-icons/fa";

const highlights = [
  {
    icon: <FaGlobe size={36} />,
    title: "Global Contests",
    description:
      "Participate in skill-based contests hosted by creators worldwide.",
  },
  {
    icon: <FaBalanceScale size={36} />,
    title: "Fair Judging",
    description:
      "Transparent evaluation system ensuring equal opportunities for everyone.",
  },
  {
    icon: <FaTrophy size={36} />,
    title: "Real Rewards",
    description:
      "Win cash prizes, certificates, and global recognition.",
  },
];

const Highlights = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-blue-900">
            Platform Highlights
          </h2>
          <p className="mt-4 text-blue-700 max-w-2xl mx-auto">
            Everything you need to discover talent, compete globally, and win big.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 mb-6">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                {item.title}
              </h3>

              <p className="text-blue-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;

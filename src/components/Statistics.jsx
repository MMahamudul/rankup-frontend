import { FaUsers, FaTrophy, FaGlobe, FaDollarSign } from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers size={36} />,
    value: "10K+",
    label: "Participants",
  },
  {
    icon: <FaTrophy size={36} />,
    value: "500+",
    label: "Contests Hosted",
  },
  {
    icon: <FaDollarSign size={36} />,
    value: "$1M+",
    label: "Rewards Distributed",
  },
  {
    icon: <FaGlobe size={36} />,
    value: "120+",
    label: "Countries",
  },
];

const Statistics = () => {
  return (
    <section className="py-20 bg-linear-to-r from-blue-300 to-blue-500 text-blue-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          Platform Statistics
        </h2>
        <p className="text-blue-900 mb-16 max-w-2xl mx-auto">
          Join thousands of participants worldwide and see why our contests are loved globally.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center shadow hover:shadow-lg transition duration-300"
            >
              <div className="text-blue-950 mb-4">{stat.icon}</div>
              <h3 className="text-3xl text-blue-600 md:text-4xl font-extrabold mb-2">
                {stat.value}
              </h3>
              <p className="text-blue-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;

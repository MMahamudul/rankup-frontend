import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaRocket, FaUsers, FaDollarSign, FaArrowRight } from "react-icons/fa";
import { GiTargetShot, GiTrophyCup } from "react-icons/gi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import WinnerCard from "./WinnerCard";
import { Link } from "react-router";

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const WinnerAdSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["winnerHighlights"],
    queryFn: async () => {
      const res = await axiosSecure.get("/winners/highlights");
      return res.data;
    },
  });

  if (isLoading || !data) return null;

  const { recentWinners = [], stats = {} } = data;

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-purple-900 to-purple-600 py-20 text-white mt-6 -mb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Our Winners Are Making It Big
            </h2>
            <FaRocket className="text-yellow-400 text-3xl md:text-4xl" />
          </div>

          <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
            Real people. Real skills. Real rewards. Compete in contests and turn
            your talent into success.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
        >
          <StatCard
            icon={<FaUsers />}
            label="Total Winners"
            value={stats.totalWinners}
          />
          <StatCard
            icon={<FaDollarSign />}
            label="Prize Money Won"
            value={`$${stats.totalPrize}`}
          />
          <StatCard
            icon={<GiTargetShot />}
            label="Active Contests"
            value="50+"
          />
        </motion.div>

        {/* Winners Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {recentWinners.map((contest, index) => (
            <WinnerCard key={contest._id} contest={contest} index={index} />
          ))}
        </motion.div>

        {/* CTA (Enhanced) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-20 text-center"
        >
          {/* Floating Icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur shadow-lg"
          >
            <GiTrophyCup className="text-2xl text-yellow-300" />
          </motion.div>

          <h3 className="text-2xl md:text-3xl font-extrabold">
            Your winning story could be written next
          </h3>

          <p className="mt-3 text-blue-100 max-w-xl mx-auto">
            Join exciting contests, showcase your skills, and turn your passion
            into real rewards.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-900 shadow-lg hover:bg-blue-50 transition"
          >
            <Link to="all-contests">Explore Contests</Link>
            <FaArrowRight />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="rounded-2xl bg-white/10 backdrop-blur p-6 text-center shadow-lg">
    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-xl text-white">
      {icon}
    </div>
    <p className="text-3xl font-extrabold">{value}</p>
    <p className="text-sm text-blue-100 mt-1">{label}</p>
  </div>
);

export default WinnerAdSection;

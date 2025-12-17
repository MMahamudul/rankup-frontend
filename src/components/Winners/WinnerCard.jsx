import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const WinnerCard = ({ contest, index }) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6, scale: 1.03 }}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-black/5 transition-all"
    >
      {/* Contest Banner */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={contest.image}
          alt={contest.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Trophy Icon */}
        <div className="absolute top-3 right-3 rounded-full bg-yellow-400 p-2 text-white shadow-lg">
          <FaTrophy />
        </div>
      </div>

      {/* Card Body */}
      <div className="relative px-6 pb-6 pt-10 text-center">
        {/* Winner Avatar */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-full bg-white p-1.5 shadow-lg">
            <img
              src={contest?.winner?.image}
              alt={contest?.winner?.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
        </div>

        <h3 className="mt-2 text-base font-bold text-gray-900">
          {contest?.winner?.name}
        </h3>

        <p className="text-sm text-gray-500">{contest.name}</p>

        <p className="mt-3 inline-block rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
          Won ${contest.prize}
        </p>
      </div>
    </motion.div>
  );
};

export default WinnerCard;


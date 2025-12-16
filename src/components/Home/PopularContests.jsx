import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PopularContestCard from "./PopularContestCard";


const PopularContests = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: contests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popularContests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-contests");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-16 text-center text-gray-500">
        Loading popular contests...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-16 text-center text-red-500">
        Failed to load popular contests
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Popular Contests
          </h2>
          <p className="text-gray-500 mt-1">
            Most participated contests right now
          </p>
        </div>

        <button
          onClick={() => navigate("/all-contests")}
          className="hidden sm:block px-5 py-2 rounded-lg border font-semibold hover:bg-gray-50 transition"
        >
          View All →
        </button>
      </div>

      {/* CONTEST GRID */}
      {contests.length === 0 ? (
        <p className="text-gray-500">No contests available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contests.map((contest) => (
            <PopularContestCard
              key={contest._id}
              contest={contest}
            />
          ))}
        </div>
      )}

      {/* MOBILE VIEW ALL */}
      <div className="mt-10 text-center sm:hidden">
        <button
          onClick={() => navigate("/all-contests")}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          View All Contests
        </button>
      </div>
    </section>
  );
};

export default PopularContests;

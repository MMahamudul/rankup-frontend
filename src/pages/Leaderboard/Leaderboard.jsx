// pages/Leaderboard.jsx
import { useQuery } from "@tanstack/react-query";
import { FaTrophy } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Leaderboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/leaderboard");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-20">Loading leaderboard...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-1">
      <h1 className="md:text-4xl text-center text-blue-900 text-3xl font-bold">
        Leaderboard
      </h1>
      <p className="mt-3 text-center text-gray-600">
        Top performers ranked by contest wins
      </p>

      <div className="mt-12 space-y-4">
        {data.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center justify-between bg-white rounded-xl p-4 shadow"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-blue-600">
                #{index + 1}
              </span>
              <img
                src={user.image}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">
                  {user.wins} wins · ${user.totalPrize}
                </p>
              </div>
            </div>

            <FaTrophy
              className={`text-2xl ${
                index === 0 ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;

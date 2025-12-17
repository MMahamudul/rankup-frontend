import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PopularContestCard from "./PopularContestCard";
import Container from "../Shared/Container";


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
    <Container>
        <section className=" mx-auto py-16">
      {/* HEADER */}
      <div className="flex items-center justify-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-blue-900 text-center">
            Popular Contests
          </h2>
          <p className="text-sm my-2  text-blue-800 text-center">Where the competition is fierce and the rewards are real.Join the competitions with the highest participation and excitement.</p>
          
        </div>

        
      </div>

      {/* CONTEST GRID */}
      {contests.length === 0 ? (
        <p className="text-gray-500">No contests available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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
    <div className="flex justify-between">
        <button
          onClick={() => navigate("/all-contests")}
          className="hidden sm:block px-5 py-2 rounded-lg border font-semibold hover:bg-gray-50 transition"
        >
          View All 
        </button>
    </div>
    </Container>
  );
};

export default PopularContests;

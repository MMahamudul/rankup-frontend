import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Card from "./Card";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CONTEST_TYPES = [
  "All",
  "Photography",
  "Image Design",
  "Article Writing",
  "Coding",
  "Gaming",
  "Business",
];

const Contests = () => {
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState("All");

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/all-contests`
      );
      return res.data;
    },
  });

  //  FILTER LOGIC
  const filteredContests =
    activeTab === "All"
      ? contests
      : contests.filter(
          (contest) =>
            contest.category?.toLowerCase() === activeTab.toLowerCase()
        );

  if (isLoading) {
    return <p className="text-center py-20 text-gray-500">Loading contests...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto py-1">
      {/* TITLE */}
      <h1 className="text-blue-900 text-3xl font-bold text-center mb-4">
        All Contests
      </h1>

      {/* TABS */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {CONTEST_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition
              ${
                activeTab === type
                  ? "bg-blue-600 text-white shadow"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* GRID */}
      {filteredContests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredContests.map((contest) => (
            <Card key={contest._id} contest={contest} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-16">
          No contests found for <span className="font-semibold">{activeTab}</span>
        </p>
      )}
    </section>
  );
};

export default Contests;

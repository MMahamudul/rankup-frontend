import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PopularContestCard from "../../components/Home/PopularContestCard";


const SearchResults = () => {
  const axiosSecure = useAxiosSecure();
  const [params] = useSearchParams();
  const query = params.get("query") || "";

  const { data: contests = [], isLoading, isError } = useQuery({
    queryKey: ["searchContests", query],
    enabled: !!query.trim(),
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests/search?q=${encodeURIComponent(query)}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="p-6">Searching contests...</p>;
  if (isError) return <p className="p-6 text-red-500">Search failed.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">
        Search results for: <span className="text-blue-700">{query}</span>
      </h2>

      {contests.length === 0 ? (
        <p className="text-gray-500">No contests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {contests.map((contest) => (
  <PopularContestCard key={contest._id} contest={contest} />
))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

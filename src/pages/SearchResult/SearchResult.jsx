import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Home/Card";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const SearchResults = () => {
const axiosSecure = useAxiosSecure();
  const [params] = useSearchParams();
  const query = params.get("query");

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["searchContests", query],
    enabled: !!query,
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/contests/search?q=${query}`
      );
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Search results for: <span className="text-blue-700">{query}</span>
      </h2>

      {isLoading ? (
        <p className="text-gray-500">Searching contests...</p>
      ) : contests.length === 0 ? (
        <p className="text-gray-500">No contests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contests.map((contest) => (
            <Card key={contest._id} contest={contest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

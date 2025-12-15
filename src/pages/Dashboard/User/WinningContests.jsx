import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";


const WinningContests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: wins = [], isLoading, isError, error } = useQuery({
    queryKey: ["myWinningContests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-winning-contests");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed: {error?.response?.data?.message || error?.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">🏆 My Winning Contests</h2>
        <span className="text-sm text-gray-500">{wins.length} wins</span>
      </div>

      {wins.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center text-gray-500">
          No wins yet — keep participating! 
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wins.map((c) => (
            <div
              key={c._id}
              className="rounded-2xl border bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              <div className="h-36 w-full overflow-hidden">
                <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
              </div>

              <div className="p-5 space-y-2">
                <p className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-full w-fit">
                  Winner Declared 
                </p>

                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {c.name}
                </h3>

                <p className="text-sm text-gray-600">
                  Prize: <span className="font-semibold text-green-700">${c.prize}</span>
                </p>

                <div className="flex items-center gap-3 pt-2 border-t mt-3">
                  <img
                    src={c.winner?.image}
                    alt={c.winner?.name}
                    className="h-10 w-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{c.winner?.name}</p>
                    <p className="text-xs text-gray-500">You won this contest </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WinningContests;

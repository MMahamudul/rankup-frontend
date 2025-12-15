import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { IoIosPeople } from "react-icons/io";

const PopularContests = () => {
  const axiosSecure = useAxiosSecure(); 
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: contests = [], isLoading, isError } = useQuery({
    queryKey: ["popularContests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-contests");
      return res.data;
    },
  });

  const goDetails = (id) => {
    if (!user?.email) {
      navigate("/login", { replace: true });
      return;
    }
    navigate(`/contest/${id}`);
  };

  if (isLoading) return <div className="py-10 text-center text-gray-500">Loading popular contests...</div>;
  if (isError) return <div className="py-10 text-center text-red-500">Failed to load popular contests.</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular Contests</h2>
          <p className="text-sm text-gray-500 mt-1">
            Top contests by participation — join the crowd and compete.
          </p>
        </div>

        <button
          onClick={() => navigate("/all-contests")}
          className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50 text-sm font-semibold"
        >
          Show All →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {contests.map((c) => (
          <div
            key={c._id}
            className="group rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="relative h-36 overflow-hidden">
              <img
                src={c.image}
                alt={c.name}
                className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />

              {/* Participants badge */}
              <span className="absolute bottom-1 right-1 text-xs font-semibold bg-white/90 text-gray-900 px-2.5 py-1 rounded-full flex gap-1 items-center">
                <IoIosPeople size={20} /> {c.participant || 0}
              </span>

              {/* Category badge */}
              <span className="absolute top-3 left-3 text-xs font-semibold bg-blue-600 text-white px-2.5 py-1 rounded-full">
                {c.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 text-base line-clamp-1">
                {c.name}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {c.description
                  ? c.description.length > 70
                    ? c.description.slice(0, 70) + "..."
                    : c.description
                  : "No description available."}
              </p>

              <button
                onClick={() => goDetails(c._id)}
                className="mt-4 w-full rounded-xl bg-blue-700 text-white py-2 text-sm font-semibold hover:bg-blue-800 transition"
              >
                Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularContests;

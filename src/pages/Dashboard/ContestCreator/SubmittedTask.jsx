import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const SubmittedTasks = () => {
  const { contestId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: submissions = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["creatorSubmissions", contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/creator/submissions?contestId=${contestId}`);
      return res.data;
    },
  });

  const { mutateAsync: declareWinner, isPending } = useMutation({
    mutationFn: async (winner) => {
      return axiosSecure.patch(`/contests/${contestId}/declare-winner`, winner);
    },
    onSuccess: () => {
      toast.success("Winner declared!");
      refetch();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to declare winner");
    },
  });

  if (isLoading) return <div className="p-6">Loading submissions...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load submissions</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Submissions</h2>

      {submissions.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
          <table className="min-w-full">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-sm uppercase text-gray-600">
                <th className="px-5 py-3">Participant</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Text</th>
                <th className="px-5 py-3">Link</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s._id} className="border-b text-sm">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.contestantPhoto || "https://i.ibb.co/2yW4J9Q/user.png"}
                        alt={s.contestantName}
                        className="h-9 w-9 rounded-full object-cover border"
                      />
                      <span className="font-medium text-gray-900">{s.contestantName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-700">{s.contestantEmail}</td>
                  <td className="px-5 py-4 text-gray-700">
                    <div className="max-w-[320px] line-clamp-2">{s.text || "—"}</div>
                  </td>
                  <td className="px-5 py-4">
                    {s.link ? (
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Open Link
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      disabled={isPending}
                      onClick={() =>
                        declareWinner({
                          name: s.contestantName,
                          image: s.contestantPhoto,
                          email: s.contestantEmail,
                        })
                      }
                      className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 hover:bg-green-200 disabled:opacity-60"
                    >
                      Declare Winner
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

         
        </div>
      )}
    </div>
  );
};

export default SubmittedTasks;

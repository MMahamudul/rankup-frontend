import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "./../../../components/Shared/Loading";
import useAuth from "./../../../hooks/useAuth";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import UserDataRow from "./../../../components/TableRows/UserDataRow";

const PAGE_SIZE = 10;

const ManageUsers = () => {
  const { user: authUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["users", authUser?.email, page],
    enabled: !!authUser?.email,
    keepPreviousData: true,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${page}&limit=${PAGE_SIZE}`);
      return res.data;
    },
  });

  // backend returns: { users, total, page, limit, totalPages }
  const users = useMemo(() => data?.users ?? [], [data]);
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const goPrev = () => canPrev && setPage((p) => p - 1);
  const goNext = () => canNext && setPage((p) => p + 1);

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load users: {error?.response?.data?.message || error?.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Manage Users</h2>
            <p className="text-sm text-gray-500">
              Showing {users.length} of {total} users 
            </p>
          </div>

          {/* Loading indicator while paging */}
          {isFetching && (
            <span className="text-sm text-gray-500">Updating...</span>
          )}
        </div>

        {/* Table */}
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden bg-white">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Email
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Role
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <UserDataRow key={u?._id} user={u} refetch={refetch} />
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <p className="p-4 text-sm text-gray-500">No users found.</p>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-600">
              Page <span className="font-semibold">{page}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                disabled={!canPrev}
                className="px-4 py-2 rounded-lg border bg-white text-sm font-semibold
                           hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              {/* Page numbers (nice + simple) */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).slice(0, 7).map((_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`h-9 w-9 rounded-lg text-sm font-semibold border
                        ${p === page ? "bg-blue-700 text-white border-blue-700" : "bg-white hover:bg-gray-50"}
                      `}
                    >
                      {p}
                    </button>
                  );
                })}
                {totalPages > 7 && (
                  <span className="px-2 text-gray-500">…</span>
                )}
              </div>

              <button
                onClick={goNext}
                disabled={!canNext}
                className="px-4 py-2 rounded-lg border bg-white text-sm font-semibold
                           hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next 
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;

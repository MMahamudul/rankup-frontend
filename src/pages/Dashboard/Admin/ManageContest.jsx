import { useQuery } from '@tanstack/react-query';
import ContestRequestRow from '../../../components/TableRows/ContestRequestRow';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const ManageContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: requests = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['manage-contest', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure('/manage-contest');
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-gray-600">Loading contest requests...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-red-500">
          Failed to load contest requests: {error?.message || 'Something went wrong.'}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Contest Approval Requests
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Review creators and approve their contest submissions.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-semibold text-gray-700">
              Pending Requests
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white border-b border-gray-200 text-gray-500 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white border-b border-gray-200 text-gray-500 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-5 py-6 text-center text-gray-500 text-sm"
                    >
                      No contest approval requests found.
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <ContestRequestRow
                      key={req._id}
                      req={req}
                      refetch={refetch}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageContest;

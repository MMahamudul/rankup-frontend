import ContestDataRow from "../../../components/TableRows/ContestDataRow"
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const HandleContests = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth();

  const {
    data: programs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['programs', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/handle-contests/${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-gray-600">Loading your contests...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-red-500">Failed to load contests.</p>
      </div>
    );
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Image
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Name
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Category
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Price
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Quantity
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Delete
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {programs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-6 text-center text-gray-500 text-sm"
                      >
                        You have no contest yet.
                      </td>
                    </tr>
                  ) : (
                    programs.map((program) => (
                      <ContestDataRow
                        key={program._id}
                        program={program}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HandleContests;

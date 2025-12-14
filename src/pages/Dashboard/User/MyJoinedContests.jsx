
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UserOrderDataRow from '../../../components/TableRows/UserOrderDataRow';

const MyJoinedContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['orders', user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(
        '/my-joined-contests'
      );
      return res.data; 
    },
  });
console.log(orders)
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
        <p className="text-red-500">
          Failed to load your contests: {error?.message || 'Something went wrong.'}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Image
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Name
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Category
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Price
                  </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Deadline
                    </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-6 text-center text-gray-500 text-sm"
                    >
                      You have no contest orders yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <UserOrderDataRow
                      key={order._id}
                      order={order}
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

export default MyJoinedContests;

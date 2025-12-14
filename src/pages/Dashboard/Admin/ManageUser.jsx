import { useQuery } from '@tanstack/react-query'
import Loading from './../../../components/Shared/Loading'
import useAuth from './../../../hooks/useAuth'
import useAxiosSecure from './../../../hooks/useAxiosSecure'
import UserDataRow from './../../../components/TableRows/UserDataRow'

const ManageUsers = () => {
  const { user: authUser } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['users', authUser?.email],
    enabled: !!authUser?.email, 
    queryFn: async () => {
      const result = await axiosSecure.get('/users') 
      return result.data
    },
  })

  
  const users = Array.isArray(data) ? data : data?.users ?? []

  console.log('users:', users)

  if (isLoading) return <Loading />

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-8'>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                  >
                    Email
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                  >
                    Role
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <UserDataRow
                    key={u?._id}
                    user={u}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <p className='p-4 text-sm text-gray-500'>No users found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers

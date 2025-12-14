import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetch }) => {
  const axiosSecure = useAxiosSecure()
  const [updatedRole, setUpdatedRole] = useState('user')

  useEffect(() => {
    setUpdatedRole(user?.role || 'user')
  }, [user])

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch('/update-role', {
        email: user?.email,
        role: updatedRole,
      })
      toast.success('Role Updated!')
      refetch?.()
      closeModal()
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message || err?.message || 'Something went wrong')
    }
  }

  return (
    <Dialog open={isOpen} as='div' className='relative z-10 focus:outline-none' onClose={closeModal}>
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel className='w-full max-w-md rounded-xl bg-white p-6 shadow-xl'>
            <DialogTitle as='h3' className='text-base font-medium text-black'>
              Update User Role
            </DialogTitle>

            <form>
              <div>
                <select
                  value={updatedRole}
                  onChange={(e) => setUpdatedRole(e.target.value)}
                  className='w-full my-3 border border-gray-200 rounded-xl px-2 py-3'
                  name='role'
                >
                  <option value='user'>User</option>
                  <option value='creator'>Creator</option>
                  <option value='admin'>Admin</option>
                </select>
              </div>

              <div className='flex mt-2 justify-around'>
                <button
                  onClick={handleRoleUpdate}
                  type='button'
                  className='cursor-pointer inline-flex justify-center rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200'
                >
                  Update
                </button>
                <button
                  type='button'
                  className='cursor-pointer inline-flex justify-center rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200'
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default UpdateUserRoleModal

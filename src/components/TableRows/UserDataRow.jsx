import { useState } from 'react'
import UpdateUserRoleModal from './../Modals/UpdateUserRoleModal'

const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  
  const email = typeof user?.email === 'string' ? user.email : ''
  const role = typeof user?.role === 'string' ? user.role : ''

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{email}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{role}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          />
          <span className='relative'>Update Role</span>
        </span>

        <UpdateUserRoleModal
          user={user}
          refetch={refetch}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  )
}

export default UserDataRow

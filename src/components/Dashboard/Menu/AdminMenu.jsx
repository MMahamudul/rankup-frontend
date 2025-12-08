import { FaUserCog } from 'react-icons/fa'
import { FaAward } from 'react-icons/fa'

import MenuItem from './MenuItem'


const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaAward}  label='Manage Contest' address='manage-contest' />
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
    </>
  )
}

export default AdminMenu

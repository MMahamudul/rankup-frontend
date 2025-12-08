import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const CreatorMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Contest'
        address='add-contest'
      />
      <MenuItem icon={MdHomeWork} label='My Contest' address='my-contest' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Contest'
        address='manage-contest'
      />
    </>
  )
}

export default CreatorMenu
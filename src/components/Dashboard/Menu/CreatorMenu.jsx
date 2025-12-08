import { FaCrown } from "react-icons/fa";
import { MdAddToPhotos, MdOutlineManageHistory } from "react-icons/md";
import { TbSettingsShare } from "react-icons/tb";

import MenuItem from "./MenuItem";
const CreatorMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdAddToPhotos}
        label="Add Contest"
        address="add-contest"
      />
      <MenuItem 
      icon={FaCrown} 
      label="My Contests" 
      address="my-contest" />
      <MenuItem
        icon={TbSettingsShare}
        label="Manage Contest"
        address="manage-contest"
      />
    </>
  );
};

export default CreatorMenu;

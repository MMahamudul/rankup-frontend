import { FaCrown } from "react-icons/fa";
import { MdAddToPhotos} from "react-icons/md";
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
        icon={TbSettingsShare}
        label="Handle Contests"
        address="handle-contests"
      />
    </>
  );
};

export default CreatorMenu;

import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/logo-l.png";

// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

import UserMenu from "../Menu/UserMenu";
import CreatorMenu from "../Menu/CreatorMenu";
import MenuItem from "../Menu/MenuItem";
import AdminMenu from "../Menu/AdminMenu";
import useRole from "../../../hooks/useRole";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useRole();

  const handleToggle = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Top Bar (only < md) */}
      <div className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" onClick={closeSidebar} className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10 w-auto" />
          </Link>

          <button
            onClick={handleToggle}
            className="p-2 rounded-lg border hover:bg-gray-50"
            aria-label="Toggle sidebar"
          >
            {isOpen ? <IoClose className="h-6 w-6" /> : <AiOutlineBars className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/*  Sidebar */}
      <aside
        className={`
          fixed z-50 md:z-10 top-0 left-0 h-full w-64 bg-gray-100 border-r
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:fixed
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo (desktop only) */}
          <div className="hidden md:flex px-4 py-4 justify-center border-b bg-white">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/*  Menu section (scrollable if long) */}
          <div className="flex-1 overflow-y-auto px-2 py-4">
            <nav className="space-y-1">
              {role === "user" && <UserMenu />}
              {role === "creator" && <CreatorMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>

          {/* Bottom actions */}
          <div className="px-2 pb-4">
            <hr className="my-3 border-gray-300" />

            <MenuItem icon={FcSettings} label="Profile" address="/dashboard/profile" />

            <button
              onClick={logOut}
              className="flex w-full items-center px-4 py-2 mt-3 text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition rounded-lg"
            >
              <GrLogout className="w-5 h-5" />
              <span className="mx-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

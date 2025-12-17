import { Link, NavLink, useNavigate } from "react-router";
import { FaArrowLeft, FaHome, FaTrophy, FaHeadset } from "react-icons/fa";

const DashboardTopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur ">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left: Back + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-white hover:bg-gray-50 text-sm font-semibold"
          >
            <FaArrowLeft /> Back
          </button>

          
        </div>

        {/* Right: Quick navigation */}
        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50"
          >
            <FaHome /> Home
          </NavLink>

          <NavLink
            to="/all-contests"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50"
          >
            <FaTrophy /> Contests
          </NavLink>

          <NavLink
            to="/support"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50"
          >
            <FaHeadset /> Support
          </NavLink>

          {/* Mobile: small menu shortcut */}
          <Link
            to="/"
            className="sm:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border bg-white hover:bg-gray-50"
            aria-label="Go Home"
          >
            <FaHome />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopBar;

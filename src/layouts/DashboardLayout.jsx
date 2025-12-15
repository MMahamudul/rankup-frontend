import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading || roleLoading) return;

    //  Not logged in → kick out of dashboard
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    // Creator/Admin trying to access user-only pages
    if (
      role !== "user" &&
      location.pathname.includes("/dashboard/my-winning-contests")
    ) {
      navigate("/dashboard", { replace: true });
    }

  }, [user, role, loading, roleLoading, location.pathname, navigate]);

  return (
    <div className="relative min-h-screen md:flex bg-white">
      {/* Left Side: Sidebar */}
      <Sidebar />

      {/* Right Side: Content */}
      <div className="flex-1 md:ml-64">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

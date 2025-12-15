import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole"; // your role hook

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) return null; // or a spinner

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  if (role !== "user") return <Navigate to="/dashboard" replace />;

  return children;
};

export default UserRoute;
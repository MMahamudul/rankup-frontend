// src/pages/Dashboard/DashboardHome.jsx
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";


import { FaTrophy, FaUsers, FaPlusCircle, FaClipboardList } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const StatCard = ({ title, value, icon, to }) => {
  const Card = (
    <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-extrabold text-gray-900">{value ?? "—"}</p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-lg">
          {icon}
        </div>
      </div>
    </div>
  );

  return to ? <Link to={to}>{Card}</Link> : Card;
};

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const { user } = useAuth();

  // USER stats (wins + participated)
  const { data: userStats } = useQuery({
    queryKey: ["meStats"],
    enabled: role === "user",
    queryFn: async () => (await axiosSecure.get("/me/stats")).data,
  });

  // CREATOR contests
  const { data: creatorContests = [] } = useQuery({
    queryKey: ["creatorContests", user?.email],
    enabled: role === "creator" && !!user?.email,
    queryFn: async () => (await axiosSecure.get(`/handle-contests/${user.email}`)).data,
  });

  // ADMIN users (total) + pending contests
  const { data: adminUsers = [] } = useQuery({
    queryKey: ["adminUsers"],
    enabled: role === "admin",
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });

  const { data: pendingContests = [] } = useQuery({
    queryKey: ["pendingContests"],
    enabled: role === "admin",
    queryFn: async () => (await axiosSecure.get("/manage-contest")).data,
  });

  // Welcome text by role
  const welcomeText =
    role === "admin"
      ? "Review contests, manage users, and keep the platform healthy."
      : role === "creator"
      ? "Create contests, track submissions, and celebrate winners."
      : "Join contests, submit your work, and track your wins.";

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="rounded-3xl overflow-hidden border bg-linear-to-r from-blue-900 via-indigo-800 to-purple-900 text-white">
        <div className="p-6 md:p-10">
          <p className="text-sm text-white/80">Welcome back</p>
          <h1 className="mt-1 text-2xl md:text-3xl font-extrabold">
            {user?.displayName || "Dashboard"}
          </h1>
          <p className="mt-3 max-w-2xl text-white/85">{welcomeText}</p>

          {/* quick actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            {role === "creator" && (
              <Link
                to="/dashboard/add-contest"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/20"
              >
                <FaPlusCircle /> Create Contest
              </Link>
            )}
            {role === "user" && (
              <Link
                to="/my-joined-contests"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/20"
              >
                <FaClipboardList /> My Joined Contests
              </Link>
            )}
            {role === "admin" && (
              <Link
                to="/dashboard/manage-users"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/20"
              >
                <FaUsers /> Manage Users
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {role === "user" && (
          <>
            <StatCard title="Participated" value={userStats?.participated} icon={<FaUsers />} />
            <StatCard title="Won" value={userStats?.won} icon={<FaTrophy />} to="/dashboard/winning-contests" />
            <StatCard title="Win %" value={`${userStats?.winPercentage ?? 0}%`} icon={<FaTrophy />} />
            <StatCard title="Profile" value="Update" icon={<FaClipboardList />} to="/dashboard/profile" />
          </>
        )}

        {role === "creator" && (
          <>
            <StatCard title="My Contests" value={creatorContests.length} icon={<FaClipboardList />} to="/dashboard/my-contests" />
            <StatCard
              title="Pending"
              value={creatorContests.filter((c) => c.status === "pending").length}
              icon={<FaClipboardList />}
            />
            <StatCard
              title="Approved"
              value={creatorContests.filter((c) => c.status === "approved").length}
              icon={<FaClipboardList />}
            />
            <StatCard title="Create New" value="Contest" icon={<FaPlusCircle />} to="/dashboard/add-contest" />
          </>
        )}

        {role === "admin" && (
          <>
            <StatCard title="Users" value={adminUsers.length} icon={<FaUsers />} to="/dashboard/manage-users" />
            <StatCard title="Pending Contests" value={pendingContests.length} icon={<FaClipboardList />} to="/dashboard/manage-contest" />
            <StatCard title="Platform" value="Active" icon={<FaTrophy />} />
            <StatCard title="Profile" value="Settings" icon={<FaClipboardList />} to="/dashboard/profile" />
          </>
        )}
      </div>

      {/* Optional: role tips */}
      <div className="rounded-2xl border bg-white p-5 text-sm text-gray-600">
        <span className="font-semibold text-gray-900">Tip:</span>{" "}
        {role === "creator"
          ? "After deadline, open Submissions → Declare Winner to highlight winners."
          : role === "admin"
          ? "Approve quality contests quickly to keep engagement high."
          : "Participate more to boost your win percentage and rank on the leaderboard."}
      </div>
    </div>
  );
};

export default DashboardHome;

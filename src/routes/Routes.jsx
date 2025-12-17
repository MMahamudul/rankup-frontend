import { createBrowserRouter } from "react-router";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import CreatorRoute from "./CreatorRoute";
import UserRoute from "./UserRoute";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ErrorPage from "../pages/ErrorPage";
import AllContest from "../pages/AllContest/AllContests";
import ContestDetails from "../components/ContestDetails/ContestDetails";
import SearchResults from "../pages/SearchResult/SearchResult";
import Support from "../pages/Support/Support";
import Membership from "../pages/Membership/Membership";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";

// Dashboard Common
import Profile from "../components/Shared/Common/Profile";
import DashboardHome from "../components/Dashboard/DashboardHome/DashboardHome";

// Admin
import ManageUsers from "../pages/Dashboard/Admin/ManageUser";
import ManageContest from "../pages/Dashboard/Admin/ManageContest";

// Creator
import AddContest from "../pages/Dashboard/ContestCreator/AddContest";
import HandleContests from "../pages/Dashboard/ContestCreator/HandleContest";
import SubmittedTasks from "../pages/Dashboard/ContestCreator/SubmittedTask";

// User
import MyJoinedContests from "../pages/Dashboard/User/MyJoinedContests";
import WinningContests from "../pages/Dashboard/User/WinningContests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />, 
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <SearchResults /> },
      { path: "all-contests", element: <AllContest /> },
      {
        path: "contest/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        ),
      },
      { path: "support", element: <Support /> },
      { path: "membership", element: <Membership /> },
      { path: "leaderboard", element: <Leaderboard /> },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },

      //  add this for wrong URLs like /asdf
      { path: "*", element: <ErrorPage /> },
    ],
  },

  // Auth
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },

  //  catch wrong URLs under /login/xxx or /signup/xxx etc.
  { path: "*", element: <ErrorPage /> },

  // Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },

      { path: "manage-users", element: <AdminRoute><ManageUsers /></AdminRoute> },
      { path: "manage-contest", element: <AdminRoute><ManageContest /></AdminRoute> },

      { path: "handle-contests", element: <CreatorRoute><HandleContests /></CreatorRoute> },
      { path: "add-contest", element: <CreatorRoute><AddContest /></CreatorRoute> },
      { path: "submissions/:contestId", element: <CreatorRoute><SubmittedTasks /></CreatorRoute> },

      { path: "my-joined-contests", element: <UserRoute><MyJoinedContests /></UserRoute> },
      { path: "winning-contest", element: <UserRoute><WinningContests /></UserRoute> },

      { path: "profile", element: <Profile /> },

      // dashboard wrong url fallback
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

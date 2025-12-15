import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import Login from "./../pages/Login/Login";
import SignUp from "./../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import AddContest from "../pages/Dashboard/ContestCreator/AddContest";
import Profile from "../components/Shared/Common/Profile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUser";
import ManageContest from "../pages/Dashboard/Admin/ManageContest";
import AllContest from "../pages/AllContest/AllContests";
import ContestDetails from "../components/ContestDetails/ContestDetails";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import HandleContests from "../pages/Dashboard/ContestCreator/HandleContest";
import AdminRoute from "./AdminRoute";
import CreatorRoute from "./CreatorRoute";
import MyJoinedContests from "../pages/Dashboard/User/MyJoinedContests";
import ErrorPage from "../pages/ErrorPage";
import SubmittedTasks from "../pages/Dashboard/ContestCreator/SubmittedTask";
import WinningContests from "../pages/Dashboard/User/WinningContests";
import UserRoute from "./UserRoute";
import SearchResults from "../pages/SearchResult/SearchResult";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
      {
        path: "/all-contests",
        element: <AllContest />,
      },
      {
        path: "/contest/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      // Admin Dashboard Routes
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-contest",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageContest></ManageContest>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      //Creator Dashboard Routes
      {
        path: "handle-contests",
        element: (
          <PrivateRoute>
            <CreatorRoute>
              <HandleContests></HandleContests>
            </CreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-contest",
        element: (
          <PrivateRoute>
            <CreatorRoute>
              <AddContest></AddContest>
            </CreatorRoute>
          </PrivateRoute>
        ),
      },
      //User Dashboard Routes
      {
        path: "my-joined-contests",
        element: (
          <PrivateRoute>
            <MyJoinedContests />
          </PrivateRoute>
        ),
      },
      {
        path: "winning-contest",
        element: (
          <PrivateRoute>
            <UserRoute>
              <WinningContests />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "submissions/:contestId",
        element: (
          <PrivateRoute>
            <SubmittedTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },

      {},
    ],
  },
]);

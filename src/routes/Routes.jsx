import { createBrowserRouter } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import ErrorPage from '../pages/ErrorPage'
import PrivateRoute from './PrivateRoute';
import Login from './../pages/Login/Login';
import SignUp from './../pages/SignUp/SignUp';
import Home from '../pages/Home/Home';
import DashboardLayout from '../layouts/DashboardLayout';
import AddContest from '../pages/Dashboard/ContestCreator/AddContest';
import MyContest from '../pages/Dashboard/User/MyContest';
import Profile from '../components/Shared/Common/Profile';
import ManageUsers from '../pages/Dashboard/Admin/ManageUser';
import ManageContest from '../pages/Dashboard/Admin/ManageContest';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/contest',
        element: <Home />,
      },
     
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
       <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            
          </PrivateRoute>
        ),
      },
      {
        path: 'add-contest',
        element: (
          <PrivateRoute>
            <AddContest></AddContest>
            
          </PrivateRoute>
        ),
      },
      {
        path: 'my-contest',
        element: (
          <PrivateRoute>
            <MyContest></MyContest>
            
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-contest',
        element: (
          <PrivateRoute>
            <ManageContest></ManageContest>
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    
      {
       
      },
    ],
  },
])

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './page/Home/Home';
import Login from './page/Auth/Login/Login';
import Signup from './page/Auth/Signup/Signup';
import Jobs from './page/Jobs/Jobs';
import Browse from './components/Browse/Browse';
import Profile from './page/Profile/Profile';
import JobDescription from './page/JobDescription/JobDescription';
import Companies from './page/RecruiterPage/Companies/Companies'
import CreateCompany from './page/RecruiterPage/CreateCompany/CreateCompany';
import CompanySetup from './page/RecruiterPage/CompanySetup/CompanySetup';
import RecruiterJobs from './page/RecruiterPage/RecruiterJobs/RecruiterJobs';
import PostJobs from './page/RecruiterPage/PostJobs/PostJobs';
import Applicants from './page/RecruiterPage/Applicants/Applicants';
import ProtectedRoute from './page/RecruiterPage/ProtectedRoute/ProtectedRoute';
import ForgotPassword from './page/Auth/ForgotPassword/ForgotPassword';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path: '/auth/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/job/:id',
    element:<JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },

  {
    path: '/profile',
    element: <Profile />
  },

  {
    path: '/auth/forgotpassword',
    element: <ForgotPassword />
  },

  // Recruiter routes
  {
    path: '/recruiter/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },

  {
    path: '/recruiter/company/create',
    element: <ProtectedRoute><CreateCompany /></ProtectedRoute>
  },

  {
    path: '/recruiter/company/:id',
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },

  {
    path: '/recruiter/jobs',
    element: <ProtectedRoute><RecruiterJobs /></ProtectedRoute>
  },

  {
    path: '/recruiter/job/create',
    element: <ProtectedRoute><PostJobs /></ProtectedRoute>
  },

  {
    path: '/recruiter/job/:id/applicants',
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  }

])
function App() {


  return (
    <>
      <RouterProvider router= {appRouter} />
    </>
  )
}

export default App

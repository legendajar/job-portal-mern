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

  // admin routes
  {
    path: '/recruiter/companies',
    element: <Companies />
  },

  {
    path: '/recruiter/company/create',
    element: <CreateCompany />
  },

  {
    path: '/recruiter/company/:id',
    element: <CompanySetup />
  },

  {
    path: '/recruiter/jobs',
    element: <RecruiterJobs />
  },

  {
    path: '/recruiter/job/create',
    element: <PostJobs />
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

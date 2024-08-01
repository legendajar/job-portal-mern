import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './page/Home/Home';
import Login from './page/Auth/Login/Login';
import Signup from './page/Auth/Signup/Signup';
import Jobs from './page/Jobs/Jobs';
import Browse from './components/Browse/Browse';
import Profile from './page/Profile/Profile';
import JobDescription from './page/JobDescription/JobDescription';

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

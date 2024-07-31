import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './page/Home/Home';
import Login from './page/Auth/Login/Login';
import Signup from './page/Auth/Signup/Signup';
import Jobs from './page/Jobs/Jobs';

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
    path: '/',
    element: <Home />
  },
])
function App() {


  return (
    <>
      <RouterProvider router= {appRouter} />
    </>
  )
}

export default App

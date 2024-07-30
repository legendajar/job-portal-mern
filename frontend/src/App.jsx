import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/page/Home/Home';
import Login from './components/page/Auth/Login/Login';
import Signup from './components/page/Auth/Signup/Signup';

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
    path: '/',
    element: <Home />
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

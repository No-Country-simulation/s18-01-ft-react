import { useRoutes } from 'react-router-dom';
import Office from '../views/Office/Office';
import Home from '@/views/Home/Home';
import NotFound from '@/views/NotFound/NotFound';
import { UserSignupPage } from '@/views/UserSignup/UserSignupPage';
import { UserSigninPage } from '@/views/UserSignin/UserSigninPage';

const AppRouter = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/office',
      element: <Office />,
    },
    {
      path: '/signup',
      element: <UserSignupPage />,
    },
    {
      path: '/signin',
      element: <UserSigninPage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default AppRouter;

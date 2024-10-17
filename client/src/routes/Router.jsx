import { useRoutes } from 'react-router-dom';
import Office from '../views/Office/Office';
import Home from '@/views/Home/Home';
import NotFound from '@/views/NotFound/NotFound';
import { UserSignupPage } from '@/views/UserSignup/UserSignupPage';
import { UserSigninPage } from '@/views/UserSignin/UserSigninPage';
import { UserWelcomePage } from '@/views/welcome/UserWelcomePage';

const AppRouter = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/office/:roomName',
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
      path: '/welcome',
      element: <UserWelcomePage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default AppRouter;

import { useRoutes } from 'react-router-dom';
import Office from '../views/Office/Office';
import Home from '@/views/Home/Home';
import NotFound from '@/views/NotFound/NotFound';
import { UserSignupPage } from '@/views/UserSignup/UserSignupPage';
import { UserSigninPage } from '@/views/UserSignin/UserSigninPage';
import { UserWelcomePage } from '@/views/UserWelcome/UserWelcomePage';
import { EnterpriseSignup } from '@/views/EnterpriseSignup/EnterpriseSignup';
import { EnterpriseSignin } from '@/views/EnterpriseSignin/EnterpriseSignin';
import { Navigate, Outlet } from 'react-router-dom';

const AppRouter = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/office',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate to="/" />,
        },
        {
          path: ':roomName',
          element: <Office />,
        },
      ],
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
      path: '/enterprise-signup',
      element: <EnterpriseSignup />,
    },
    {
      path: '/enterprise-signin',
      element: <EnterpriseSignin />,
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

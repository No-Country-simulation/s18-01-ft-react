import { useRoutes } from 'react-router-dom';
import Office from '../views/Office/Office';
import Home from '@/views/Home/Home';
import NotFound from '@/views/NotFound/NotFound';
import { UserSignupPage } from '@/views/UserSignup/UserSignupPage';
import { UserSigninPage } from '@/views/UserSignin/UserSigninPage';
import { UserWelcomePage } from '@/views/UserWelcome/UserWelcomePage';
import { EnterpriseSignup } from '@/views/EnterpriseSignup/EnterpriseSignup';
import { EnterpriseSignin } from '@/views/EnterpriseSignin/EnterpriseSignin';
import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { OnlyNoAuth } from './OnlyNoAuth';

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
          element: (
            <ProtectedRoute>
              <Office />
            </ProtectedRoute>
          ),
        },
        {
          path: ':roomId',
          element: <Office />,
        },
      ],
    },
    {
      path: '/signup',
      element: (
        <OnlyNoAuth>
          <UserSignupPage />
        </OnlyNoAuth>
      ),
    },
    {
      path: '/signin',
      element: (
        <OnlyNoAuth>
          <UserSigninPage />
        </OnlyNoAuth>
      ),
    },
    {
      path: '/enterprise-signup',
      element: (
        <OnlyNoAuth>
          <EnterpriseSignup />
        </OnlyNoAuth>
      ),
    },
    {
      path: '/enterprise-signin',
      element: (
        <OnlyNoAuth>
          <EnterpriseSignin />
        </OnlyNoAuth>
      ),
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

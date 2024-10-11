import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Home, NotFound, Room } from '../views';
import { EnterpriseSignup } from '@/views/EnterpriseSignup/EnterpriseSignup';
import { EnterpriseSignin } from '@/views/EnterpriseSignin/EnterpriseSignin';

const AppRouter = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/room',
      element: <Room />,
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
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <Suspense>{routes}</Suspense>;
};

export default AppRouter;

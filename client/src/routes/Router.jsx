import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Home, NotFound, Room } from '../views';
import { EnterpriseSignup } from '@/views/EnterpriseSignup/EnterpriseSignup';

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
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <Suspense>{routes}</Suspense>;
};

export default AppRouter;

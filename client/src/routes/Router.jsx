import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Home, NotFound } from '../views';

const AppRouter = () => {
  const routes = useRoutes([
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <Suspense>{routes}</Suspense>;
};

export default AppRouter;

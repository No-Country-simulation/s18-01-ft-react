import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Home, NotFound, Room } from '../views';

const AppRouter = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/office',
      element: <Room />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export default AppRouter;

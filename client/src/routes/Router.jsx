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
      path: '/room',
      element: <Room />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <Suspense>{routes}</Suspense>;
};

export default AppRouter;

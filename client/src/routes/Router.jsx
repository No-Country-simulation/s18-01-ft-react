import { useRoutes } from 'react-router-dom';
import Office from '../views/Office/Office';
import Home from '../views/Home/Home';
import NotFound from '../views/NotFound/NotFound';

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

  return routes;
};

export default AppRouter;

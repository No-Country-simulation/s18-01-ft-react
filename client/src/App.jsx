import { Suspense } from 'react';
import AppRouter from './routes/Router.jsx';

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AppRouter />
  </Suspense>
);

export default App;

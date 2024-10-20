import { authAtom } from '@/store/authAtom';
import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const auth = useAtomValue(authAtom);
  if (!auth.isAuth) return <Navigate to="/signin" />;

  return children;
};

import { useSetAtom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage = createJSONStorage(() => sessionStorage);

export const authAtom = atomWithStorage(
  'auth',
  {
    isAuth: false,
    user: null,
  },
  storage
);

export const useLogout = () => {
  const setAuth = useSetAtom(authAtom);
  const handleLogout = () => {
    setAuth({
      isAuth: false,
      user: null,
    });
  };
  return handleLogout;
};

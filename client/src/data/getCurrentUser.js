/* eslint-disable react-hooks/rules-of-hooks */
import { authAtom } from '@/store/authAtom';
import { useAtomValue } from 'jotai';

export const getCurrentUser = () => {
  const value = localStorage.getItem('AUTH');
  const parsedValue = value ? JSON.parse(value) : null;
  return parsedValue?.user;
};

export const isNormalUser = user => {
  return user && user.hasOwnProperty('id_emp');
};

export const isEnterpriseUser = user => {
  return user && !user.hasOwnProperty('id_emp');
};

export const getUserProfile = () => {
  const value = localStorage.getItem('AUTH');
  const parsedValue = value ? JSON.parse(value) : null;
  const user = parsedValue?.user;
  return user ? user.profilePicture : '';
};

export const getUserAtomProfile = () => {
  const auth = useAtomValue(authAtom);
  const user = auth?.user;
  return user ? user.profilePicture : '';
};

export const getCurrentUserAtom = () => {
  const auth = useAtomValue(authAtom);
  return auth?.user;
};

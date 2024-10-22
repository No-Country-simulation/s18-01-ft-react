import { useRef } from 'react';
import useSWR from 'swr';
import { getData } from './getData';
import { defaultConfig } from '@/utils/api/swrConfig';

export const useGetUserList = () => {
  //TODO: Cambiar key por el path correcta para la lista de usuarios de la empresa
  const swrKeYRef = useRef('/users/list');

  const { data, mutate, isLoading, isValidating } = useSWR(
    swrKeYRef.current,
    key => getData(key),
    defaultConfig
  );

  const refetch = () => {
    mutate(undefined, {
      revalidate: true,
      optimisticData: data,
    });
  };

  return {
    data: data ? data : [],
    isLoading: isLoading || isValidating,
    refetch,
  };
};

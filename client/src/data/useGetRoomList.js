import { useRef } from 'react';
import useSWR from 'swr';
import { getData } from './getData';
import { defaultConfig } from '@/utils/api/swrConfig';

export const useGetRoomList = () => {
  //TODO: Cambiar por el path que trae todas las salas de una empresa
  const swrKeYRef = useRef('/rooms/allrooms');

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

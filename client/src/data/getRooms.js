import { apiService } from '@/utils/api/axios';

export const getRooms = async () => {
  const [error, data] = await apiService.get('/rooms/allrooms');
  if (error) {
    console.error(error);
    return [];
  }
  return data;
};

import { apiService } from '@/utils/api/axios';
import { validateSchema } from '@/utils/functions/validateSchema';
import { roomSchema } from '@/utils/schemas/roomSchemas';
import Cookies from 'js-cookie';

export const createRoom = async formData => {
  const [error, data] = validateSchema(roomSchema, {
    name: formData.get('roomName'),
    tileset: formData.get('roomPreset'),
  });
  if (error) return error;
  const token = Cookies.get('token');
  console.log({ token });
  const response = await apiService.post('/rooms/create', data);
  console.log({ response });
};

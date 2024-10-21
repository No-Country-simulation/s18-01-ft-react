import { apiService } from '@/utils/api/axios';
import { validateSchema } from '@/utils/functions/validateSchema';
import { roomSchema } from '@/utils/schemas/roomSchemas';

export const createRoom = async formData => {
  const [error, data] = validateSchema(roomSchema, {
    name: formData.get('roomName'),
    tileset: formData.get('roomPreset'),
  });
  if (error) return error;

  const response = await apiService.post('/room/create', data);
};

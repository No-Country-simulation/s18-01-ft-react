import { apiService } from '@/utils/api/axios';
import { validateSchema } from '@/utils/functions/validateSchema';
import { roomSchema } from '@/utils/schemas/roomSchemas';

export const createRoom = async formData => {
  const [error, data] = validateSchema(roomSchema, formData);
  if (error) return error;

  const response = await apiService.post('/room/create', data);
};

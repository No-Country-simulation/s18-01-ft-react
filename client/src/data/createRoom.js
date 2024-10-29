/* eslint-disable react-hooks/rules-of-hooks */
import { roomAtom } from '@/store/roomsAtom';
import { apiService } from '@/utils/api/axios';
import { validateSchema } from '@/utils/functions/validateSchema';
import { roomSchema } from '@/utils/schemas/roomSchemas';
import { useSetAtom } from 'jotai';

export const createRoom = async formData => {
  const setRoom = useSetAtom(roomAtom);
  const [error, data] = validateSchema(roomSchema, {
    name: formData.get('roomName'),
    tileset: formData.get('roomPreset'),
  });
  if (error) return error;
  const [errorApi, success] = await apiService.post('/rooms/create', data);
  if (errorApi) {
    return;
  }
  setRoom({
    id: success.id,
    name: success.name,
    isActive: success.users.length > 0,
    permissions: success.permissions,
  });
};

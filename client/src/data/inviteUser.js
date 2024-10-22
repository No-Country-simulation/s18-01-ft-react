import { apiService } from '@/utils/api/axios';
import { validateSchema } from '@/utils/functions/validateSchema';
import { inviteSchema } from '@/utils/schemas/userSchemas';

export const inviteUser = async formData => {
  const [error, data] = validateSchema(inviteSchema, {
    email: formData.get('email'),
    role: formData.get('role'),
  });
  if (error) return error;

  const response = await apiService.post('/invite', data);
};

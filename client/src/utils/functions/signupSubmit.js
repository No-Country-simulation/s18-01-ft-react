import { userAuthSchema } from '@/utils/schemas/userSchemas';
import { apiService } from '../api/axios';
import { validateSchema } from './validateSchema';

export const signupSubmit = async form => {
  const [schemaErrors, data] = validateSchema(userAuthSchema, {
    password: form.get('password'),
    email: form.get('email'),
  });
  if (schemaErrors) return schemaErrors;

  const [error, _] = await apiService.post('/user/register', data);

  if (error) {
    return {
      id: crypto.randomUUID(),
      status: 'FETCH_ERROR',
      errors: { GLOBAL: 'Ocurrio un error en el servidor' },
    };
  }
  return {
    id: crypto.randomUUID(),
    status: 'SUCCESS',
  };
};

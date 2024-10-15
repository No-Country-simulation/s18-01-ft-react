import { z } from 'zod';

export const emailSchema = z.object({
  email: z
    .string({ message: 'El correo electronico es obligatorio' })
    .email('El email es invalido'),
});

export const loginShcema = emailSchema.extend({
  password: z
    .string({ message: 'La contraseña es requerida' })
    .min(6, 'La contraseña debe tener al menos 6 carecteres')
    .max(100, 'La contraseña debe tener hasta 100 caracteres como maximo'),
});

export const signupEnterpriseSchema = loginShcema.extend({
  name: z
    .string({ message: 'El nombre es requerido' })
    .min(1, 'El nombre debe tener mas de un caracter'),
  domain: z
    .string({ message: 'El dominio es obligatorio' })
    .min(1, 'El dominio debe tener al menos un caracter'),
});

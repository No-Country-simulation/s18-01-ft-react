import { signupEnterpriseSchema } from '@/schemas/userSchemas';

export const onSubmit = async form => {
  const signupVerified = signupEnterpriseSchema.safeParse({
    password: form.get('passwordField'),
    email: form.get('emailField'),
    name: form.get('nameField'),
    domain: form.get('domainField'),
  });
  if (!signupVerified.success) {
    const errors = Object.fromEntries(
      signupVerified.error.errors
        .filter(({ path }) => path)
        .map(({ path, message }) => [path[0], message])
    );
    return {
      id: crypto.randomUUID(),
      status: 'VALIDATION_ERROR',
      errors,
    };
  }

  const res = await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(signupVerified.data),
  });

  if (!res.ok) {
    return {
      id: crypto.randomUUID(),
      status: 'FETCH_ERROR',
      errors: { GLOBAL: 'Ocurrio un error en el servidor' },
    };
  }
};

import { loginShcema } from '@/schemas/userSchemas';
import { useNavigate } from 'react-router-dom';

export const useSubmitEnterpriseSignin = async form => {
  const navigate = useNavigate();
  const signupVerified = loginShcema.safeParse({
    password: form.get('passwordField'),
    email: form.get('emailField'),
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

  const res = await fetch('/api/signin', {
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
  //Logica caso de exito (No se que ocurriria)

  navigate('/');
};

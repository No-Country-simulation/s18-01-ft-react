import FormComponent from '@/components/FormComponent/FormComponent';
import { useUserSigninSubmit } from '@/utils/functions/userSigninSubmit';

const enterpriseSigninFields = [
  {
    label: 'Correo electronico',
    type: 'email',
    tabindex: 1,
    id: 'nameField',
    name: 'email',
    icon: '/images/sms.png',
    placeholder: 'Ingresa tu Correo',
    iconColor: 'secondary',
  },
  {
    label: 'Contraseña',
    type: 'password',
    tabindex: 2,
    id: 'passwordField',
    name: 'password',
    icon: '/svg/key.svg',
    placeholder: 'Ingresa tu Contraseña',
    iconColor: 'accent',
  },
];

export const UserSigninPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <header className="sr-only">
        <h1>Inicia sesion como empresa</h1>
      </header>
      <main className="mx-auto w-full max-w-3xl">
        <FormComponent
          id="enterprise-signup"
          btnText="Iniciar sesion"
          fields={enterpriseSigninFields}
          className="mt-10"
          onSubmit={useUserSigninSubmit}
        />
      </main>
    </div>
  );
};

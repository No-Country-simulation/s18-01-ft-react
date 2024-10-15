import FormComponent from '@/components/FormComponent/FormComponent';
import { useUserSignupSubmit } from '@/utils/functions/userSignupSubmit';

const userSignupFields = [
  {
    label: 'Nombre',
    type: 'text',
    tabindex: 1,
    id: 'nameField',
    name: 'nameField',
    icon: '/images/sms.png',
    placeholder: 'Ingresa tu nombre',
    iconColor: 'secondary',
  },
  {
    label: 'Correo Electronico empresarial',
    type: 'email',
    tabindex: 2,
    id: 'emailField',
    name: 'emailField',
    icon: '/images/sms.png',
    placeholder: 'Ingresa tu Correo',
    iconColor: 'secondary',
  },
  {
    label: 'Dominio',
    type: 'text',
    tabindex: 3,
    id: 'domainField',
    name: 'domainField',
    icon: '/images/sms.png',
    placeholder: 'Ingresa tu Dominio',
    iconColor: 'secondary',
  },
  {
    label: 'Contraseña',
    type: 'password',
    tabindex: 4,
    id: 'passwordField',
    name: 'passwordField',
    icon: '/images/sms.png',
    placeholder: 'Ingresa tu Contraseña',
    iconColor: 'accent',
  },
];

export const UserSignupPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <header className="sr-only">
        <h1>Registra tu empresa</h1>
      </header>
      <main className="mx-auto w-full max-w-3xl">
        <FormComponent
          id="enterprise-signup"
          btnText="Registrarme"
          fields={userSignupFields}
          onSubmit={useUserSignupSubmit}
        />
      </main>
    </div>
  );
};

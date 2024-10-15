import ButtonBox from '@/components/ButtonBox/ButtonBox';
import FormComponent from '@/components/FormComponent/FormComponent';
import AuthLayout from '@/layouts/AuthLayout';
import { useUserSignupSubmit } from '@/utils/functions/userSignupSubmit';
import { Link } from 'react-router-dom';

const userSignupFields = [
  {
    label: 'Correo electronico',
    type: 'email',
    tabindex: 1,
    id: 'nameField',
    name: 'email',
    icon: '/images/sms.png',
    placeholder: 'Ingresa tu Correo',
    iconColor: 'secondary',
    autoComplete: 'email',
  },
  {
    label: 'Contraseña',
    type: 'password',
    tabindex: 2,
    id: 'passwordField',
    autoComplete: 'new-password',
    name: 'password',
    icon: '/svg/key.svg',
    placeholder: 'Ingresa tu Contraseña',
    iconColor: 'accent',
  },
];
export const UserSignupPage = () => (
  <AuthLayout h1="Hola Bienvenido a Escape Co" h2="Registrarse">
    <div className="flex w-full flex-col items-center justify-center">
      <FormComponent
        id="enterprise-signup"
        btnText="Registrarme"
        fields={userSignupFields}
        onSubmit={useUserSignupSubmit}
      />
      <ButtonBox boxText="¿Ya tienes una cuenta?" className="!p-0">
        <Link
          to="/signin"
          className="no-outline flex size-full items-center justify-center bg-transparent">
          Iniciar sesion
        </Link>
      </ButtonBox>
    </div>
  </AuthLayout>
);

import ButtonBox from '@/components/ButtonBox/ButtonBox';
import FormComponent from '@/components/FormComponent/FormComponent';
import AuthLayout from '@/layouts/AuthLayout';
import { useUserSigninSubmit } from '@/utils/functions/userSigninSubmit';
import { Link } from 'react-router-dom';

const userSigninFields = [
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
    name: 'password',
    icon: '/svg/key.svg',
    placeholder: 'Ingresa tu Contraseña',
    iconColor: 'accent',
    autoComplete: 'password',
  },
];

export const UserSigninPage = () => (
  <AuthLayout h1="Hola Bienvenido a Escape Co" h2="Login">
    <div className="flex w-full flex-col items-center justify-center">
      <FormComponent
        id="enterprise-signup"
        btnText="Entrar"
        fields={userSigninFields}
        onSubmit={useUserSigninSubmit}
      />
      <div className="flex w-full flex-col items-center justify-center gap-y-5">
        <ButtonBox boxText="¿Deseas entrar con tu cuenta de Google?">
          Iniciar sesion Google
        </ButtonBox>
        <ButtonBox boxText="¿Todabia no tienes cuenta?" className="!p-0">
          <Link
            to="/signup"
            className="no-outline flex size-full items-center justify-center bg-transparent">
            Registrate
          </Link>
        </ButtonBox>
      </div>
    </div>
  </AuthLayout>
);

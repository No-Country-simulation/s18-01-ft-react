import FormComponent from '../FormComponent/FormComponent';
import { useSubmitEnterpriseSignin } from './useSubmitEnterpriseSignin';

/**
 * Array que corresponde a los inputs del formulario de registro de empresa.
 * @typedef {Object[]} EnterpriseSignupFields
 * @property {string} label - Text del label del input
 * @property {string} type - Tipo dle input
 * @property {number} tabindex - El orden en el que el input recibe el foco
 * @property {string} id - ID del elemento
 */
const enterpriseSigninFields = [
  {
    label: 'Correo electronico',
    type: 'email',
    tabindex: 1,
    id: 'nameField',
    name: 'nameField',
  },
  {
    label: 'Contraseña',
    type: 'password',
    tabindex: 2,
    id: 'passwordField',
    name: 'passwordField',
  },
];

/**
 * Formulario de registro de empresa.
 *
 * Este formulario solicita el nombre, email, dominio y contraseña.
 *
 * @returns {JSX.Element} Un formulario con los campos mencionados.
 */
export const EnterpriseSigninForm = () => (
  <FormComponent
    id="enterprise-signup"
    btnText="Iniciar sesion"
    fields={enterpriseSigninFields}
    className="mt-10"
    onSubmit={useSubmitEnterpriseSignin}
  />
);

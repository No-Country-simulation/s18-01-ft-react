import FormComponent from '../FormComponent/FormComponent';
import { useSubmitEnterpriseSignup } from './useSubmitEnterpriseSignup';

/**
 * Array que corresponde a los inputs del formulario de registro de empresa.
 * @typedef {Object[]} EnterpriseSignupFields
 * @property {string} label - Text del label del input
 * @property {string} type - Tipo dle input
 * @property {number} tabindex - El orden en el que el input recibe el foco
 * @property {string} id - ID del elemento
 */
const enterpriseSignupFields = [
  { label: 'Nombre', type: 'text', tabindex: 1, id: 'nameField', name: 'nameField' },
  {
    label: 'Correo Electronico empresarial',
    type: 'email',
    tabindex: 2,
    id: 'emailField',
    name: 'emailField',
  },
  {
    label: 'Dominio',
    type: 'text',
    tabindex: 3,
    id: 'domainField',
    name: 'domainField',
  },
  {
    label: 'Contraseña',
    type: 'password',
    tabindex: 4,
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
export const EnterpriseSignupForm = () => (
  <FormComponent
    id="enterprise-signup"
    btnText="Registrarme"
    fields={enterpriseSignupFields}
    onSubmit={useSubmitEnterpriseSignup}
  />
);

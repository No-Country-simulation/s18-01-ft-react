import FormComponent from '../FormComponent/FormComponent';

/**
 * Array que corresponde a los inputs del formulario de registro de empresa.
 * @typedef {Object[]} EnterpriseSignupFields
 * @property {string} label - Text del label del input
 * @property {string} type - Tipo dle input
 * @property {number} tabindex - El orden en el que el input recibe el foco
 * @property {string} id - ID del elemento
 */
const enterpriseSignupFields = [
  { label: 'Nombre', type: 'text', tabindex: 1, id: 'nameField' },
  { label: 'Email', type: 'email', tabindex: 2, id: 'emailField' },
  { label: 'Dominio', type: 'text', tabindex: 3, id: 'domainField' },
  { label: 'Contraseña', type: 'password', tabindex: 4, id: 'passwordField' },
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
  />
);

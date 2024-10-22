import { createRoom } from '@/data/createRoom';
import { useForm } from '@/utils/hooks/useForm';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import { FormDropdown } from '../FormDropdown/FormDropdown';
const roleDropdown = [
  { placeholder: 'Desarrollador', value: 1 },
  { placeholder: 'Diseñador', value: 2 },
  { placeholder: 'Supervisor', value: 3 },
];
export const UserCreateForm = ({ close }) => {
  const { errors, isPending, submit } = useForm(createRoom);

  return (
    <form className="mt-5 flex h-full flex-col gap-y-4" onSubmit={submit}>
      <label
        htmlFor="userEmailField"
        className="flex flex-col gap-y-3 text-base font-medium text-black">
        Correo Electronico
        <FormInput
          placeholder="Correo Electronico"
          name="email"
          type="email"
          id="userEmailField"
          autoComplete="off"
          password={false}
        />
      </label>
      <FormDropdown placeholder="Elige los roles que tendrá" items={roleDropdown} />
      <div className="mt-auto flex items-center justify-end gap-x-4">
        <Button
          variant="accent-outline"
          type="button"
          className="h-9 px-5"
          onClick={close}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="h-9 px-5 text-accent-100"
          disabled={isPending}>
          Invitar usuario
        </Button>
      </div>
    </form>
  );
};

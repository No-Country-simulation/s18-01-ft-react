import Button from '../Button/Button';
import FormField from '../FormField/FormField';
import PasswordFormField from '../PasswordField/PasswordField';
import { cn } from '@/utils/functions/cn';
import { useForm } from '@/hooks/useForm';

// TODO: Implementar logica para, utilizar textarea y dropdowns
const RenderFields = ({ field, error }) => {
  const commonProps = {
    id: field.id,
    'data-testid': field.id,
    name: field.name,
    label: field.label,
    defaultValue: field.defaultValue || '',
    autoComplete: field.autoComplete || 'off',
    error: error,
    icon: field.icon,
    tabindex: field.tabindex,
  };
  if (field.type === 'password') {
    return <PasswordFormField {...commonProps} />;
  }
  return <FormField {...commonProps} type={field.type} />;
};

export default function FormComponent({
  fields,
  onSubmit,
  btnText = 'Continuar',
  className = '',
  btnClassName = '',
  id,
}) {
  const [errors, isPending, submit] = useForm(onSubmit);

  return (
    <form
      id={id}
      data-testid={id}
      onSubmit={submit}
      className={cn(className, 'flex w-full max-w-3xl flex-col gap-y-7')}>
      {fields.map(field => (
        <RenderFields key={field.name} field={field} error={errors?.[field.name]} />
      ))}
      <Button
        type="submit"
        size="full"
        key={`${id}-${isPending}`}
        disabled={isPending}
        className={cn(
          btnClassName,
          'mt-8 max-w-lg focus-visible:outline-1 focus-visible:outline-sky-200'
        )}
        tabIndex={Number(fields.at(-1)?.tabindex || 0) + 1}>
        {btnText}
      </Button>
    </form>
  );
}

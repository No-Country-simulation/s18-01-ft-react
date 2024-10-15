import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils/functions/cn';
import EyeButton from '../EyeButton/EyeButton';
import IconBox from '../IconBox/IconBox';

const formFieldCVA = cva(
  'no-outline shadow-inset-small border-neutral-1000 relative mt-px h-11 w-full rounded-4xl border-2 border-solid bg-transparent px-4 text-sm text-black transition-all duration-300 ease-in-out placeholder:text-neutral-800 focus:border-neutral-700',
  {
    variants: {
      password: {
        true: 'pr-10',
        false: '',
      },
      defaultVariants: { password: false },
    },
  }
);

const FormField = forwardRef(function FormField(
  {
    className = '',
    id = '',
    label = '',
    type = 'text',
    error,
    icon,
    onTypeChange,
    iconColor = '',
    ...props
  },
  ref
) {
  const defaultID = id ? id : 'field-id';

  return (
    <label
      htmlFor={defaultID}
      className='brutalism-box before:bg-field-img-size relative z-10 w-full max-w-md rounded-2xl border-black px-6 pb-9 pt-4 text-sm font-normal leading-4 text-neutral-1000 before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-field-img before:opacity-10 before:content-[""]'>
      <div className="font-semibold">{label}</div>
      <div className="relative mt-2 flex items-center space-x-4">
        {icon ? <IconBox icon={icon} color={iconColor} /> : ''}
        <div className="relative grow">
          <input
            {...props}
            id={defaultID}
            ref={ref}
            type={type}
            className={cn(
              formFieldCVA({
                className,
                password: !!onTypeChange,
              })
            )}
          />
          {onTypeChange ? <EyeButton onTypeChange={onTypeChange} /> : null}
        </div>
      </div>
    </label>
  );
});

export default FormField;

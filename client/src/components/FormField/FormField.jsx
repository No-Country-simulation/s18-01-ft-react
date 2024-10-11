import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import EyeButton from '../EyeButton/EyeButton';

const formFieldCVA = cva(
  'w-full bg-transparent relative z-10 no-outline rounded-md transition-all duration-300 ease-in-out text-sm  h-12 px-3 py-2 border-none',
  {
    variants: {
      error: {
        true: 'border-error-60 focus:border -error-60 placeholder:text-error-60 sr',
        false: '',
      },
      password: {
        true: 'pr-10',
        false: '',
      },
      defaultVariants: { error: false, password: false },
    },
  }
);
const labelCVA = cva('text-base font-normal leading-4 text-white', {
  variants: {
    error: {
      true: 'text-error-60 peer-focus:text-error-60 peer-[:not(:placeholder-shown)]:text-error-60',
      false: '',
    },
    defaultVariants: { error: false },
  },
});
// Icons: EyeOff, Github, Linkedin, Unlock, User, Whatsapp (Actualmente)
const FormField = forwardRef(function FormField(
  {
    className = '',
    id = '',
    label = '',
    type = 'text',
    error,
    icon,
    onTypeChange,
    ...props
  },
  ref
) {
  const defaultID = id ? id : crypto.randomUUID();

  return (
    <div className="group relative w-full max-w-lg text-sm">
      <label className={cn(labelCVA({ error: !!error }))} htmlFor={defaultID}>
        {label}
      </label>
      <div className="relative mt-4">
        <div className="to-primary-50 from-accent-400 absolute inset-0 rounded-md bg-gradient-to-r"></div>
        <div className="bg-gradient-field absolute inset-px rounded-md"></div>
        <input
          {...props}
          id={defaultID}
          ref={ref}
          type={type}
          className={cn(
            formFieldCVA({ error: !!error, className, password: !!onTypeChange })
          )}
        />
        {onTypeChange ? <EyeButton onTypeChange={onTypeChange} /> : null}
      </div>
      {error ? (
        <span className="text-error-60 absolute -bottom-5 left-0 text-xs">
          {error}
        </span>
      ) : null}
    </div>
  );
});

export default FormField;

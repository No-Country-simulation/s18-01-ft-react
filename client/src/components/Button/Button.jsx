/* eslint-disable prettier/prettier */
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils/functions/cn';

const btnCVA = cva(
  `inline-flex items-center justify-center rounded-4xl no-outline truncate disabled:opacity-60 disabled:cursor-default disabled:bg-neutral-500 disable:text-neutral-800 transition-all ease-in-out duration-300 border-2 border-solid border-accent-1000`,
  {
    variants: {
      variant: {
        primary:
          'bg-primary-400 text-accent-1000 font-medium [&:not(:disabled)]:hover:bg-primary-500 [&:not(:disabled)]:active:bg-primary-600',
        secondary:
          'bg-secondary-400 text-accent-1000 font-medium [&:not(:disabled)]:hover:bg-secondary-500 [&:not(:disabled)]:active:bg-secondary-600',
        'secondary-light':
          'bg-secondary-100 text-accent-1000 font-medium [&:not(:disabled)]:hover:bg-secondary-200 [&:not(:disabled)]:active:bg-secondary-300',
        disabled: 'bg-neutral-500 text-neutral-800 cursor-not-allowed opacity-90',
        transparent: 'bg-transparent text-white border-transparent',
      },
      size: {
        default: 'h-[44px] py-[10px] px-7',
        full: 'h-[44px] py-[10px] px-7 w-full max-w-[100cqw]',
        fit: 'size-fit py-[10px] px-7',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  }
);

const Button = forwardRef(function Button(
  { className, variant, size, asChild = false, ...props },
  ref
) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(btnCVA({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

export default Button;

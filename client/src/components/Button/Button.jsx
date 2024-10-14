/* eslint-disable prettier/prettier */
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils/functions/cn';

const btnCVA = cva(
  `inline-flex items-center justify-center  rounded-lg no-outline truncate disabled:opacity-60 disabled:cursor-default disabled:bg-neutral-500 disable:text-neutral-800 transition-all ease-in-out duration-300`,
  {
    variants: {
      variant: {
        primary:
          'bg-sky-400 text-sky-950 font-medium [&:not(:disabled)]:hover:bg-sky-500 [&:not(:disabled)]:hover:scale-105 [&:not(:disabled)]:active:scale-100 [&:not(:disabled)]:active:bg-sky-500/80',
        secondary:
          'bg-slate-500 text-slate-950 font-medium [&:not(:disabled)]:hover:bg-slate-600 [&:not(:disabled)]:hover:scale-105 [&:not(:disabled)]:active:scale-100 [&:not(:disabled)]:active:bg-slate-600/80',
        disabled: 'bg-neutral-500 text-neutral-800 cursor-not-allowed',
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

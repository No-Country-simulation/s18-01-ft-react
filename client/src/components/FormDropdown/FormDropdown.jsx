import * as Select from '@radix-ui/react-select';
import dropdownIcon from '/public/svg/dropdownIcon.svg';
import { forwardRef } from 'react';
import { cn } from '@/utils/functions/cn';
export const FormDropdown = ({ placeholder, items = [] }) => {
  return (
    <div className="relative w-full min-w-full">
      <Select.Root className="w-full">
        <Select.Trigger className="flex h-11 w-full items-center justify-between rounded-4xl border-2 border-solid border-neutral-1000 px-4 text-sm text-black focus:border-neutral-700">
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <img
              src={dropdownIcon}
              width={24}
              height={24}
              className="aspect-square"
            />
          </Select.Icon>
        </Select.Trigger>
        <Select.Content
          position="popper"
          className="mt-2 flex w-full min-w-[var(--radix-select-trigger-width)] flex-col rounded-4xl border-2 border-solid border-neutral-1000">
          {items.map(item => (
            <SelectItem
              className="w-full cursor-pointer p-3 first:rounded-t-4xl last:rounded-b-4xl hover:bg-accent-200 active:bg-accent-300"
              value={item.value}>
              {item.placeholder}
            </SelectItem>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  );
};

const SelectItem = forwardRef(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item className={cn(className, 'w-full')} {...props} ref={forwardedRef}>
      <Select.ItemText className="w-full">{children}</Select.ItemText>
    </Select.Item>
  );
});

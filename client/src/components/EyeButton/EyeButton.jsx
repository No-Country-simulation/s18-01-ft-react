import { useState } from 'react';
import { cn } from '@/utils/functions/cn';

const EyeButton = ({ onTypeChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const onReset = () => {
    onTypeChange?.(!showPassword ? 'text' : 'password');
    setShowPassword(prev => !prev);
  };
  return (
    <button
      type="button"
      onClick={onReset}
      className="absolute right-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-in-out"
      data-testid="eye-button">
      <span className="sr-only">
        {showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
      </span>
      <div className="relative size-[18px]">
        <img
          className={cn(
            'absolute transition-all duration-300 ease-in-out',
            !showPassword
              ? 'rotate-0 transform opacity-100'
              : 'rotate-90 transform opacity-0'
          )}
          src="/svg/EyeOff.svg"
          width={18}
          height={18}
          alt="Eye on icon"
          decoding="async"
        />
        <img
          className={cn(
            'absolute transition-all duration-300 ease-in-out',
            showPassword
              ? 'rotate-0 transform opacity-100'
              : 'rotate-90 transform opacity-0'
          )}
          src="/svg/EyeOn.svg"
          width={18}
          height={18}
          alt="Eye off icon"
          decoding="async"
        />
      </div>
    </button>
  );
};

export default EyeButton;

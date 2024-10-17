import { useState } from 'react';
import { Box1, Profile2User, Video, Message, Book } from 'iconsax-react';
import ToolbarButton from '../ToolbarButton/ToolbarButton';
import { toolbarOptions } from '../../utils/functions/toolbarOptions';

const UserToolbar = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = value => {
    setSelectedOption(selectedOption === value ? null : value);
  };

  return (
    <div className="mt-6 flex h-[82px] w-[559px] flex-wrap items-center justify-center rounded-4xl border border-black bg-white shadow-drop">
      <div className="flex space-x-2">
        {toolbarOptions.slice(0, 4).map(option => (
          <ToolbarButton
            key={option.value}
            icon={option.icon}
            label={option.label}
            isSelected={selectedOption === option.value}
            onClick={() => handleOptionClick(option.value)}
          />
        ))}
      </div>
      <hr className="ml-1 mr-5 h-[65px] border border-neutral-500" />
      <div>
        <ToolbarButton
          icon={toolbarOptions[4].icon}
          label={toolbarOptions[4].label}
          isSelected={selectedOption === toolbarOptions[4].value}
          onClick={() => handleOptionClick(toolbarOptions[4].value)}
        />
      </div>
    </div>
  );
};

export default UserToolbar;

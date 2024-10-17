import { useState } from 'react';
import ToolbarButton from '../ToolbarButton/ToolbarButton';
import { toolbarOptions } from '../../utils/functions/toolbarOptions';
import { RoomModal } from '../RoomModal/RoomModal';
import { useAtom } from 'jotai';
import { modalAtom } from '@/store/modalAtom';

const UserToolbar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [_, setModal] = useAtom(modalAtom);

  const handleOptionClick = value => {
    setSelectedOption(selectedOption === value ? null : value);
    setModal(val => ({ ...val, open: !val.open, modalId: value }));
  };

  return (
    <div className="mt-6 flex h-[82px] w-[559px] flex-wrap items-center justify-center rounded-4xl border border-black bg-white shadow-drop">
      <div className="flex space-x-2">
        {toolbarOptions.slice(0, 4).map(option => (
          <ToolbarButton
            key={option.value}
            icon={
              <img src={option.icon} alt={option.label} width="24px" height="24px" />
            }
            label={option.label}
            isSelected={selectedOption === option.value}
            onClick={() => handleOptionClick(option.value)}
          />
        ))}
      </div>
      <hr className="ml-1 mr-5 h-[65px] border border-neutral-500" />
      <div>
        <ToolbarButton
          icon={
            <img
              src={toolbarOptions[4].icon}
              alt={toolbarOptions[4].label}
              width="24px"
              height="24px"
            />
          }
          label={toolbarOptions[4].label}
          isSelected={selectedOption === toolbarOptions[4].value}
          onClick={() => handleOptionClick(toolbarOptions[4].value)}
        />
      </div>
      <RoomModal />
    </div>
  );
};

export default UserToolbar;

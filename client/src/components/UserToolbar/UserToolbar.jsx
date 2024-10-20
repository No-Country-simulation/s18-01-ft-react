import { useState, useRef } from 'react';
import ToolbarButton from '../ToolbarButton/ToolbarButton';
import { toolbarOptions } from '../../utils/functions/toolbarOptions';
import { RoomModal } from '../RoomModal/RoomModal';
import { useSetAtom } from 'jotai';
import { modalAtom } from '@/store/modalAtom';
import { UsersModal } from '../UsersModal/UsersModal';

const UserToolbar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const setModal = useSetAtom(modalAtom);
  const buttonRefs = useRef([]);
  const handleOptionClick = (value, index) => {
    const btnRect = buttonRefs.current[index].getBoundingClientRect();
    setSelectedOption(selectedOption === value ? null : value);
    setModal(val => ({
      open: selectedOption !== value,
      modalId: value,
      coords: [btnRect.top - 20, btnRect.left],
      firstOpen: true,
    }));
  };

  return (
    <div className="mx-auto mb-12 mt-6 flex h-[82px] w-[559px] flex-wrap items-center justify-center rounded-4xl border border-black bg-white shadow-drop">
      <div className="flex space-x-2">
        {toolbarOptions.slice(0, 4).map((option, index) => (
          <ToolbarButton
            key={option.value}
            ref={el => (buttonRefs.current[index] = el)}
            icon={option.icon}
            alt={option.label}
            label={option.label}
            id={option.id}
            isSelected={selectedOption === option.value}
            onClick={() => handleOptionClick(option.value, index)}
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
      <UsersModal />
    </div>
  );
};

export default UserToolbar;

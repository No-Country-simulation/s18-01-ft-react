import { useSetAtom } from 'jotai';
import Button from '../Button/Button';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { modalAtom } from '@/store/modalAtom';
import crossicon from '/public/svg/crossIcon.svg';
import { UserCreateForm } from './UserCreateForm';

export const UserCreateModal = () => {
  const setModal = useSetAtom(modalAtom);
  const handleClose = () => {
    setModal(val => ({ ...val, modalId: 'UsersList' }));
  };
  return (
    <ModalWrapper
      id="userCreate"
      className="max-h-[550px] w-full max-w-96 overflow-hidden">
      <div className="relative flex h-[500px] max-h-[500px] flex-col overflow-y-auto overflow-x-hidden p-4 pt-0">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium leading-7 text-accent-1000">
            Invitar Usuario
          </h3>
          <Button
            variant="transparent"
            size="fit"
            className="p-0 text-accent-1000"
            onClick={handleClose}>
            <img
              src={crossicon}
              width={24}
              height={24}
              className="aspect-square"
              decoding="async"
            />
          </Button>
        </div>
        <p className="text-base font-normal text-neutral-900">
          Ingresa el email del usuario para invitarlo a unirse a tu equipo.
        </p>
        <UserCreateForm close={handleClose} />
      </div>
    </ModalWrapper>
  );
};

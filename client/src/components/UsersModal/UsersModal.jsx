import Button from '../Button/Button';
import { ModalTitleWrapper } from '../ModalWrapper/ModalTitleWrapper';
import { UserModalTabs } from './UserModalTabs';
import users from '/public/svg/icon-toolbar/profile-2user.svg';

const usersList = [
  {
    name: 'Marcos',
    sub: 'Desarrollador',
  },
  {
    name: 'Marcos',
    sub: 'Desarrollador',
  },
];

export const UsersModal = () => {
  return (
    <ModalTitleWrapper
      imgStyle="invert brightness-0"
      className="max-h-[512px] w-full max-w-96"
      id="UsersList"
      icon={users}
      title={`Usuarios (1)`}>
      <div className="flex size-full flex-col gap-y-4 rounded-b-4xl bg-accent-100">
        <UserModalTabs users={usersList} />
        <div className="mt-auto flex w-full items-center justify-center pb-8">
          <Button
            className="max-w-[75%] text-accent-100"
            size="full"
            onClick={() => alert('Proximamente')}>
            Invitar al equipo
          </Button>
        </div>
      </div>
    </ModalTitleWrapper>
  );
};

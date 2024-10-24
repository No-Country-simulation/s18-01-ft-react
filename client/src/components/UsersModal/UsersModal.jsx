import { getCurrentUserAtom, isEnterpriseUser } from '@/data/getCurrentUser';
import Button from '../Button/Button';
import { ModalTitleWrapper } from '../ModalWrapper/ModalTitleWrapper';
import { UserModalTabs } from './UserModalTabs';
import users from '/public/svg/icon-toolbar/profile-2user.svg';
import { UserCreateModal } from '../UserCreateModal/UserCreateModal';
import { modalAtom } from '@/store/modalAtom';
import { roomAtom } from '@/store/roomsAtom';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useGetUserList } from '@/data/useGetUserList';

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
const MODAL_ID = 'UsersList';

export const UsersModal = () => {
  const user = getCurrentUserAtom();
  const isUserCompany = isEnterpriseUser(user);
  const [modal, setModal] = useAtom(modalAtom);
  const [rooms, setRooms] = useAtom(roomAtom);
  const { data, refetch, isLoading } = useGetUserList();
  const openCreate = () => {
    if (!isUserCompany) return;
    setModal(val => ({ ...val, modalId: 'userCreate' }));
  };
  useEffect(() => {
    if (modal.open && modal.modalId === MODAL_ID) {
      refetch();
      console.log({ data });
    }
  }, [modal]);
  return (
    <>
      <ModalTitleWrapper
        imgStyle="invert brightness-0"
        className="max-h-[512px] w-full max-w-96"
        id={MODAL_ID}
        icon={users}
        title={`Usuarios (1)`}>
        <div className="flex size-full flex-col gap-y-4 rounded-b-4xl bg-accent-100">
          <UserModalTabs users={data} />
          {isUserCompany && (
            <div className="mt-auto flex w-full items-center justify-center pb-8">
              <Button
                className="max-w-[75%] text-accent-100"
                size="full"
                onClick={openCreate}>
                Invitar al equipo
              </Button>
            </div>
          )}
        </div>
      </ModalTitleWrapper>
      <UserCreateModal />
    </>
  );
};

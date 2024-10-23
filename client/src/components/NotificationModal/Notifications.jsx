import { useAtom } from 'jotai';
import NotificationModal from './NotificationModal';
import { modalAtom } from '@/store/modalAtom';

const Notifications = () => {
  const [modal, setModal] = useAtom(modalAtom);

  const notifications = [
    {
      icon: '',
      title: 'Tarea asignada',
      description: 'Admin te ha asignado una nueva tarea.',
      date: '2024-10-20T14:48:00.000Z',
      type: 'task',
    },
    {
      icon: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      title: 'Invitación',
      description: 'Empresa te ha invitado a unirte a su equipo.',
      date: '2024-10-19T08:30:00.000Z',
      type: 'invitation',
    },
    {
      icon: '',
      title: 'Bienvenido',
      description: 'Bienvenido a Escape CO',
      date: '2024-10-18T09:15:00.000Z',
      type: 'welcome',
    },
  ];
  return (
    <>
      {/* Condicionalmente renderiza el modal */}
      {modal.open && modal.modalId === 'notification' && (
        <NotificationModal
          notifications={notifications}
          isOpen={modal.open}
          closeModal={() => setModal(prev => ({ ...prev, open: false }))}
        />
      )}
    </>
    // <div className="p-6">
    //   <NotificationModal
    //     isOpen={isModalOpen}
    //     closeModal={() => setIsModalOpen(false)}
    //     notifications={notifications}
    //   />
    // </div>
  );
};

export default Notifications;

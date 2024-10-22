import { useState } from 'react';
import NotificationModal from './NotificationModal';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

const Notifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="p-6">
      <NotificationModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        notifications={notifications}
      />
    </div>
  );
};

export default Notifications;

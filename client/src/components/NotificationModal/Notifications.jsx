import { useAtom } from 'jotai';
import NotificationModal from './NotificationModal';
import { modalAtom } from '@/store/modalAtom';
import { useEffect, useState } from 'react';
import { getAllNotifications } from '@/utils/functions/notificationService';

const Notifications = () => {
  const [modal, setModal] = useAtom(modalAtom);
  const [notifications, setNotifications] = useState([]);
  // // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getAllNotifications();
      if (data.length) {
        setNotifications(data);
      } else {
        setError('Error al cargar las notificaciones');
      }
    };

    fetchNotifications();
  }, []);

  // const notifications = [
  //   {
  //     id: 1,
  //     icon: '',
  //     title: 'Tarea asignada',
  //     description: 'Admin te ha asignado una nueva tarea.',
  //     date: '2024-10-20T14:48:00.000Z',
  //     type: 'task',
  //   },
  //   {
  //     id: 2,
  //     icon: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  //     title: 'Invitación',
  //     description: 'Empresa te ha invitado a unirte a su equipo.',
  //     date: '2024-10-19T08:30:00.000Z',
  //     type: 'invitation',
  //     token: '1234567890',
  //   },
  //   {
  //     id: 3,
  //     icon: '',
  //     title: 'Bienvenido',
  //     description: 'Bienvenido a Escape CO',
  //     date: '2024-10-18T09:15:00.000Z',
  //     type: 'welcome',
  //   },
  // ];

  return (
    <>
      {modal.open && modal.modalId === 'notification' && (
        <NotificationModal
          notifications={notifications}
          isOpen={modal.open}
          closeModal={() => setModal(prev => ({ ...prev, open: false }))}
        />
      )}
      {/* {loading && <p>Cargando notificaciones...</p>} */}
      {error && <p>{error}</p>}
    </>
  );
};

export default Notifications;

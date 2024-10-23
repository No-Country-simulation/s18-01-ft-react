import { modalAtom } from '@/store/modalAtom';
import { useSetAtom } from 'jotai';

const ButtonNotification = () => {
  const setModal = useSetAtom(modalAtom);

  const openNotification = () => {
    setModal(prev => ({ ...prev, open: true, modalId: 'notification' }));
  };

  return (
    <div>
      <button
        onClick={openNotification}
        className="flex size-12 items-center justify-center rounded-full border border-black shadow-drop">
        <img src="/images/notification.png" className="w-6" alt="Notificación" />
      </button>
    </div>
  );
};

export default ButtonNotification;

import { ModalTitleWrapper } from '../ModalWrapper/ModalTitleWrapper';
import NotificationItem from './NotificationItem';

const NotificationModal = ({ notifications, closeModal }) => {
  const MODAL_ID = 'notification';

  return (
    <div>
      <ModalTitleWrapper
        id={MODAL_ID}
        className="max-h-[461px] w-full max-w-[322px]"
        title="Notificaciones">
        <div className="absolute -top-12 right-5 size-6">
          <button onClick={closeModal}>
            <img src="/images/close.png" alt="Close" />
          </button>
        </div>
        <div className="flex size-full flex-col items-center gap-y-4 rounded-b-4xl bg-accent-100 py-4">
          {notifications.length === 0 ? (
            <p>No tienes notificaciones por el momento</p>
          ) : (
            <div>
              {notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  title={notification.title}
                  description={notification.description}
                  date={notification.date}
                  icon={notification.icon}
                  type={notification.type}
                />
              ))}
            </div>
          )}
        </div>
      </ModalTitleWrapper>
    </div>
  );
};

export default NotificationModal;

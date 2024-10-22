import NotificationItem from './NotificationItem';

const NotificationModal = ({ notifications, onClose }) => {
  return (
    <div>
      <div>Notificaciones</div>
      <div>
        <button onClick={onClose}>
          <svg></svg>
        </button>
      </div>
      {NotificationStatus.length === 0 ? (
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationModal;

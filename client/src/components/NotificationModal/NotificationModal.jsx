import NotificationItem from './NotificationItem';

const NotificationModal = ({ notifications }) => {
  return (
    <div>
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
  );
};

export default NotificationModal;

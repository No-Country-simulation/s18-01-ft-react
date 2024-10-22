const NotificationItem = ({ title, description, date, icon }) => {
  return (
    <div>
      <img src={icon} alt="icon-notification" className="h-4" />
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <span>{date}</span>
    </div>
  );
};

export default NotificationItem;

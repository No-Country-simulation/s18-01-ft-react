import dateFormat from '@/utils/functions/dateFormat';
import Button from '../Button/Button';

const NotificationItem = ({ title, description, date, icon, type }) => {
  const timeAgo = dateFormat(date);

  return (
    <div className="my-3 flex flex-row items-start gap-2">
      <div className="mt-[3px] flex h-[42px] min-w-[42px] items-center justify-center rounded-full bg-neutral-400 text-center">
        {type === 'invitation' ? (
          <img src={icon} alt="avatar" className="max-w-[42px] rounded-full" />
        ) : (
          <span className="rounded-full">!</span>
        )}
      </div>

      <div>
        <div className="flex flex-row justify-around">
          <div className="h-[63px] w-[190px]">
            <h4 className="text-base font-medium">{title}</h4>
            <p className="text-sm text-neutral-800">{description}</p>
          </div>
          <span className="text-sm text-neutral-800">{timeAgo}</span>
        </div>
        {type === 'invitation' && (
          <Button className="my-2 h-[35px] w-[93px] text-white">Aceptar</Button>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;

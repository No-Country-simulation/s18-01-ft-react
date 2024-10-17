import { EmptyTab } from '../EmptyTab/EmptyTab';
import { RoomItem } from '../RoomItem/RoomItem';
import container from '/public/svg/container.svg';

export const RoomList = ({ rooms }) => (
  <div className="flex h-[275px] max-h-full w-full overflow-hidden">
    <div className="flex w-full flex-col gap-y-4 overflow-auto">
      {rooms?.length > 0 ? (
        rooms.map(room => (
          <RoomItem key={room.name} name={room.name} count={room.count} />
        ))
      ) : (
        <EmptyTab text="No hay elementos" img={container} />
      )}
    </div>
  </div>
);

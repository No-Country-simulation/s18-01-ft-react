import { EmptyTab } from '../EmptyTab/EmptyTab';
import { TabItem } from './TabItem';
import container from '/public/svg/container.svg';
import users from '/public/svg/icon-toolbar/profile-2user.svg';

export const TabListItem = ({ items, isRoom = false }) => (
  <div className="flex h-[275px] max-h-full w-full overflow-hidden">
    <div className="flex w-full flex-col gap-y-4 overflow-auto">
      {items?.length > 0 ? (
        items.map((item, i) => (
          <TabItem
            key={item.name + i}
            name={isRoom ? `${item.name} (${item?.count})` : `${item.name}`}
            sub={item?.sub}
            isRoom={isRoom}
          />
        ))
      ) : (
        <EmptyTab text="No hay elementos" img={isRoom ? container : users} />
      )}
    </div>
  </div>
);

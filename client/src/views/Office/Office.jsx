import PhaserContainer from '@/components/PhaserContainer/PhaserContainer';
import RoomName from '@/components/RoomName/RoomName';
import { UserEmptyLobby } from '@/components/UserEmptyLobby/UserEmptyLobby';
import UserToolbar from '@/components/UserToolbar/UserToolbar';
import { getCurrentUserAtom, getUserRole } from '@/data/getCurrentUser';
import { USER_ROLES } from '@/data/roles';
import OfficeLayouts from '@/layouts/OfficeLayouts';
import { cn } from '@/utils/functions/cn';
import { useParams } from 'react-router-dom';

const hasAccessToToolbar = userRole => {
  return userRole === USER_ROLES.ENTERPRISE || userRole === USER_ROLES.COWORKER;
};

const Office = () => {
  const { roomId } = useParams();
  const user = getCurrentUserAtom();
  const userRole = getUserRole(user);
  return (
    <OfficeLayouts hasTools={!!roomId}>
      <div
        className={cn(
          'mx-6 mb-2 flex w-full min-w-[869px] flex-col',
          hasAccessToToolbar(userRole) ? 'h-[85dvh]' : ''
        )}>
        <RoomName roomId={roomId} />
        {roomId ? <PhaserContainer roomId={roomId} /> : <UserEmptyLobby />}
        {hasAccessToToolbar(userRole) || roomId ? (
          <UserToolbar hasId={!!roomId} />
        ) : null}
      </div>
    </OfficeLayouts>
  );
};

export default Office;

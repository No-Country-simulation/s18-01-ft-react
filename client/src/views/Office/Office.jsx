import PhaserContainer from '@/components/PhaserContainer/PhaserContainer';
import RoomName from '@/components/RoomName/RoomName';
import { UserEmptyLobby } from '@/components/UserEmptyLobby/UserEmptyLobby';
import UserToolbar from '@/components/UserToolbar/UserToolbar';
import OfficeLayouts from '@/layouts/OfficeLayouts';
import { useParams } from 'react-router-dom';

const Office = () => {
  const { roomId } = useParams();
  return (
    <OfficeLayouts hasTools={!!roomId}>
      <div className="mx-6 mb-2 flex w-full min-w-[869px] flex-col">
        <RoomName roomId={roomId} />
        {roomId ? <PhaserContainer /> : <UserEmptyLobby />}
        {roomId ? <UserToolbar /> : null}
      </div>
    </OfficeLayouts>
  );
};

export default Office;

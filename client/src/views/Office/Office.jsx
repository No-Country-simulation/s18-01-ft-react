import PhaserContainer from '@/components/PhaserContainer/PhaserContainer';
import RoomName from '@/components/RoomName/RoomName';
import AppSearchBar from '@/components/Search/AppSearchBar';
import UserToolbar from '@/components/UserToolbar/UserToolbar';
import OfficeLayouts from '@/layouts/OfficeLayouts';
import { useParams } from 'react-router-dom';

const Office = () => {
  const { roomId } = useParams();
  const headerContainer = <AppSearchBar />;
  return (
    <OfficeLayouts header={headerContainer}>
      <div className="m-0 flex flex-col">
        <RoomName roomId={roomId} />
        {roomId ? <PhaserContainer /> : <div>No hay contenido</div>}
      </div>
      <UserToolbar />
    </OfficeLayouts>
  );
};

export default Office;

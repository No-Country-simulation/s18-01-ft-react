import PhaserContainer from '@/components/PhaserContainer/PhaserContainer';
import RoomName from '@/components/RoomName/RoomName';
import OfficeLayouts from '@/layouts/OfficeLayouts';
import { useParams } from 'react-router-dom';

const Office = () => {
  const { roomId } = useParams();
  return (
    <OfficeLayouts>
      <div className="mb-2 flex grow flex-col">
        <RoomName roomId={roomId} />
        {roomId ? <PhaserContainer /> : <div>No hay contenido</div>}
      </div>
    </OfficeLayouts>
  );
};

export default Office;

import PhaserContainer from '@/components/PhaserContainer/PhaserContainer';
import RoomName from '@/components/RoomName/RoomName';
import AppSearchBar from '@/components/Search/AppSearchBar';
import UserToolbar from '@/components/UserToolbar/UserToolbar';
import ZoomControls from '@/components/ZoomControls/ZoomControls';
import OfficeLayouts from '@/layouts/OfficeLayouts';

const Office = () => {
  const headerContainer = <AppSearchBar />;
  return (
    <OfficeLayouts header={headerContainer}>
      <div className="flex flex-col items-center">
        <div className="mb-2 flex flex-col">
          <RoomName />
          <PhaserContainer />
        </div>
        <UserToolbar />
      </div>
      <div className="ml-6">
        <ZoomControls />
      </div>
    </OfficeLayouts>
  );
};

export default Office;

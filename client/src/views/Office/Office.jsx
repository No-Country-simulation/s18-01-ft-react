import PhaserContainer from '@/components/PhaserContainer/PhaserContainer';
import RoomName from '@/components/RoomName/RoomName';
import AppSearchBar from '@/components/Search/AppSearchBar';
import UserToolbar from '@/components/UserToolbar/UserToolbar';
import OfficeLayouts from '@/layouts/OfficeLayouts';

const Office = () => {
  const headerContainer = <AppSearchBar />;
  return (
    <OfficeLayouts header={headerContainer}>
      <div className="m-0 flex flex-col">
        <RoomName />
        <PhaserContainer />
      </div>
      <UserToolbar />
    </OfficeLayouts>
  );
};

export default Office;

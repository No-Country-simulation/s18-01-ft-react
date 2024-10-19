import AppSearchBar from '@/components/Search/AppSearchBar';
import UserToolbar from '@/components/UserToolbar/UserToolbar';
import ZoomControls from '@/components/ZoomControls/ZoomControls';

const OfficeLayouts = ({ children }) => {
  return (
    <>
      <header className="bg-white p-4 shadow">
        <AppSearchBar />
      </header>
      <div className="mt-5 flex flex-col items-center justify-center">
        <div className="flex w-full justify-between px-20">
          {children}
          <aside className="my-auto ml-6">
            <ZoomControls />
          </aside>
        </div>
        <UserToolbar />
      </div>
    </>
  );
};

export default OfficeLayouts;

import AppSearchBar from '@/components/Search/AppSearchBar';
import UserToolbar from '@/components/UserToolbar/UserToolbar';
import ZoomControls from '@/components/ZoomControls/ZoomControls';

const OfficeLayouts = ({ children, hasTools }) => {
  return (
    <>
      <header className="bg-white p-4 shadow">
        <AppSearchBar />
      </header>
      <div className="mt-5 flex flex-col items-center justify-center">
        <div className="flex w-full justify-between px-[3.5dvw]">
          <aside className="mt-10 h-16 w-80 min-w-[300px] rounded-4xl border border-accent-1000 text-center shadow-drop">
            WIDGET
          </aside>
          {children}
          {hasTools ? (
            <aside className="my-auto">
              <ZoomControls />
            </aside>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default OfficeLayouts;

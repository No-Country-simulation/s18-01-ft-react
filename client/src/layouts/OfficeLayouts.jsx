import AppSearchBar from '@/components/Search/AppSearchBar';

const OfficeLayouts = ({ header, children }) => {
  return (
    <div>
      <header className="bg-white p-4 shadow">
        <AppSearchBar />
      </header>
      <main className="mt-5 flex flex-col items-center">{children}</main>
    </div>
  );
};

export default OfficeLayouts;

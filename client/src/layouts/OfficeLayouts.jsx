const OfficeLayouts = ({ header, children }) => {
  return (
    <div>
      {header && <header className="bg-white p-4 shadow">{header}</header>}
      <main className="mt-5 flex flex-row items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default OfficeLayouts;

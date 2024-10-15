import React from 'react';

function AppSearchBar() {
  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Buscar..."
        className="h-10 w-[400px] rounded-s-2xl p-5 outline-none"
      />
      <button className="cursor-pointer">
        <img
          target="_blank"
          src="../../../public/images/searchBar.png"
          className="flex h-10 w-auto justify-center rounded-e-2xl bg-white p-2"
        />
      </button>
    </div>
  );
}

export default AppSearchBar;

import React from 'react';
import AppSearchBar from '../Search/AppSearchBar';

function AppHeader() {
  return (
    <div className="flex h-28 w-auto items-center justify-center space-x-24">
      <button className="size-auto space-x-24 rounded-full bg-white p-2">---</button>
      <AppSearchBar />
      <div className="size-auto rounded-full bg-white p-2"> Avatar</div>
    </div>
  );
}

export default AppHeader;

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="flex max-w-3xl flex-col items-center justify-center">
      <div className="w-full text-center">Esta es la home</div>
      <div className="">
        <p>Como tas</p>
      </div>
      <Link
        to="office"
        className="bg-customBlue my-4 w-full rounded-md border px-1 py-5 text-black hover:bg-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-800/50 sm:px-16">
        Ir a la oficina
      </Link>
    </main>
  );
};

export default Home;

import React from 'react';

const Home = () => {
  return (
    <main className="flex max-w-3xl flex-col items-center justify-center">
      <div className="w-full text-center">Esta es la home</div>
      <div className={css.home}>
        <p>Como tas</p>
      </div>
    </main>
  );
};

export default Home;

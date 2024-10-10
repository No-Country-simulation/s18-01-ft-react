import React from 'react';
import LoginButton from '../../components/loginButton/loginButon.jsx';

const Home = () => {
  return (
    <main className="flex max-w-3xl flex-col items-center justify-center">
      <div className="w-full text-center">Esta es la home</div>
      <LoginButton />
    </main>
  );
};

export default Home;

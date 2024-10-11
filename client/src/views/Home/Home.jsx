import React, { useEffect } from 'react';
import { useAuth } from '../../context/authContext.jsx';
import LoginButton from '../../components/loginButton/loginButon.jsx';
import LogoutButton from '../../components/logoutButton/logoutButton.jsx';

const Home = () => {
  const { authUser } = useAuth();

  useEffect(() => {
    console.log('Session Storage:', sessionStorage);
  }, []);

  return (
    <main className="flex max-w-3xl flex-col items-center justify-center">
      <div className="w-full text-center">Esta es la home</div>
      {!authUser ? (
        <LoginButton />
      ) : (
        <div>
          <LogoutButton />
        </div>
      )}
    </main>
  );
};

export default Home;

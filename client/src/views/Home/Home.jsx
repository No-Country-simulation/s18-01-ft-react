import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../../components/loginButton/loginButon.jsx';
import LogoutButton from '../../components/logoutButton/logoutButton.jsx';

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Usuario autenticado:', user);
    }
  }, [isAuthenticated, user]);

  return (
    <main className="flex max-w-3xl flex-col items-center justify-center">
      <div className="w-full text-center">Esta es la home</div>
      {!isAuthenticated ? (
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

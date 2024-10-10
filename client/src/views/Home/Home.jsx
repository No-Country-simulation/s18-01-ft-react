import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../../components/loginButton/loginButon.jsx';
import LogoutButton from '../../components/logoutButton/logoutButton.jsx';

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <main className="flex max-w-3xl flex-col items-center justify-center">
      <div className="w-full text-center">Esta es la home</div>
      {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
    </main>
  );
};

export default Home;

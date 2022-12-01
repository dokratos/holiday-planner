import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Login = () => {
  const { handleGoogle, loading, error } = useFetch('/api/login');

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle
      });

      google.accounts.id.renderButton(document.getElementById('loginDiv'), {
        theme: 'filled_black',
        text: 'signin_with',
        shape: 'pill'
      });
    }
  }, [handleGoogle]);

  return (
    <>
      <nav style={{ padding: '2rem' }}>
        <Link to="/" style={{ color: '#ff5722' }}>
          Go Back
        </Link>
      </nav>
      <header style={{ textAlign: 'center' }}>
        <h1>Login to continue</h1>
      </header>
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
      </main>
      <footer></footer>
    </>
  );
};

export default Login;

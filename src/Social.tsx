import React, { FC, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import style from './App.module.scss';
import constants from './redux/constants';

const styles = {
  input: {
    borderRadius: 4,
    marginBottom: 16,
    padding: '8px 16px',
    lineHeight: '20px',
    outline: 'none',
    border: '1px solid lightgray',
    width: 240,
  },
  button: {
    borderRadius: 4,
    marginBottom: 16,
    padding: '8px 16px',
    outline: 'none',
    cursor: 'pointer',
    height: 40,
    background: '#0050c8',
    color: '#FFF',
    fontWeight: 600,
  },
  styles: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
const Log: FC<any> = () => {
  const code = window.location.search.split('?code=')[1];

  useEffect(() => {
    if (window.location.search) {
    }
  }, [code]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: constants.SHOW_HIDE_SIDEBAR, payload: false });
  }, [dispatch]);
  return (
    <div style={styles.styles}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <input style={styles.input} placeholder="username/email" />
        <input style={styles.input} placeholder="password" type="password" />
        <button style={styles.button}>Login</button>
        <a
          style={{ textDecoration: 'none' }}
          href={`https://www.facebook.com/v6.0/dialog/oauth?client_id=659857431222983&redirect_uri=http://localhost:3000&state={}`}
        >
          <div
            style={{
              height: 40,
              lineHeight: '40px',
              backgroundColor: '#39579a',
              marginBottom: 16,
              borderRadius: 4,
              color: '#fff',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            Sign in with Facebook
          </div>
        </a>
        <a
          style={{ textDecoration: 'none' }}
          href="https://github.com/login/oauth/authorize?scope=user:email&client_id=16e974e0ac7d4e33d13a"
        >
          <div
            style={{
              height: 40,
              lineHeight: '40px',
              backgroundColor: '#1a1c23',
              marginBottom: 16,
              borderRadius: 4,
              color: '#fff',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            Sign in with Github
          </div>
        </a>

        <GoogleLogin
          clientId="132789956544-5ujqfv92rqhf9vkm5a0f1n95qmbdiqnr.apps.googleusercontent.com"
          onSuccess={console.log}
          onFailure={console.log}
          className={style.google}
        >
          <span
            style={{
              fontSize: 12,
              marginLeft: -10,
              fontWeight: 600,
              color: '#1d1d1d',
            }}
          >
            Sign in with Google
          </span>
        </GoogleLogin>
      </div>
    </div>
  );
};

export default Log;

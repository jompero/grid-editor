import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';
import Debug from '../utils/Debug';

function Login() {
  const dispatch = useDispatch();

  const responseGoogle = (response: any) => {
    Debug(response);
    if (response.error) return;
    dispatch(login({
      name: response.profileObj.name,
      token: response.accessToken,
      profile: response.googleId,
    }));
  };

  return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_LOGIN_URL || ''}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
  );
}

export default Login;

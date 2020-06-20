import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { login, User } from '../reducers/userReducer';

function Login() {
  const dispatch = useDispatch();

  const responseGoogle = (response: any) => {
    console.log(response);
    if (response.error) return;
    dispatch(login({
      name: response.profileObj.name,
      token: response.accessToken,
      profile: response.googleId
    }));
  }

  return (
      <GoogleLogin
        clientId="566902547666-7bdampp3nip1c2pmp3bh7jp1bocpfg38.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
  )
}

export default Login;
import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/userReducer';
import Debug from '../utils/Debug';


function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    Debug('logged out');
  };

  return (
    <GoogleLogout
      clientId="566902547666-7bdampp3nip1c2pmp3bh7jp1bocpfg38.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={handleLogout}
    >
    </GoogleLogout>
  );
}

export default Logout;

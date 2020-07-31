import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';

function Login() {
  const dispatch = useDispatch();

  const handleClick = (event: any) => {
    dispatch(login({
      name: "Debug User",
      token: "token",
      profile: "debugId",
    }));
  };

  return (
      <button onClick={(event) => handleClick(event)}>
          Debug Login
      </button>
  );
}

export default Login;

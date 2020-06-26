export interface User {
  name: string,
  id?: string,
  token: string,
  profile: string
}

interface UserAction {
  type: string,
  data?: User
}

const loggedOut = {
  name: '',
  token: '',
  profile: ''
}

function userReducer(state: User = loggedOut, action: UserAction): User {
  switch (action.type) {
    case ('LOGIN'):
      return action.data || state;
    case ('LOGOUT'):
      return loggedOut;
    default:
      return state;
  }
}

export function login(user: User) {
  return {
    type: 'LOGIN',
    data: user,
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export default userReducer;

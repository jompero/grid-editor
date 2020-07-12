import { User, NoUser } from "../services/usersService";

interface UserAction {
  type: string,
  data?: User
}

function userReducer(state: User = NoUser, action: UserAction): User {
  switch (action.type) {
    case ('LOGIN'):
      return action.data || state;
    case ('LOGOUT'):
      return NoUser;
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

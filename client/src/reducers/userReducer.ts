import { User, NoUser, login as userLogin } from '../services/usersService';
import GridEditorThunk from '../utils/GridEditorThunk';
import { notify } from './notificationsReducer';
import Debug from '../utils/Debug';

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

export function login(user: User): GridEditorThunk {
  return (dispatch) => {
    userLogin(user.token)
      .then((response) => dispatch({
        type: 'LOGIN',
        data: Object.assign(response, user),
      }))
      .catch((err) => {
        Debug(err);
        dispatch(notify('Error while logging in.', 'error'));
      });
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export default userReducer;

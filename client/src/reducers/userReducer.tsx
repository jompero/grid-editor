export interface User {
    name: string,
    id?: string,
    token: string,
    profile: string
} 

interface UserAction {
    type: string,
    data: User
}

function userReducer(state: User | {} = {}, action: UserAction) {
    switch (action.type) {
        case ('LOGIN'):
            return action.data;
        case ('LOGOUT'):
            return {};
        default:
          return state;
      }
}

export function login(user: User) {
    return {
        type: 'LOGIN',
        data: user
    }
}

export function logout() {
    return {
        type: 'LOGOUT'
    }
}

export default userReducer;
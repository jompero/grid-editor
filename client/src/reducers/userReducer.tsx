export interface User {
    name?: string,
    id?: string,
    token?: string
} 

interface UserAction {
    type: string,
    data: {
        name: string,
        id: string,
        token: string
    }
}

function userReducer(state: User = {}, action: UserAction) {
    switch (action.type) {
        case ('LOGIN'):
            return action.data;
        case ('LOGOUT'):
            return {};
        default:
          return state;
      }
}

export function login(id: string, name: string, token: string) {
    return {
        type: 'LOGIN',
        data: {
            name,
            id,
            token
        }
    }
}

export function logout() {
    return {
        type: 'LOGOUT'
    }
}

export default userReducer;
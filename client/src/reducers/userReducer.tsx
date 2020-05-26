export interface User {
    username?: string,
    token?: string
} 

interface UserAction {
    type: string,
    data: {
        username: string,
        token: string
    }
}

function userReducer(state: User = {}, action: UserAction) {
    switch (action.type) {
        case ('LOGIN'):
            const { username, token } = action.data;
            return { username, token };
        default:
          return state;
      }
}

export function login(username: string, password: string) {
    return {
        type: 'Login',
        data: {
            username,
            token: password
        }
    }
}

export default userReducer;
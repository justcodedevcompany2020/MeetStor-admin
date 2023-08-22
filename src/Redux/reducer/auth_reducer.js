import store from "../store/auth_store"

export const Auth_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'login':
            localStorage.setItem('token', action.payload.token)
            temp.loginError = false
            temp.user = action.payload.user
            window.location = '/'
            break;
        case 'loginError':
            temp.loginError = true
            break;
        default:
            return temp;
    }
    return temp;
}
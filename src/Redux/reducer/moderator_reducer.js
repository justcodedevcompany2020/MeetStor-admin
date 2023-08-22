import store from "../store/moderator_store"

export const Moderator_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getModerators':
            temp.moderators = action.payload.data
            break;
        case 'deleteModerator':
            if (action.payload.status) {
                window.location = '/#/base/moderators'
            }
            break;
        case 'createModerator':
            temp.newUser = false
            if (action.payload.status) {
                temp.phoneError = false
                temp.newUser = true
            } else {
                temp.newUser = false
                if (action.payload?.message?.phone?.length) {
                    temp.phoneError = true
                } else {
                    temp.phoneError = false
                }
                if (action.payload?.message?.password_confirmation?.length > 0) {
                    temp.passwordError = true
                } else {
                    temp.passwordError = false
                }
            }
            break;
        case 'singleModerator':
            if (action.payload.message?.includes('Wrong user_id')) {
                window.location = '/'
            } else {
                temp.singleModerator = action.payload.data
            }
            break;
        case 'updateModerator':
            window.location = '/#/base/moderators'
            break;
        default:
            return temp;
    }
    return temp;
}
import store from "../store/user_store"

export const User_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getUsers':
            temp.users = action.payload.data
            if (action.payload.data.black_list_end_date != null) {
                temp.userIsBlacklisted = true
            } else {
                temp.userIsBlacklisted = false
            }
            break;
        case 'singleUser':
            console.log(action.payload);
            if (action.payload.status) {
                temp.singleUser = action.payload.data
            }
            break;
        case 'deleteAvatar':
            if (action.payload.status) {
                location.reload()
            }
            break;
        case 'getCountries':
            temp.countries = action.payload.data
            break;
        case 'getCities':
            temp.cities = action.payload.data
            break;
        case 'addBlacklist':
            if (action.payload.status) {
                temp.userIsBlacklisted = true
            }
            break;
        case 'removeFromBlacklist':
            if (action.payload.status) {
                temp.userIsBlacklisted = false
            }
            break;
        default:
            return temp;
    }
    return temp;
}
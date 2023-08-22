import store from "../store/gift_store"

export const Gift_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getGifts':
            if (action.payload.status) {
                temp.allGifts = action.payload.data.data
            }
            break;
        case 'getPresentedGifts':
            if (action.payload.status) {
                temp.presentedGifts = action.payload.data.data
            }
            break;
        default:
            return temp;
    }
    return temp;
}
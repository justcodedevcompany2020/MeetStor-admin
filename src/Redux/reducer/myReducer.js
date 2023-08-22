import { combineReducers } from 'redux'
import { Auth_reducer } from './auth_reducer'
import { Moderator_reducer } from './moderator_reducer'
import { User_reducer } from './user_reducer'
import { Gift_reducer } from './gift_reducer'
import { ForumCategory_reducer } from './forumCategory_reducer'

export default combineReducers({
    Auth_reducer,
    Moderator_reducer,
    User_reducer,
    Gift_reducer,
    ForumCategory_reducer
})

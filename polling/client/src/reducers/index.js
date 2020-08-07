import { combineReducers } from 'redux';
import userReducer from "./userReducer";
import queryReducer from "./queryReducer"

export default combineReducers({
    user: userReducer,
    spots: queryReducer
})
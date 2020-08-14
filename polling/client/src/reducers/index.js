import { combineReducers } from 'redux';
import userReducer from "./userReducer";
import queryReducer from "./queryReducer"
import viewReducer from "./viewReducer"

export default combineReducers({
    user: userReducer,
    spots: queryReducer,
    listView: viewReducer
})
import {
    LOG_IN,
    LOG_OUT
} from "../actions/types";

export default (state = {user:null}, action) => {
    switch (action.type){
        case LOG_IN:
            return {...state, user: action.payload}
        case LOG_OUT:
            return {...state, user: null}
        default:
            return state
    }
}
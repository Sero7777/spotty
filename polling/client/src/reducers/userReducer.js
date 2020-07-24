import {
    LOG_IN,
    LOG_OUT
} from "../actions/types";

export default (state = { username: null }, action) => {
    switch (action.type) {
        case LOG_IN:
            return { ...state, username: action.payload }
        case LOG_OUT:
            return { ...state, username: null }
        default:
            return state
    }
}
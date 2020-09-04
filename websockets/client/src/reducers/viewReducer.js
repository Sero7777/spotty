import {
    CHANGE_VIEW
} from "../actions/types";

export default (state = true, action) => {
    switch (action.type) {
        case CHANGE_VIEW:
            return state === false ? true : false
        default:
            return state
    }
}
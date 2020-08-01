import {
    GET_SPOTS
} from "../actions/types";

export default (state = [], action) => {
    switch (action.type) {
        case GET_SPOTS:
            console.log("Received get spots action")
            return action.payload
        default:
            return state
    }
}
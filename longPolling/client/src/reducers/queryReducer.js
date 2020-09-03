import {
    GET_SPOTS,
    ADD_SPOT,
    UPDATE_SPOT,
    DELETE_SPOT
} from "../actions/types";

export default (state = [], action) => {
    switch (action.type) {
        case GET_SPOTS:
            return action.payload
        case ADD_SPOT:
            return [ ...state, action.payload ]
        case UPDATE_SPOT:
            return state.map(spot => spot.id === action.payload.id ? action.payload : spot)
        case DELETE_SPOT:
            return state.filter(spot => spot.id !== action.payload)
        default:
            return state
    }
}
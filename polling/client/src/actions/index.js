import {
    LOG_IN,
    LOG_OUT
} from "./types";
import { userRequest } from "../api/spots";

export const logIn = formValues => async dispatch => {
    const response = await userRequest.post("/login", { ...formValues }, {withCredentials: true})

    console.log("Response from login: " + response)

    if (response.status === 200) {
        const userResponse = await userRequest.get("/user")

        console.log("Response from retrieving user: " + userResponse.data)

        const {username} = userResponse.data.user

        if (userResponse.status === 200) dispatch({ type: LOG_IN, payload: username })
    }

    return response
}

export const logOut = () => async dispatch => {
    const response = await userRequest.get("/logout", {withCredentials: true})

    console.log("Response from logout: " + response)

    if (response.status === 200) {
        dispatch({ type: LOG_OUT })
    }
}

export const register = formValues => async dispatch => {
    const response = await userRequest.post("/register", { ...formValues }, {withCredentials: true})

    if (response.status === 201) {
        const userResponse = await userRequest.get("/user")
        const {username} = userResponse.data.user

        if (userResponse.status === 200) dispatch({ type: LOG_IN, payload: username })
    }

    return response
}
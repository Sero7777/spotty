import {
    LOG_IN,
    LOG_OUT,
    GET_SPOTS,
    CHANGE_VIEW
} from "./types";
import { userRequest, spotRequest, queryRequest, commentRequest } from "../api/spots";
import {geocoder} from "../components/App"

export const logIn = formValues => async dispatch => {
    try {
        const response = await userRequest.post("/login", { ...formValues }, { withCredentials: true })

        if (response.status === 200) {
            const userResponse = await userRequest.get("/user")
            const { username } = userResponse.data.user
            if (userResponse.status === 200) dispatch({ type: LOG_IN, payload: username })
        }

        return response
    } catch (error) {
        return { status: 400 }
    }
}

export const getUser = () => async dispatch => {
    const userResponse = await userRequest.get("/user")
    const { username } = userResponse.data.user
    if (userResponse.status === 200) dispatch({ type: LOG_IN, payload: username })
}

export const logOut = () => async dispatch => {
    const response = await userRequest.post("/logout", { withCredentials: true })

    if (response.status === 200) {
        dispatch({ type: LOG_OUT })
    }
}

export const register = formValues => async dispatch => {
    const response = await userRequest.post("/register", { ...formValues }, { withCredentials: true })

    if (response.status === 201) {
        const userResponse = await userRequest.get("/user")
        const { username } = userResponse.data.user
        if (userResponse.status === 200) dispatch({ type: LOG_IN, payload: username })
    }

    return response
}

export const getSpots = () => async dispatch => {
    const response = await queryRequest.get("/get/all", { withCredentials: true })

    console.log("Querying query server for spots ...")

    if (response.status === 200) {
        dispatch({ type: GET_SPOTS, payload: response.data })
    }
}

export const createSpot = async formValues => {
    const res = await getGeoCoordinates(
        `${formValues.streetname.trim()} 
    ${formValues.zip.trim()} 
    ${formValues.city.trim()} 
    ${formValues.country.trim()}`)

    if (res.results.length < 1) return { status: 400, reason: "You have entered a Wrong Adress" }

    const { latitude, longitude } = res.results[0].coordinate
    formValues.latitude = latitude
    formValues.longitude = longitude

    const response = await spotRequest.post("/create", { ...formValues }, { withCredentials: true })

    console.log("Creating a spot ...")

    if (response.status === 201) return { status: response.status }
    return { status: 400, reason: "Something went wrong" }
}

const getGeoCoordinates = (address) => {
    return new Promise((resolve, reject) => {
        geocoder.lookup(address, (error, data) => {
            if (data) resolve(data)
            if (error) reject(error)
        })
    })
}

export const updateSpot = async formValues => {
    try {
        const response = await spotRequest.put("/update", { ...formValues }, { withCredentials: true })
        console.log("Updating a spot ...")
        return response.status

    } catch (error) {
        console.log(error.response)
        return error.response.data.status
    }
}

export const deleteSpot = async formValues => {
    try {
        const response = await spotRequest.delete("/delete", { data: { ...formValues } }, { withCredentials: true })
        console.log("Deleting a spot ...")
        return response.status
    } catch (error) {
        console.log(error.response)
        return error.response.data.status
    }
}

export const createComment = async formValues => {
    const response = await commentRequest.post("/create", { ...formValues }, { withCredentials: true })
    console.log("Creating a comment ...")

    return response.status
}

export const updateComment = async formValues => {
    const response = await commentRequest.put("/update", { ...formValues }, { withCredentials: true })
    console.log("Updating a spot ...")

    return response.status
}

export const deleteComment = async formValues => {
    const response = await commentRequest.delete("/delete", { data: { ...formValues } }, { withCredentials: true })
    console.log("Deleting a spot ...")

    return response.status
}

export const changeView = () => {
    return {
        type: CHANGE_VIEW
    }
}

export const dispatchSpotEvent = ({ type, payload }) => {
    return {
        type,
        payload
    }
}
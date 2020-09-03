import {
    LOG_IN,
    LOG_OUT,
    GET_SPOTS,
    CHANGE_VIEW
} from "./types";
import { userRequest, spotRequest, queryRequest, commentRequest } from "../api/spots";
import axios from "axios"

export const logIn = formValues => async dispatch => {
    const response = await userRequest.post("/login", { ...formValues }, { withCredentials: true })

    if (response.status === 200) {
        const userResponse = await userRequest.get("/user")
        const { username } = userResponse.data.user
        if (userResponse.status === 200) dispatch({ type: LOG_IN, payload: username })
    }

    return response
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

    const API_KEY = "-5aDcBs5PeFM7d14svqGwsElau2-KB0pP-4Rsx13tN4"

    const baseGeocodeUrl = "https://geocode.search.hereapi.com/v1/geocode?q="

    const geocodeRequestParams = {
        street: formValues.streetname.trim().replace(/\s/g, "+"),
        zip: formValues.zip.trim().replace(/\s/g, "+"),
        city: formValues.city.trim().replace(/\s/g, "+"),
        country: formValues.country.trim().replace(/\s/g, "+")
    }


    const finalRequestString = `${baseGeocodeUrl}${geocodeRequestParams.street}%2C+${geocodeRequestParams.zip}%2C+${geocodeRequestParams.city}%2C+${geocodeRequestParams.country}&apiKey=${API_KEY}`

    const geocodeRes = await axios.get(finalRequestString)

    if (geocodeRes.status === 200 && geocodeRes.data.items.length > 0) {
        const { lat, lng } = geocodeRes.data.items[0].position
        formValues.latitude = lat
        formValues.longitude = lng

        const response = await spotRequest.post("/create", { ...formValues }, { withCredentials: true })

        console.log("Creating a spot ...")
        return { status: response.status }
    }

    return { status: 400, reason: "Wrong Adress" }
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

export const connectToQueryService = () => async dispatch => {
    try {
        console.log("Calling connect Method()")
        const response = await queryRequest.get("/connect", { withCredentials: true });
        const { type, payload } = response.data
        if (response.status === 200) dispatch({ type, payload })
        return response.status
    } catch (error) {
        console.log("THIS IS AN ERROR")
    }
}
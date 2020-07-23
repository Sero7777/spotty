import axios from "axios";

const domainUrl = "http://spotty.com/api"

export const userRequest = axios.create({
    baseURL: `${domainUrl}/users`
})

export const spotRequest = axios.create({
    baseURL: "spotty.com/api/spots"
})

export const commentRequest = axios.create({
    baseURL: "spotty.com/api/comments"
})

export const queryRequest = axios.create({
    baseURL: "spotty.com/api/query"
})
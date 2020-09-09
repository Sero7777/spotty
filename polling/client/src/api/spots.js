import axios from "axios";

const domainUrl = "http://spotty.com/api"

export const userRequest = axios.create({
    baseURL: `${domainUrl}/users`
})

export const spotRequest = axios.create({
    baseURL: `${domainUrl}/spots`
})

export const commentRequest = axios.create({
    baseURL: `${domainUrl}/comments`
})

export const queryRequest = axios.create({
    baseURL: `${domainUrl}/query`
})

userRequest.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
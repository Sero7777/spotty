const axios = require("axios")
const http = require("http")

const user = {
    email: "1232242325@abc.de",
    username: "123222352445abcd",
    password: "password"
}

let cookies;
let amountOfSpots = 500

const register = async () => {
    try {
        const userRes = await axios.post("http://spotty.com/api/users/register", user)
        if (userRes.status === 201) {
            console.log("Successfully registered user")
            cookies = userRes.headers["set-cookie"]
            connect()
        }
    } catch (error) {
        // console.log(error.response.data)
        if (error.response.status === 400) {
            console.log("User already registered. Logging in ...")
            login()
        }
    }
}

const login = async () => {
    try {
        const loginRes = await axios.post("http://spotty.com/api/users/login", { email: user.email, password: user.password })
        cookies = loginRes.headers["set-cookie"]
        console.log("Successfully logged in")
        connect()
    } catch (err) {
        console.log(err)
    }
}

const connect = async () => {
    const response = await axios.get("http://spotty.com/api/query/connect", { headers: { "Cookie": String(cookies) } })
    if (response.status === 200){
        amountOfSpots++
        console.log(amountOfSpots)
        console.log("Received some data")
        await connect()
    } else if (response.status === 502) {
        console.log("Timeout")
        await connect()
    } else {
        console.log("Some error")
        setTimeout(async () => {
            await connect()
        }, 1000);
    }
    
}

const getRandomIntNumber = (from, to) => {
    return Math.floor((Math.random() * to) + from);
}

setTimeout(register, getRandomIntNumber(1, 5) * 1000);
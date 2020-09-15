const axios = require("axios")
const http = require("http");
const { time } = require("console");

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
    let timestamp = null;

    const doConnect = async () => {
        const response = await axios.post("http://spotty.com/api/query/connect", { timestamp }, { headers: { "Cookie": String(cookies) } })
        if (response.status === 200) {
            timestamp = response.data.timestamp
            console.log(response.data.spots.length)
            await doConnect()
        } else if (response.status === 502) {
            console.log("Timeout")
            await doConnect()
        } else {
            console.log("Some error")
            setTimeout(async () => {
                await doConnect()
            }, 1000);
        }
    }

    const res = await axios.get("http://spotty.com/api/query/get/all", { headers: { "Cookie": String(cookies) } })
   
    if (res.status === 200) {
        timestamp = res.data.timestamp
        console.log(res.data.spots.length)
        doConnect()
    }
}

const getRandomIntNumber = (from, to) => {
    return Math.floor((Math.random() * to) + from);
}

setTimeout(register, getRandomIntNumber(1, 5) * 1000);
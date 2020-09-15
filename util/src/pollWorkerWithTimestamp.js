const axios = require("axios")
const { workerData } = require('worker_threads');

const interval = workerData

const user = {
    email: "1232242325@abc.de",
    username: "123222352445abcd",
    password: "password"
}

let cookies;

const register = async () => {
    try {
        const userRes = await axios.post("http://spotty.com/api/users/register", user)
        if (userRes.status === 201) {
            console.log("Successfully registered user")
            cookies = userRes.headers["set-cookie"]
            poll()
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
        poll()
    } catch (err) {
        if (err.response.status === 400) {
            console.log("Something went wrong with logging in ...")
        }
    }
}

const poll = () => {
    let timestamp = null;

    const makeReq = async () => {
        if (!timestamp) {
            const spotsRes = await axios.post("http://spotty.com/api/query/get/all", {},  { headers: { "Cookie": String(cookies) } })
            timestamp = spotsRes.data.timestamp
            console.log(spotsRes.data.spots.length + " Spots received")
        } else {
            const spotsRes = await axios.post("http://spotty.com/api/query/get/all", {timestamp}, { headers: { "Cookie": String(cookies) } })
            timestamp = spotsRes.data.timestamp
            console.log(spotsRes.data.spots.length + " Spots received")
        }
    }

    setInterval(() => {
        makeReq()
        console.log("Fetching spots ...")
    }, interval);
}

const getRandomIntNumber = (from, to) => {
    return Math.floor((Math.random() * to) + from);
}

setTimeout(register, getRandomIntNumber(1, 5) * 1000);
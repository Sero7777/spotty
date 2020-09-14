const axios = require("axios")
const io = require('socket.io-client')

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

const connect = () => {
    const socket = io('http://spotty.com', {
        transportOptions: {
            polling: {
                extraHeaders: {
                    "Cookie": cookies
                }
            }
        }
    })
    socket.on('connect', () => {
        console.log("Connected to server")
    });

    socket.on("spotUpdated", () => console.log("Received data"))

    socket.on('disconnect', () => {
        console.log("Disconnected")
    });
}

const getRandomIntNumber = (from, to) => {
    return Math.floor((Math.random() * to) + from);
}

setTimeout(register, getRandomIntNumber(1, 5) * 1000);
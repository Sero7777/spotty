const axios = require("axios")
const { workerData } = require('worker_threads');

// const args = require("minimist")(process.argv.slice(2))
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
    // let interval = 5000
    // if (!args.i) console.log("No interval was provided. Using default interval of 5 seconds.")
    // else if (isNaN(args.i)) console.log("Provided an invalid interval. Using default interval of 5 seconds.")
    // else if (args.i < 1) console.log("Provided interval is too small. Using default interval of 5 seconds.") 
    // else interval = args.i * 1000
    setInterval(async () => {
        const spotsRes = await axios.get("http://spotty.com/api/query/get/all", { headers: { "Cookie": String(cookies) } })
        console.log("Fetching spots ...")
    }, interval);
}

const getRandomIntNumber = (from, to) => {
    return Math.floor((Math.random() * to) + from);
}

setTimeout(register, getRandomIntNumber(1, 60) * 1000);
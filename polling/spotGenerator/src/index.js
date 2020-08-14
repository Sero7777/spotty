const axios = require("axios")
const randomstring = require("randomstring");

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
            createRandomSpots()
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
        createRandomSpots()
    } catch (err) {
        if (err.response.status === 400) {
            console.log("Something went wrong with logging in ...")
        }
    }
}

const createSpot = async (randomSpot) => {
    try {
        console.log("Creating spot")
        console.log(randomSpot)
        const spotRes = await axios.post("http://spotty.com/api/spots/create", randomSpot, { headers: { "Cookie": String(cookies) } })
        console.log(spotRes.data)
        console.log("Successfully created a spot")
    } catch (error) {
        console.log(error.response.data)
    }
}

const createRandomSpots = () => {
    for (let index = 0; index < 1000; index++) {
        const randomSpot = {
            title: randomstring.generate(10),
            description: randomstring.generate(20),
            upvotes: 0,
            streetname: randomstring.generate(),
            zip: randomstring.generate(),
            city: randomstring.generate(),
            country: randomstring.generate(),
            category: randomstring.generate(),
            latitude: getRandomFloatNumber(52.397966, 52.618892, 5),
            longitude: getRandomFloatNumber(13.205249, 13.656553, 5),
            pic: ""
        }

        createSpot(randomSpot)
    }
}

const getRandomFloatNumber = (from, to, fixed) => {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

register()
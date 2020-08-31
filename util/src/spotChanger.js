const axios = require("axios")
const randomstring = require("randomstring");

const args = require("minimist")(process.argv.slice(2))

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
            changeSpotsRandomly()
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
        changeSpotsRandomly()
    } catch (err) {
        if (err.response.status === 400) {
            console.log("Something went wrong with logging in ...")
        }
    }
}

const createSpot = async (randomSpot) => {
    try {
        console.log("Creating spot ...")
        const spotRes = await axios.post("http://spotty.com/api/spots/create", randomSpot, { headers: { "Cookie": String(cookies) } })
    } catch (error) {
        console.log(error.response.data)
    }
}

const createRandomSpot = () => {
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

const changeSpotsRandomly = () => {
    if (!args.i) console.log("No interval was provided. Using default interval of 5 seconds.")
    else if (isNaN(args.i)) console.log("Provided an invalid interval. Using default interval of 5 seconds.")
    else if (args.i < 1) console.log("Provided interval is too small. Using default interval of 5 seconds.") 
    else {
        setInterval(async () => {
            const rand = getRandomIntNumber(0, 2)
            if (rand < 1) createRandomSpot()
            else deleteRandomSpot()
        }, args.i * 1000);
    }

    changeSpotsRandomInterval()
}

const changeSpotsRandomInterval = () => {
    const rand = getRandomIntNumber(1, 3) * 1000
    setTimeout(() => {
        const rand = getRandomIntNumber(0, 2)
        if (rand < 1) createRandomSpot()
        else deleteRandomSpot()
        changeSpotsRandomInterval()
    }, rand);
    
}

const deleteRandomSpot = async () => {
    console.log("Deleting spot ...")
    const spotsRes = await axios.get("http://spotty.com/api/query/get/all", { headers: { "Cookie": String(cookies) } })
    const spots = spotsRes.data
    let spotToDelete = null;
    if (spots.length > 0) spotToDelete = spots[getRandomIntNumber(0, spots.length - 1)]
    try {
        await axios.delete("http://spotty.com/api/spots/delete", { data: { id: spotToDelete.id }, headers: { "Cookie": String(cookies) } })
    } catch (error) {
        console.log(error.response.data)
    }
}

const getRandomIntNumber = (from, to) => {
    return Math.floor((Math.random() * to) + from);
}

const getRandomFloatNumber = (from, to, fixed) => {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

register()
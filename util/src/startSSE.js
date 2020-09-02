const {Worker} = require("worker_threads")
const args = require("minimist")(process.argv.slice(2))

const startPolling = () => {
    let clients = 5

    if (!args.c) console.log("No amount of clients specified. Defaulting to 5 clients.")
    else if (isNaN(args.c)) console.log("Provided an invalid client amount. Defaulting to 5 clients.")
    else if (args.c < 1) console.log("Provided amount of clients is too small. Using default amount of 5 clients.") 
    else clients = args.c

    for (let i=0; i < clients; i++){
        const worker = new Worker("./sseWorker.js")
    }
}

startPolling()
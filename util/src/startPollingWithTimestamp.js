const {Worker} = require("worker_threads")
const args = require("minimist")(process.argv.slice(2))

const startPolling = () => {
    let interval = 5000
    let clients = 5
    if (!args.i) console.log("No interval was provided. Using default interval of 5 seconds.")
    else if (isNaN(args.i)) console.log("Provided an invalid interval. Using default interval of 5 seconds.")
    else if (args.i < 1) console.log("Provided interval is too small. Using default interval of 5 seconds.") 
    else interval = args.i * 1000

    if (!args.c) console.log("No amount of clients specified. Defaulting to 5 clients.")
    else if (isNaN(args.c)) console.log("Provided an invalid client amount. Defaulting to 5 clients.")
    else if (args.c < 1) console.log("Provided amount of clients is too small. Using default amount of 5 clients.") 
    else clients = args.c

    for (let i=0; i < clients; i++){
        const worker = new Worker("./pollWorkerWithTimestamp.js", {
            workerData: interval
        })
    }
}

startPolling()
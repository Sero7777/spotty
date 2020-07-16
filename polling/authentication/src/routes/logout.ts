import express, {Request, Response} from "express"

const router = express.Router()

router.post("/api/members/logout", async (req: Request, res:Response) => {
    // clear session

    // send empty reponse back

    res.send({})
})

export {router as logoutRouter}
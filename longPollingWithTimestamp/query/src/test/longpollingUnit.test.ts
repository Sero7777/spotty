import { subscribe, unsubscribe, clients } from "../longpolling";
import {Response} from "express"

const setup = () => clients.length = 0

it("adds a req to clients array", () => {
    setup()
    expect(clients.length).toBe(0)
    const res = {} as Response
    subscribe("aa", res, Date.now())
    expect(clients.length).toBe(1)
})

it("removes a req from clients array", () => {
    setup()
    expect(clients.length).toBe(0)
    const res = {} as Response
    subscribe("aa", res, Date.now())
    expect(clients.length).toBe(1)
    unsubscribe("aa")
    expect(clients.length).toBe(0)
})
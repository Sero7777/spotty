import express, { Request, Response } from "express";
import { Spot } from "../models/spot";
import { Uri } from "./uris";
import { auth } from "@spotty/shared";

const getAllSpotsRouter = express.Router();

getAllSpotsRouter.get(
  Uri.READALL,
  auth,
  async (req: Request, res: Response) => {
    const spots = await Spot.find({});
    const timestamp = Date.now()
    res.send({spots, timestamp});
  }
);

export { getAllSpotsRouter };

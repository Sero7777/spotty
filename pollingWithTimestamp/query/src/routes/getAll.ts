import express, { Request, Response } from "express";
import { Spot } from "../models/spot";
import { Uri } from "./uris";
import { auth } from "@spotty/shared";

const getAllSpotsRouter = express.Router();

getAllSpotsRouter.post(
  Uri.READALL,
  auth,
  async (req: Request, res: Response) => {
    const timestampClient = req.body.timestamp;
    let spots;

    if (!timestampClient) spots = await Spot.find({});
    else spots = await Spot.find({ timestamp: {$gt: timestampClient} });

    res.send({spots: spots, timestamp: Date.now()});
  }
);

export { getAllSpotsRouter };

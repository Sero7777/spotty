import express, { Request, Response } from "express";
import { Spot } from "../models/spot";
import { Uri } from "./uris";

const getAllSpotsRouter = express.Router();

getAllSpotsRouter.get(Uri.READALL, async (req: Request, res: Response) => {
  const spots = await Spot.find({});
  res.send(spots);
});

export { getAllSpotsRouter };

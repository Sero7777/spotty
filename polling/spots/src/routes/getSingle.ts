import express, { Request, Response } from "express";
import { Spot } from "../models/spot";
import { Uri } from "./uris";
import { SpotNotFoundException } from "@spotty/shared";

const getSingleSpotRouter = express.Router();

getSingleSpotRouter.get(Uri.READ, async (req: Request, res: Response) => {
  const { id } = req.body;
  const spot = await Spot.findById(id);

  if (!spot) {
    throw new SpotNotFoundException();
  }

  res.send(spot);
});

export { getSingleSpotRouter };

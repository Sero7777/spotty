import express, { Request, Response } from "express";
import { Spot } from "../models/spot";
import { Uri } from "./uris";
import { SpotNotFoundException, auth } from "@spotty/shared";

const getSingleSpotRouter = express.Router();

getSingleSpotRouter.get(Uri.READ, auth, async (req: Request, res: Response) => {
  const _id = req.body.id;
  const spot = await Spot.findOne({ _id });

  if (!spot) {
    throw new SpotNotFoundException();
  }

  res.send(spot);
});

export { getSingleSpotRouter };

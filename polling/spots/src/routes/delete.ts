import express, { Request, Response } from "express";
import {
  auth,
  SpotNotFoundException,
  UnauthorizedException,
} from "@spotty/shared";
import { Spot } from "../models/spot";
import { Uri } from "./uris";
import { SpotDeletedPublisher } from "../publisher/SpotDeletedPublisher";
import { natsContainer } from "../nats-container";

const deleteSpotRouter = express.Router();

deleteSpotRouter.delete(
  Uri.DELETE,
  auth,
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const spot = await Spot.findById({ id });

    if (!spot) {
      throw new SpotNotFoundException();
    }

    if (spot.username !== req.user!.username) {
      throw new UnauthorizedException();
    }

    const deletedSpot = await Spot.deleteOne({ id });

    new SpotDeletedPublisher(natsContainer.client).publish({
      id: spot.id,
    });

    res.send(deletedSpot);
  }
);

export { deleteSpotRouter };

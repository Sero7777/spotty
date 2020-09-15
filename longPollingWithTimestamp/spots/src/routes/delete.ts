import express, { Request, Response } from "express";
import {
  auth,
  SpotNotFoundException,
  UnauthorizedException,
} from "@spotty/shared";
import { Spot, isValidId } from "../models/spot";
import { Uri } from "./uris";
import { SpotDeletedPublisher } from "../publisher/SpotDeletedPublisher";
import { natsContainer } from "../nats-container";

const deleteSpotRouter = express.Router();

deleteSpotRouter.delete(
  Uri.DELETE,
  auth,
  async (req: Request, res: Response) => {
    const _id = req.body.id;

    if (!isValidId(_id)) throw new SpotNotFoundException()

    const spot = await Spot.findOne({ _id })

    if (!spot) {
      throw new SpotNotFoundException();
    }

    if (spot.username !== req.user!.username) {
      throw new UnauthorizedException();
    }

    const timestamp = Date.now()
    spot.set({
        timestamp,
        enabled: false
    })

    await spot.save();

    new SpotDeletedPublisher(natsContainer.client).publish({
      id: spot.id,
      timestamp
    });

    res.send();
  }
);

export { deleteSpotRouter };

import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Spot } from "../models/spot";
import {
  SpotNotFoundException,
  auth,
  UnauthorizedException,
  requestValidator,
} from "@spotty/shared";
import { Uri } from "./uris";
import { SpotUpdatedPublisher } from "../publisher/SpotUpdatedPublisher";
import { natsContainer } from "../nats-container";

const updateSpotRouter = express.Router();

updateSpotRouter.put(
  Uri.UPDATE,
  auth,
  [
    body("title")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Title has to have a minimun length of 10 characters"),
    body("username").notEmpty().withMessage("A username has to be specified"),
    body("description")
      .trim()
      .isLength({ min: 20 })
      .withMessage("Description has to have a minimun length of 20 characters"),
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("A Rating between 1 and 5 has to be provided"),
    body("streetname")
      .not()
      .isEmpty()
      .withMessage("A streetname has to be specified"),
    body("zip").notEmpty().withMessage("A zip code has to be specified"),
    body("city").notEmpty().withMessage("A city has to be specified"),
    body("country")
      .not()
      .isEmpty()
      .withMessage("A country has to be specified"),
    body("category").notEmpty().withMessage("A category has to be specified"),
    body("latitude")
      .isFloat({ min: -90, max: 90 })
      .withMessage("A latitude has to be specified"),
    body("longitude")
      .isFloat({ min: -180, max: 180 })
      .withMessage("A longitude has to be specified"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { id } = req.body;

    const {
      title,
      description,
      rating,
      streetname,
      zip,
      city,
      country,
      category,
      latitude,
      longitude,
      pic,
    } = req.body;

    const spot = await Spot.findById({ id });

    if (!spot) {
      throw new SpotNotFoundException();
    }

    if (spot.username !== req.user!.username) {
      throw new UnauthorizedException();
    }

    spot.set({
      title,
      description,
      rating,
      streetname,
      zip,
      city,
      country,
      category,
      latitude,
      longitude,
      pic,
    });

    await spot.save();

    new SpotUpdatedPublisher(natsContainer.client).publish({
      id: spot.id,
      version: spot.version,
      title: spot.title,
      pic: spot.pic,
      username: spot.username,
      description: spot.description,
      rating: spot.rating,
      streetname: spot.streetname,
      zip: spot.zip,
      city: spot.city,
      country: spot.country,
      category: spot.category,
      latitude: spot.latitude,
      longitude: spot.longitude,
    });

    res.send(spot);
  }
);

export { updateSpotRouter };

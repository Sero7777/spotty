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
    res.send(spots);
  }
);



export { getAllSpotsRouter };

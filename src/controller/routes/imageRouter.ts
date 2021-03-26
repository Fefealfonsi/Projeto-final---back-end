import express from "express";
import { ImageController } from "../ImageController";

export const imageRouter = express.Router();

const imageController = new ImageController();

imageRouter.post("/create", imageController.create);
imageRouter.get("/getImage", imageController.getAllImages);
imageRouter.get("/getImage/:id", imageController.getImageById);
imageRouter.delete("/delete/:id", imageController.deleteImage);
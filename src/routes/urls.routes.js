import { Router } from "express";
import { createUrl } from "../controllers/urls.controller.js";
import validateAuth from "../middlewares/validateAuth.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schemas.js";

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateAuth,
  validateSchema(urlSchema),
  createUrl
);

export default urlsRouter;

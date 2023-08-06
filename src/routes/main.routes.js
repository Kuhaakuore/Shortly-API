import { Router } from "express";
import { getRanking } from "../controllers/main.controller.js";

const mainRouter = Router();

mainRouter.get("/ranking", getRanking);

export default mainRouter;
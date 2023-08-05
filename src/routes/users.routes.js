import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { signUpSchema } from "../schemas/user.schemas.js";
import { signUp } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), signUp);

export default usersRouter;
import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/user.schemas.js";
import { signUp, signIn, getUserData } from "../controllers/users.controller.js";
import validateAuth from "../middlewares/validateAuth.middleware.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), signUp);
usersRouter.post("/signin", validateSchema(signInSchema), signIn);
usersRouter.get("/users/me", validateAuth, getUserData);

export default usersRouter;
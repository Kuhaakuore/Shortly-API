import { Router } from "express";
import usersRouter from "./users.routes.js";
import urlsRouter from "./urls.routes.js";
import mainRouter from "./main.routes.js";

const router = Router();

router.use(usersRouter);
router.use(urlsRouter);
router.use(mainRouter);

export default router;

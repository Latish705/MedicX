import { Router } from "express";
import userRouter from "./user/routes/route";
import startUpRouter from "./startup/routes/route";

const appRouter = Router();

appRouter.use("/user", userRouter);
appRouter.use("/startup", startUpRouter);

export default appRouter;

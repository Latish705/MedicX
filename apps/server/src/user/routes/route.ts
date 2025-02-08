import { Router } from "express";
import { isFirstLogin } from "../controller/auth.controller";
import verifyToken from "../../middleware/verifyGoogle";

const userRouter = Router();

userRouter.get("/first_login",verifyToken, isFirstLogin);

export default userRouter;

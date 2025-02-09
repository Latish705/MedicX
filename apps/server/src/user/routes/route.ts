import { Router } from "express";
import { isFirstLogin, ocr, signup } from "../controller/auth.controller";
import verifyToken from "../../middleware/verifyGoogle";

const userRouter = Router();

userRouter.get("/first_login", verifyToken, isFirstLogin);
userRouter.post("/signup", signup);

userRouter.post("/ocr", verifyToken, ocr);

export default userRouter;

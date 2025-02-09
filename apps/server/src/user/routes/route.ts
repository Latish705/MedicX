import { Router } from "express";
import { isFirstLogin } from "../controller/auth.controller";
import verifyToken from "../../middleware/verifyGoogle";
import { getDetails } from "../controller/userDetails.controlelr";

const userRouter = Router();

userRouter.get("/first_login",verifyToken, isFirstLogin);
userRouter.get("/getDetails",getDetails)

export default userRouter;

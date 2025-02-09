import { Router } from "express";
<<<<<<< HEAD
import { isFirstLogin } from "../controller/auth.controller";
import verifyToken from "../../middleware/verifyGoogle";
import { getDetails } from "../controller/userDetails.controlelr";

const userRouter = Router();

userRouter.get("/first_login",verifyToken, isFirstLogin);
userRouter.get("/getDetails",getDetails)
=======
import {
  fillMedicalHistory,
  getAdvice,
  isFirstLogin,
  ocr,
  signup,
} from "../controller/auth.controller";
import verifyToken from "../../middleware/verifyGoogle";
import upload from "../../utils/multer";

const userRouter = Router();

userRouter.get("/first_login", verifyToken, isFirstLogin);
userRouter.post("/signup", signup);
userRouter.post("/fill_medical_history", verifyToken, fillMedicalHistory);

userRouter.post(
  "/ocr",
  upload.fields([{ name: "prescriptionImage", maxCount: 1 }]),
  verifyToken,
  ocr
);

userRouter.post("/symptoms", verifyToken, getAdvice);
>>>>>>> 808ca0c42e893979f7cc0c0a7c6ab6144c77f7f1

export default userRouter;

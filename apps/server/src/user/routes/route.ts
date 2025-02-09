import { Router } from "express";
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

export default userRouter;

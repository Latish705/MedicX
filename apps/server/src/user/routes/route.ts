import { Router } from "express";
import { upload } from "../../utils/multer";
import { getPrescription } from "../controller/userController";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("Hello User");
});

userRouter.post(
  "/get_prescription",
  upload.fields([{ name: "prescriptionImage", maxCount: 1 }]),
  getPrescription
);

export default userRouter;

import { Request, Response, NextFunction } from "express";
import admin from "../utils/firebase";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }

    const user = await admin.auth().verifyIdToken(token);

    // const userRecord = User
    // req.user = payload;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default verifyToken;

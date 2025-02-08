import { Request, Response, NextFunction } from "express";
import admin from "../utils/firebase";
import User from "../user/models/userModel";

const verifyToken = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(token);


    const existingUser = await User.find({googleId: decodedToken.uid});
    // const userRecord = User
    //@ts-ignore
    req.user = existingUser[0];
    next();
  } catch (error) {
    console.log(error);
  }
};

export default verifyToken;

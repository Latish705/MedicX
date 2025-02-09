import { Request, Response, NextFunction } from "express";
import admin from "../utils/firebase";
import User from "../user/models/userModel";

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);

    const existingUser = await User.findOne({ googleId: decodedToken.uid });

    // @ts-ignore
    req.googleId = decodedToken.uid;


    // const existingUser = await User.find({googleId: decodedToken.uid});
    // const userRecord = User
    console.log(existingUser);
    //@ts-ignore
    req.user = existingUser;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default verifyToken;

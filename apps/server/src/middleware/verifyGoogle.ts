import { Request, Response, NextFunction } from "express";
import admin from "../utils/firebase";
import User from "../user/models/userModel";

<<<<<<< HEAD
const verifyToken = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
=======
const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
>>>>>>> 808ca0c42e893979f7cc0c0a7c6ab6144c77f7f1
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
<<<<<<< HEAD
=======
    console.log(decodedToken);

    const existingUser = await User.findOne({ googleId: decodedToken.uid });

    // @ts-ignore
    req.googleId = decodedToken.uid;
>>>>>>> 808ca0c42e893979f7cc0c0a7c6ab6144c77f7f1


    const existingUser = await User.find({googleId: decodedToken.uid});
    // const userRecord = User
    //@ts-ignore
<<<<<<< HEAD
    req.user = existingUser[0];
=======
    req.user = existingUser;
>>>>>>> 808ca0c42e893979f7cc0c0a7c6ab6144c77f7f1
    next();
  } catch (error) {
    console.log(error);
  }
};

export default verifyToken;

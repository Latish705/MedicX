import admin from "../../utils/firebase";
import User from "../models/userModel";
import { Request, Response } from "express";

export const isFirstLogin = async (req: Request, res: Response):Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        // Verify the Firebase token
        const decodedToken = await admin.auth().verifyIdToken(token);
        const googleId = decodedToken.uid;

        // Check if the user exists in the database
        const user = await User.findOne({ googleId });

        if (user) {
            res.status(200).json({ success: true, isFirstLogin: false });
            return;
        } else {
            res.status(200).json({ success: true, isFirstLogin: true });
            return ;
        }
    } catch (error) {
        console.error("Error in isFirstLogin:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }
};

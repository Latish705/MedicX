import axios from "axios";
import admin from "../../utils/firebase";
import MedicalHistory from "../models/medicalHistory";
import User from "../models/userModel";
import { Request, Response } from "express";
import uploadImage from "../../utils/cloudinary";
import { R } from "@upstash/redis/zmscore-C3G81zLz";

export const isFirstLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
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
      return;
    }
  } catch (error) {
    console.error("Error in isFirstLogin:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore
    const user = req.user;

    const { email, name, phone, age, aadhar } = req.body;
    if (!email || !name || !phone || !age || !aadhar) {
      res.status(400).json({ success: false, message: "Missing fields" });
      return;
    }

    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }
    const newUser = new User({
      email,
      name,
      phone,
      age,
      aadhar,
      googleId: user.googleId,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created",
      user: {
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        age: newUser.age,
      },
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};

export const fillMedicalHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // @ts-ignore
    const user = req.user;

    const {
      pre_existing_conditions,
      allergies,
      medications,
      past_surgeries,
      lifestyle,
      recent_issues,
    } = req.body;

    if (
      !pre_existing_conditions ||
      !allergies ||
      !medications ||
      !past_surgeries ||
      !lifestyle ||
      !recent_issues
    ) {
      res.status(400).json({ success: false, message: "Missing fields" });
      return;
    }

    const medicalHistory = new MedicalHistory({
      userId: user._id,
      pre_existing_conditions,
      allergies,
      medications,
      past_surgeries,
      lifestyle,
      recent_issues,
    });
    await medicalHistory.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Medical history saved",
        userId: user._id,
      });
  } catch (error: any) {
    console.log(error);
  }
};

export const ocr = async (req: Request, res: Response): Promise<void> => {
  try {
    let prescriptionImage: any;
    if (req.files && "prescriptionImage" in req.files) {
      prescriptionImage = req.files.prescriptionImage[0].filename;
    } else {
      throw new Error("Prescription file not found");
    }
    // Upload image to cloudinary
    const imageUploaded = uploadImage(prescriptionImage);

    const mlBackendUrl = process.env.ML_BACKEND_URL;
    axios
      .post(`${mlBackendUrl}/ocr`, { image_url: imageUploaded })
      .then((response) => {
        res.status(200).json({ success: true, data: response.data });
      })
      .catch((error) => {
        console.error("Error in ocr:", error);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
        return;
      });
  } catch (error) {
    console.error("Error in ocr:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};

export const getAdvice = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore
    const user = req.user;

    const { symptoms } = req.body;

    if (!symptoms) {
      res.status(400).json({ success: false, message: "Missing fields" });
      return;
    }

    const mlBackendUrl = process.env.ML_BACKEND_URL;
    axios
      .post(`${mlBackendUrl}/advice`, { symptoms })
      .then((response) => {
        res.status(200).json({ success: true, data: response.data });
      })
      .catch((error) => {
        console.error("Error in getAdvice:", error);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
        return;
      });
  } catch (error) {
    console.log(error);
  }
};

// export const getPrescription = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     //@ts-ignore
//     const user = req.user;
//     let prescriptionImage: any;
//     if (req.files && "prescriptionImage" in req.files) {
//       prescriptionImage = req.files.prescriptionImage[0].filename;
//     } else {
//       throw new Error("Prescription file not found");
//     }
//     // here we are going to model prescription
//     const medicalHistory = new MedicalHistory({
//       userId: user.uid,
//     });
//     await medicalHistory.save();
//     res.status(201).json({ message: "Prescription saved" });
//   } catch (error) {
//     console.log(error);
//   }
// };

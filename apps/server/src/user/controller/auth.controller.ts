import axios from "axios";
import admin from "../../utils/firebase";
import MedicalHistory from "../models/medicalHistory";
import User from "../models/userModel";
import { Request, Response } from "express";
import { uploadOnCloudinary } from "../../utils/cloudinary";
import precriptionModel from "../models/prescriptionModel";

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
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);

    const {  name, phone, age, aadhar } = req.body;
    if ( !name || !phone || !age || !aadhar) {
      res.status(400).json({ success: false, message: "Missing fields" });
      return;
    }
    const email = decodedToken.email
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
      googleId: decodedToken.uid,
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
    // @ts-ignore
    const googleId = req.googleId;
    console.log(user, googleId);

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
    res.status(201).json({
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
    // @ts-ignore
    const user = req.user;
    //@ts-ignore
    const googleId = req.googleId;
    let prescriptionImage: any;
    // console.log(req.files);
    if (req.files && "prescriptionImage" in req.files) {
      prescriptionImage = req.files.prescriptionImage[0].filename;
    } else {
      throw new Error("Prescription file not found");
    }

    //@ts-ignore
    const avatarLocalPath = req.files.prescriptionImage[0].path;

    const uploadedImage = await uploadOnCloudinary(avatarLocalPath);

    console.log(req.files);

    //@ts-ignore
    console.log(req.files.prescriptionImage[0].path);

    console.log(uploadedImage);

    // Upload image to cloudinary
    // const imageUploaded = uploadImage(prescriptionImage);
    // console.log(imageUploaded);

    const mlBackendUrl = process.env.ML_BACKEND_URL;
    console.log(mlBackendUrl);

    
    await axios
      .post(`${mlBackendUrl}/ocr`, { image_url: uploadedImage?.url })
      .then((response) => {
        const prescription = new precriptionModel({
        userId: user._id,
        url: uploadedImage?.url,
        text: response.data.text,
      })
        res.status(200).json({ success: true, data: response.data });
      })
      .catch((error) => {
        // console.error("Error in ocr:", error);
        console.log("ocr error",error);
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
      .post(`${mlBackendUrl}/assess_symptoms`, { symptoms })
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

// function uploadImage(prescriptionImage: any) {
//   throw new Error("Function not implemented.");
// }
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

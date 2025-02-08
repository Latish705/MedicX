import { Request, Response } from "express";
import MedicalHistory from "../models/medicalHistory";

export const getPrescription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //@ts-ignore
    const user = req.user;
    let prescriptionImage: any;
    if (req.files && "prescriptionImage" in req.files) {
      prescriptionImage = req.files.prescriptionImage[0].filename;
    } else {
      throw new Error("Prescription file not found");
    }
    // here we are going to model prescription

    const medicalHistory = new MedicalHistory({
      userId: user.uid,
    });

    await medicalHistory.save();

    res.status(201).json({ message: "Prescription saved" });
  } catch (error) {
    console.log(error);
  }
};

import mongoose from "mongoose";
import { getPrescription } from "../controller/userController";

interface IMedicalHistory extends Document {
  userId: string;
  prescriptionImage: string;
  prescription: string;
}

const medicalHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  prescriptionImage: {
    type: String,
    required: true,
  },
  prescription: {
    type: String,
    required: true,
  },
});

const MedicalHistory = mongoose.model<IMedicalHistory>(
  "MedicalHistory",
  medicalHistorySchema
);

export default MedicalHistory;

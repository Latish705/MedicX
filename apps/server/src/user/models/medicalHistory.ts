import mongoose from "mongoose";

// "age": 45,

//     "pre_existing_conditions": ["Type 2 Diabetes", "Hypertension"],
//     "allergies": ["Penicillin", "Aspirin"],
//     "medications": {
//         "Metformin": "500mg daily",
//         "Lisinopril": "10mg daily"
//     },
//     "past_surgeries": ["Appendectomy (2015)"],
//     "lifestyle": {
//         "smoking": False,
//         "alcohol": "Occasional",
//         "exercise": "Moderate"
//     },
//     "recent_issues": ["Seasonal allergies", "Occasional acid reflux"]

interface IMedicalHistory extends Document {
  userId: string;
  pre_existing_conditions: string[];
  allergies: string[];
  medications: {
    [key: string]: string;
  };
  past_surgeries: string[];
  lifestyle: {
    smoking: boolean;
    alcohol: string;
    exercise: string;
  };
  recent_issues: string[];
}
const medicalHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    pre_existing_conditions: {
      type: [String],
      default: [],
    },
    allergies: {
      type: [String],
      default: [],
    },
    medications: {
      type: Object,
      default: {},
    },
    past_surgeries: {
      type: [String],
      default: [],
    },
    lifestyle: {
      type: Object,
      default: {},
    },
    recent_issues: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);
const MedicalHistory = mongoose.model<IMedicalHistory>(
  "MedicalHistory",
  medicalHistorySchema
);
export default MedicalHistory;

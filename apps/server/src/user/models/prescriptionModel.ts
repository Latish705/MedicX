import mongoose from "mongoose";


interface IPrecription extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  url: string;
  text: string;
}

const precriptionSchema= new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  url: { type: String, required: true, trim: true },
  text: {
    type: String,
    required: true,
    trim: true,
  },
});

const precriptionModel = mongoose.model<IPrecription>("Prescription", precriptionSchema);

export default precriptionModel;

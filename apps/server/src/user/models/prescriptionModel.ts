import mongoose from "mongoose";

interface IPrecription extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  url: string;
  text: string;
}

const userSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  url: { type: String, required: true, trim: true },
  text: {
    type: String,
    required: true,
    trim: true,
  },
});

const precriptionModel = mongoose.model<IPrecription>("User", userSchema);

export default precriptionModel;

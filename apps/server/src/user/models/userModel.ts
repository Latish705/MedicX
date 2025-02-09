import mongoose from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    default: "user",
  },
  prescription :{
    type : mongoose.Schema.ObjectId,
    
  },
  aadhar :{
    type:String,
    
  }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;

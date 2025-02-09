import mongoose from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  age: number;
  aadhar: string;
  googleId: string;
}

const userSchema = new mongoose.Schema(
  {
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
    aadhar: {
      type: String,
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
    },
  },
<<<<<<< HEAD
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
=======
  { timestamps: true }
);
>>>>>>> 808ca0c42e893979f7cc0c0a7c6ab6144c77f7f1

const User = mongoose.model<IUser>("User", userSchema);

export default User;

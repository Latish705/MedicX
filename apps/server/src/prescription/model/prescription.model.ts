import mongoose from "mongoose";

interface IPrecription extends Document {
    text: string;
}

const userSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    doctorId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Doctor'},
    text: {
        type: String,
        required: true,
        trim: true,
    },
});

const precriptionModel = mongoose.model<IPrecription>("User", userSchema);

export default precriptionModel;

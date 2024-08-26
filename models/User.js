import mongoose, { models } from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    profilepicture: { type: String },
    coverpicture: { type: String },
    razorpayid: { type: String },
    razorpaysecret: { type: String },
    timestamp: { type: String, default: Date.now }
});

export default models.User || model("User", userSchema)
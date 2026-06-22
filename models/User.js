import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  coverImage: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  username: { type: String, unique: true, required: true },
  bio: { type: String, default: "No bio available" },
  creator: { type: Boolean, default: false },
  supporters: { type: Number, default: 0 },
  projects: { type: Number, default: 0 },
  category: { type: String, default: "General" },
  coverpicture: { type: String },
  razorpayid: { type: String },
  razorpaysecret: { type: String }
}, {
  timestamps: true
});

export default models.User || model("User", userSchema);

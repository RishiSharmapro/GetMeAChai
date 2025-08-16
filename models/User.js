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
  supporters: { type: Number, default: 0 },
  projects: { type: Number, default: 0 },
  category: { type: String, default: "General" },
  coverpicture: { type: String },
  razorpayid: { type: String, default: "rzp_test_v54yD3C4TLhlSO" },
  razorpaysecret: { type: String, default: "mzeOkhc26e5YJQ912iuqmYUk" }
}, {
  timestamps: true
});

export default models.User || model("User", userSchema);

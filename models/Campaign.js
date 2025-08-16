import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const campaignSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    username: { type: String, required: true },
    authorAvatar: { type: String, required: true },
    imageUrl: { type: String, required: true },
    raised: { type: Number, required: true },
    goal: { type: Number, required: true }
}, {
    timestamps: true
});

export default models.Campaign || model("Campaign", campaignSchema);
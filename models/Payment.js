// import mongoose from "mongoose";

// const { Schema, model } = mongoose;
// const now = new Date();

// const paymentSchema = new Schema({
//     name: { type: String, required: true },
//     to_user: { type: String, required: true },
//     order_id: { type: String, required: true },
//     amount: { type: String, required: true },
//     message: { type: String, },
//     date: { type: String, default: "Date is ", required: true },
//     time: { type: String, default: now.toTimeString()},
//     status: { type: String, required: true },
// });

// export default mongoose.models.Payment || model("Payment", paymentSchema);

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const paymentSchema = new Schema({
    name: { type: String, required: true },
    to_user: { type: String, required: true },
    order_id: { type: String, required: true },
    amount: { type: String, required: true },
    message: { type: String },
    date: { type: String, default: ()=> {return new Date().toDateString()}}, // Default to the current date
    time: { type: String, default: function() { return new Date().toTimeString(); } }, // Default to the current time
    status: { type: String, required: true },
});

export default mongoose.models.Payment || model("Payment", paymentSchema);

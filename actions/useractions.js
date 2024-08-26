'use server'
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User";
import { connectDB } from "@/db/connect";

export const createOrder = async (amount, to_user, paymentform) => {
        await connectDB();

        // fetch the user details to get the razorpay secret
        const user = await User.findOne({ username: to_user });
        const secret = user.razorpaysecret;
        const userId = user.razorpayid;

        const instance = new Razorpay({ key_id: userId, key_secret: secret });

        const options = {
            amount: amount * 100,
            currency: "INR",
        };

        let order = await instance.orders.create(options);

        //create a payment instance which shows pending payment in the database
        await Payment.create({ 
            name: paymentform.name, 
            to_user: to_user, 
            order_id: order.id, 
            amount: amount, 
            message: paymentform.message, 
            status: "pending"});

        return order;
}

export const getUserSupporters = async (username) => {
    await connectDB();
    let payments = await Payment.find({to_user: username, status: "success"}).sort({amount: -1}).lean();
    payments.sort((a, b) => b.amount - a.amount);

    const plainPayments = payments.map(payment => ({...payment, _id: 'not available'}));
    // const plainPayments = payments._doc;
    // let payemntList = data.toObject({fllatenObjectsId: true});
    // const user = await User.findOne({username: params.username});
    // return data;
    return plainPayments;
}

export const fetchUser = async (username) => {
    await connectDB();
    let user  = await User.findOne({username: username}).lean();
    user._id = (user._id).toString();
    return user;
}

export const updateProfile = async (data, username, email) => {
    await connectDB();
    //if email is chenged then return an error message
    if (data.email !== email) {
        return {message: "Email cannot be changed"};
    }
    const user = await User.findOneAndUpdate({ username: username }, data, {new: true });
}
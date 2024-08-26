import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import { connectDB } from "@/db/connect";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDB();
    let body = await req.formData();
    body = Object.fromEntries(body);

    // Check if razorpayOrderId is present on the server
    const checkOrderId = await Payment.findOne({ order_id: body.razorpay_order_id });
    if (!checkOrderId) {
        // return NextResponse.error("Order not found");
        return NextResponse.json({success: false ,message: "Order Id not found" });
    }

    // getting the razorpay secret of the user
    const user = await User.findOne({ username: checkOrderId.to_user });
    const secret = user.razorpaysecret;

    // Verify the payment
    const verifier = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature, secret);

    if (!verifier) {
        return NextResponse.error("Payment verification failed");
        return NextResponse.json({success: false ,message: "Payment verification failed" });
    }

    // Update the payment status to success
    const updatedPayment = await Payment.findOneAndUpdate({ order_id: body.razorpay_order_id }, { status: "success" }, { new: true });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?payemnt=${updatedPayment.amount}&status=${updatedPayment.status}`);
}
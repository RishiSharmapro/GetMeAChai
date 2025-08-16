'use server'
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Campaign from "@/models/Campaign";
import { connectDB } from "@/db/connect";
import { signIn, signOut, auth } from "@/auth";
// import { useRouter } from "next/navigation";


export const createOrder = async (amount, to_user, paymentform) => {
    await connectDB();

    // fetch the user details to get the razorpay secret
    const user = await User.findOne({ username: to_user });
    const userId = user.razorpayid;
    const secret = user.razorpaysecret;

    const instance = new Razorpay({ key_id: userId, key_secret: secret });
    
    const options = {
        amount: amount * 100,
        currency: "INR",
    };
    
    let order = await instance.orders.create(options);
    console.log(`Order created: ${JSON.stringify(instance)}`);

    //create a payment instance which shows pending payment in the database
    await Payment.create({
        name: paymentform.name,
        to_user: to_user,
        order_id: order.id,
        amount: amount,
        message: paymentform.message,
        status: "pending"
    });

    return order;
}

export const getUserSupporters = async (username) => {
    await connectDB();
    let payments = await Payment.find({ to_user: username, status: "success" }).sort({ amount: -1 }).lean();
    payments.sort((a, b) => b.amount - a.amount);

    const plainPayments = payments.map(payment => ({ ...payment, _id: 'not available' }));
    // const plainPayments = payments._doc;
    // let payemntList = data.toObject({fllatenObjectsId: true});
    // const user = await User.findOne({username: params.username});
    // return data;
    return plainPayments;
}

export const fetchUser = async (username) => {
    await connectDB();
    let user = await User.findOne({ username: username }).lean();
    if (!user) {
        return null;
    }
    user._id = (user._id).toString();
    return {
        name: user.name,
        username: user.username,
        email: user.email,
        profilepicture: user.profilepicture,
        coverpicture: user.coverpicture,
    };
}

export const fetchCampaigns = async (username) => {
    await connectDB();
    const campaigns = await Campaign.find({ username: username }).sort({ createdAt: -1 }).lean();
    campaigns.forEach(campaign => {
        campaign._id = (campaign._id).toString();
    });
    console.log(`Fetched campaigns for ${username}:`, campaigns);
    return Array.isArray(campaigns) ? campaigns : [campaigns];
}

export const updateProfile = async (data) => {
    await connectDB();

    try {
        console.log("Updating user profile:", data);

        const userId = data._id;
        if (!userId) {
            return { message: "User ID is required" };
        }

        // Disallow email update
        // if (data.email) {
        //     return { message: "Email cannot be changed" };
        // }

        // Create a clean copy of data excluding protected fields
        const { _id, email, ...fieldsToUpdate } = data;

        // If no fields to update, return
        if (Object.keys(fieldsToUpdate).length === 0) {
            return { message: "No fields to update" };
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            fieldsToUpdate,
            { new: true }
        );

        if (!updatedUser) {
            return { message: "User not found" };
        }

        return {
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            profilepicture: updatedUser.profilepicture,
            coverpicture: updatedUser.coverpicture,
        }
    } catch (error) {
        console.error("Update failed:", error);
        return { message: "Something went wrong", error };
    }
};


export const getUser = async (username) => {
    await connectDB();
    const user = await User.findOne({ username: username });
    // console.log(`User found: ${user}`);
    if (!user) {
        return null;
    }
    console.log(`User found: ${user}`);

    return JSON.stringify(user);
}
export const getAllUsers = async () => {
    await connectDB();
    const users = await User.find({}).lean();
    users.forEach(user => {
        user._id = (user._id).toString();
        delete user.razorpayid;
        delete user.razorpaysecret;
    });
    return Array.isArray(users) ? users : [users];
}

export const handleGithubSignIn = async () => {
    console.log("Handling sign in");
    await signIn('github', {
        redirectTo: '/dashboard'
    });
}

export const handleGoogleSignIn = async () => {
    console.log("Handling Google sign in");
    await signIn('google', {
        redirectTo: '/dashboard'
    }
    );
}

export const handleCredentialSignIn = async (formData) => {
    console.log("Handling credentials sign in");
    const email = formData.get("email");
    const password = formData.get("password");
    console.log('Form Data: ', { email, password });
    await signIn('credentials', {
        name: formData.name || '',
        email: email,
        password: password,
        callbackUrl: '/dashboard',
    });
}

export const handleSignOut = async () => {
    console.log("Handling sign out");
    await signOut({ redirect: false });
    console.log("Session terminated successfully.");
}

export const getSession = async () => {
    const session = await auth();
    if (!session) {
        return null;
    }
    console.log(`Session data: ${JSON.stringify(session)}`);
    return session;
}
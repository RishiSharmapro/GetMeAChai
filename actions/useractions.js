'use server'
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Campaign from "@/models/Campaign";
import { connectDB } from "@/db/connect";
import { signIn, signOut, auth } from "@/auth";


export const createOrder = async (amount, to_user, paymentform) => {
    await connectDB();
    const session = await auth();
    if (!session) {
        return { error: "User not authenticated" };
    }
    paymentform.from_user = session.user.email;

    // fetch the user details to get the razorpay secret
    const user = await User.findOne({ username: to_user }).lean();
    const userId = user.razorpayid;
    const secret = user.razorpaysecret;

    const instance = new Razorpay({ key_id: userId, key_secret: secret });
    
    const options = {
        amount: amount * 100,
        currency: "INR",
    };
    
    let order = await instance.orders.create(options);

    //create a payment instance which shows pending payment in the database
    await Payment.create({
        name: paymentform.name,
        from_user: paymentform.from_user,
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

    return payments.map(({ _id, ...payment }) => payment);
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
    return Array.isArray(campaigns) ? campaigns : [campaigns];
}

export const updateProfile = async (data) => {
    await connectDB();

    try {
        const userId = data._id;
        if (!userId) {
            return { message: "User ID is required" };
        }

        const { _id, email, ...fieldsToUpdate } = data;

        if (Object.keys(fieldsToUpdate).length === 0) {
            return { message: "No fields to update" };
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            fieldsToUpdate,
            { new: true }
        ).lean();

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
    const user = await User.findOne({ username: username }).lean();
    if (!user) {
        return null;
    }

    user._id = (user._id).toString();
    delete user.razorpayid;
    delete user.razorpaysecret;
    delete user.password;
    delete user.__v;
    return user;
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

export const getAllCreators = async () => {
    await connectDB();
    const creators = await User.find({ creator: true }).lean();
    creators.forEach(creator => {
        creator._id = (creator._id).toString();
        delete creator.razorpayid;
        delete creator.razorpaysecret;
    });
    
    return creators;
};

export const getAllContributions = async (userEmail) => {
    await connectDB();
    const contributions = await Payment.find({ status: "success", from_user: userEmail }).lean();
    return contributions.map(({ _id, ...contribution }) => contribution);
};

export const handleGithubSignIn = async () => {
    await signIn('github', {
        redirectTo: '/dashboard'
    });
}

export const handleGoogleSignIn = async () => {
    await signIn('google', {
        redirectTo: '/dashboard'
    });
}

export const handleCredentialSignIn = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    await signIn('credentials', {
        name: formData.name || '',
        email: email,
        password: password,
        callbackUrl: '/dashboard',
    });
}

export const handleSignOut = async () => {
    await signOut({ redirect: false });
}

export const getSession = async () => {
    const session = await auth();
    if (!session) {
        return null;
    }
    return session;
}
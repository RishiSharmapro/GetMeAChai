"use client";
import { useState, useEffect } from "react";
import {
  User,
  ImageIcon,
  Rocket,
  DollarSign,
  Settings,
  LogOut,
  LinkIcon,
  UserStar
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { fetchUser ,updateProfile } from "@/actions/useractions";
import CreatorPage from "./CreatorPage";
import Link from "next/link";

const DashboardPage = () => {
  const [session, setSession] = useState({
    user: { name: "loading..", image: "loading..", username: "loading.." },
  });
  const { data: currSession, status } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    profilepicture: "",
    coverpicture: "https://picsum.photos/1000/390",
  });
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    else if (status === "authenticated") {
      setSession(currSession);
      // const userData = async () => await fetchUser(currSession.user.username);
      // if (userData) {
      //     setData(userData);
      // }
      setData({
        name: currSession.user.name || "",
        username: currSession.user.username || "",
        email: currSession.user.email || "",
        profilepicture: currSession.user.image || "https://picsum.photos/1000/400",
        coverpicture: "https://picsum.photos/1000/390",
      });
    }
    console.log(`Session data: ${JSON.stringify(session)}`);
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    data._id = session.user.id; // MongoDB user ID
    const result = await updateProfile(data);
    setData(result);
    console.log(result);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileDetails data={data} setData={setData} handleSubmit={handleSubmit} />;
      case "branding":
        return <PageBranding data={data} setData={setData} />;
      case "campaigns":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Campaigns</h2>
            <p className="mt-4 text-gray-600">
              A list of campaigns you've created or backed would appear here.
            </p>
          </div>
        );
      case "payouts":
        return <Payouts />;
      case "settings":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
            <p className="mt-4 text-gray-600">
              Your account settings would be available here.
            </p>
          </div>
        );
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="md:flex md:space-x-8">
          <aside className="md:w-1/4 mb-8 md:mb-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <img
                  src={session.user.image}
                  alt="Rishi Sharma"
                  className="w-20 h-20 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {session.user.name}
                  </h3>
                  <p className="text-sm text-gray-500">Creator Mode</p>
                </div>
              </div>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`cursor-pointer w-full flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "profile"
                      ? "bg-amber-100 text-amber-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <User size={20} className="mr-3" /> Profile
                </button>
                <button
                  onClick={() => setActiveTab("branding")}
                  className={`cursor-pointer w-full flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "branding"
                      ? "bg-amber-100 text-amber-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ImageIcon size={20} className="mr-3" /> Page Preview
                </button>
                <button
                  onClick={() => setActiveTab("campaigns")}
                  className={`cursor-pointer w-full flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "campaigns"
                      ? "bg-amber-100 text-amber-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Rocket size={20} className="mr-3" /> My Campaigns
                </button>
                <button
                  onClick={() => setActiveTab("payouts")}
                  className={`cursor-pointer w-full flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "payouts"
                      ? "bg-amber-100 text-amber-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <DollarSign size={20} className="mr-3" /> Payouts
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`cursor-pointer w-full flex items-center px-4 py-2 rounded-lg text-left ${
                    activeTab === "settings"
                      ? "bg-amber-100 text-amber-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Settings size={20} className="mr-3" /> Settings
                </button>
                <div className="border-t my-2"></div>
                <Link
                  href={`/creators/${data.username}`}
                  className="cursor-pointer w-full flex items-center px-4 py-2 rounded-lg text-left text-amber-700 hover:bg-amber-50"
                >
                  <UserStar size={20} className="mr-3" /> View Public Profile
                </Link>
                <button
                  onClick={async () => {
                    await signOut({ redirect: false });
                    console.log("User signed out");

                    router.push('/');
                  }}
                  className="cursor-pointer w-full flex items-center px-4 py-2 rounded-lg text-left text-red-500 hover:bg-red-50"
                >
                  <LogOut size={20} className="mr-3" /> Logout
                </button>
              </nav>
            </div>
          </aside>
          <main className="md:w-3/4">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 min-h-full">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const ProfileDetails = ({ data, setData, handleSubmit }) => (

  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Creator Profile</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Display Name
        </label>
        <input
          type="text"
          id="name"
          defaultValue={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            getmeachai.com/
          </span>
          <input
            type="text"
            id="username"
            defaultValue={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-gray-300"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="website"
          className="block text-sm font-medium text-gray-700"
        >
          Website or Social Link
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="url"
            id="website"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
            placeholder="www.example.com"
          />
        </div>
      </div>
      <div className="pt-4">
        <button
          type="submit"
          className="cursor-pointer bg-amber-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-amber-600 transition-colors"
        >
          Save Profile
        </button>
      </div>
    </form>
  </div>
);

const PageBranding = ({ data, setData }) => (
  // <div>
  //   <h2 className="text-2xl font-bold text-gray-800 mb-6">Page & Branding</h2>
  //   <form className="space-y-8">
  //     <div>
  //       <label className="block text-sm font-medium text-gray-700">
  //         Profile Photo
  //       </label>
  //       <div className="mt-2 flex items-center space-x-6">
  //         <img
  //           src={data.profilepicture || "https://picsum.photos/200"}
  //           alt="Profile"
  //           className="h-24 w-24 rounded-full object-cover"
  //         />
  //         <input
  //           type="string"
  //           value={data.profilepicture}
  //           onChange={(e) => setData({ ...data, profilepicture: e.target.value })}
  //           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
  //         />
  //         <button
  //           type="button"
  //           className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
  //         >
  //           Change
  //         </button>
  //       </div>
  //     </div>
  //     <div>
  //       <label className="block text-sm font-medium text-gray-700">
  //         Cover Image
  //       </label>
  //       <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
  //         <div className="space-y-1 text-center">
  //           <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
  //           <div className="flex text-sm text-gray-600">
  //             <label
  //               htmlFor="file-upload"
  //               className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-500"
  //             >
  //               <span>Upload a file</span>
  //               <input
  //                 id="file-upload"
  //                 name="file-upload"
  //                 type="file"
  //                 className="sr-only"
  //               />
  //             </label>
  //             <p className="pl-1">or drag and drop</p>
  //           </div>
  //           <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
  //         </div>
  //       </div>
  //     </div>
  //     <div>
  //       <label
  //         htmlFor="bio"
  //         className="block text-sm font-medium text-gray-700"
  //       >
  //         Bio
  //       </label>
  //       <textarea
  //         id="bio"
  //         rows="4"
  //         className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
  //         defaultValue={`${data.name} started GetMeAChai from a simple idea: that a small gesture, like buying a chai, can empower great creativity.`}
  //       ></textarea>
  //       <p className="mt-2 text-sm text-gray-500">
  //         A short introduction that will appear on your public page.
  //       </p>
  //     </div>
  //     <div className="pt-4">
  //       <button
  //         type="submit"
  //         className="bg-amber-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-amber-600 transition-colors"
  //       >
  //         Save Branding
  //       </button>
  //     </div>
  //   </form>
  // </div>
  <div className="relative rounded-lg overflow-hidden border border-amber-800">
    <div className="absolute z-10 inset-0"></div>
    <CreatorPage username={data.username} />
  </div>
);

const Payouts = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Payouts</h2>
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <DollarSign className="h-5 w-5 text-amber-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-amber-700">
            Note: You don’t need to enter payout options they are set to default values for testing purposes. All payments are test transactions processed via Razorpay.
          </p>
        </div>
      </div>
    </div>
    {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border rounded-lg p-6 flex flex-col items-center text-center">
        <img
          src="https://js.cx/clipart/payment-gateways/stripe.png"
          alt="Stripe"
          className="h-10 mb-4"
        />
        <p className="text-gray-600 text-sm mb-4">
          Connect with Stripe to accept credit cards, Apple Pay, and more.
        </p>
        <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Connect with Stripe
        </button>
      </div>
      <div className="border rounded-lg p-6 flex flex-col items-center text-center">
        <img
          src="https://js.cx/clipart/payment-gateways/paypal.png"
          alt="PayPal"
          className="h-10 mb-4"
        />
        <p className="text-gray-600 text-sm mb-4">
          Connect your PayPal account to receive funds from supporters globally.
        </p>
        <button className="w-full bg-sky-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-800 transition-colors">
          Connect with PayPal
        </button>
      </div>
    </div> */}
  </div>
);

export default DashboardPage;

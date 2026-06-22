"use client";
import { useState, useEffect } from "react";
import {
  User,
  Rocket,
  DollarSign,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  updateProfile,
  getAllContributions,
} from "@/actions/useractions";
import CreatorPage from "./CreatorPage";
import Loading from "./Loading";

const DashboardPage = () => {
  const { data: currSession, status, update } = useSession();
  const [contributions, setContributions] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();
  const [data, setData] = useState({
    _id: "",
    name: "",
    username: "",
    email: "",
    profilepicture: null,
    coverpicture: null,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {

      const contributionsData = async () => {
        const contribs = await getAllContributions(currSession.user.email);
        setContributions(contribs);
      };
      contributionsData();
      setData({
        _id: currSession.user.id,
        name: currSession.user.name,
        username: currSession.user.username,
        email: currSession.user.email,
        profilepicture: currSession.user.image || null,
        coverpicture: "banner-chai.png",
      });
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await updateProfile(data);
    await update({ username: data.username, name: data.name });
    setData(result);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileDetails
            data={data}
            setData={setData}
            handleSubmit={handleSubmit}
          />
        );
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

      case "mycontributions":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              My Contributions
            </h2>
            {contributions.length === 0 ? (
              <p className="mt-4 text-gray-600">
                You haven't made any contributions yet.
              </p>
            ) : (
              <div className="mt-6 space-y-4">
                {contributions.map((contribution) => (
                  <div
                    key={contribution.order_id}
                    className="border rounded-lg p-4 bg-gray-50 cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {contribution.to_user}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Message: {contribution.message} | Date:{" "}
                      {new Date(contribution.date).toLocaleDateString()}
                    </p>
                    <div className="text-sm text-amber-500">
                      Amount: ${contribution.amount}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return <ProfileDetails data={data} setData={setData} handleSubmit={handleSubmit} />;
    }
  };

  return (
    <div>
      {status === "loading" ? (
        <Loading />
      ) : (
        <div className="bg-gray-50 min-h-screen">
          <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
              <div className="md:flex md:space-x-8">
                <aside className="md:w-1/4 mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center mb-6">
                      <img
                        src={data.profilepicture}
                        alt="Rishi Sharma"
                        className="w-20 h-20 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {data.name}
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
                        onClick={() => setActiveTab("mycontributions")}
                        className={`cursor-pointer w-full flex items-center px-4 py-2 rounded-lg text-left ${
                          activeTab === "mycontributions"
                            ? "bg-amber-100 text-amber-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Rocket size={20} className="mr-3" /> My Contributions
                      </button>

                      <div className="border-t my-2"></div>
                      <button
                        onClick={async () => {
                          await signOut({ redirect: false });
                          router.push("/");
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
        </div>
      )}
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
          Name
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
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-amber-500 focus:outline-none border focus:border-amber-500 sm:text-sm border-gray-300"
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
            Note: You don’t need to enter payout options they are set to default
            values for testing purposes. All payments are test transactions
            processed via Razorpay.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardPage;

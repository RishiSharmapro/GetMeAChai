'use client';
import { useEffect, useState } from "react";
import { Heart, Globe, Twitter, Instagram, MessageSquare } from 'lucide-react';
import PaymentModal from '@/components/PaymentModel';
import ProgressBar from '@/components/ProgressBar';
import { getUser, fetchUser, getUserSupporters, fetchCampaigns } from "@/actions/useractions";
import { useSearchParams, useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import CampaignCard from "@/components/CampaignCard";
import Image from 'next/image';


const CreatorPage = ({ username }) => {
    const [creator, setCreator] = useState({
        name: "Loading...",
        avatar: "https://picsum.photos/100/100",
        coverImage: "banner-chai.png",
        bio: "Loading creator bio...",
        supporters: 0,
        projects: 0,
        username: username || "unknown"
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [supporters, setSupporters] = useState([]);
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        if (searchParams.get('status') === 'success') {
            toast.success('Payment Successful!', {
                duration: 3000,
                position: "top-right",
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
            router.replace(`/creators/${username}`);
        }

        const fetchUserData = async () => {
            const userData = await getUserSupporters(username);
            const campaignsData = await fetchCampaigns(username);
            setCampaigns(campaignsData);
            setSupporters(userData);
            let user = await getUser(username);
            if (user) {
                user = JSON.parse(user);
                setCreator({
                    name: user.name,
                    avatar: user.avatar.includes('http') ? user.avatar : `/${user.avatar}`,
                    coverImage: user.coverImage,
                    bio: user.bio,
                    supporters: user.supporters,
                    projects: user.projects,
                    username: user.username,
                });
            }
            else {
                router.push('/creators');
            }

        };
        fetchUserData();
    }, []);


    return (
        <div className="bg-gray-50 min-h-screen">
            <Toaster
                position="top-right"
            />
            <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} creatorUsername={creator.username} />

            <div className="w-full h-48 md:h-64 bg-center bg-cover" style={{ backgroundImage: `url(/${creator.coverImage})` }}></div>

            <div className="container mx-auto px-4 -mt-16">
                <div className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-200 md:flex md:items-end md:space-x-6">
                    <div className="-mt-16 md:-mt-24 flex-shrink-0">
                        <Image src={`${creator.avatar}`} height={128} width={128} alt={creator.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md" />
                    </div>
                    <div className="mt-4 md:mt-0 flex-grow">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{creator.name}</h1>
                        <p className="text-gray-600 mt-1">{creator.bio}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-3">
                            <span><strong className="text-gray-800">{creator.supporters}</strong> Supporters</span>
                            <span>&bull;</span>
                            <span><strong className="text-gray-800">{creator.projects}</strong> Projects</span>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex-shrink-0">
                        <button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto bg-amber-500 text-white font-bold py-3 px-8 rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                            <Heart size={20} /> Give Support
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="lg:flex lg:space-x-8">
                    <main className="lg:w-3/4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Campaigns</h2>
                        {campaigns.length === 0 ? (
                            <div className="text-center py-16">
                                <h3 className="text-xl font-semibold text-gray-700">No active campaigns</h3>
                                <p className="text-gray-500 mt-2">This creator has not launched any campaigns yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-1 xl:grid-cols-3 gap-8">
                                {campaigns.map(campaign => (
                                    <CampaignCard key={campaign.id} campaign={campaign} />
                                ))}
                            </div>
                        )}
                    </main>
                    <aside className="lg:w-1/3 mt-8 lg:mt-0">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">👑 Elite Supporters </h3>
                            {supporters.length === 0 ? (
                                <p className="text-gray-500">No supporters yet. Be the first to support!</p>
                            ) : (
                                <ul className="space-y-4">
                                {supporters.filter(user => user.to_user === creator.username).sort((a, b) => a.amount > b.amount).map(currUser => (
                                    <li key={currUser.order_id} className="border-b border-gray-200 pb-4 flex">
                                        <span className="text-gray-800">From <strong>{currUser.name} - ₹{currUser.amount} &nbsp;</strong> <br /> <em>"{currUser.message}"</em></span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Find me on</h3>
                            <div className="space-y-3">
                                <a href="#" className="flex items-center text-gray-600 hover:text-blue-500"><Twitter size={18} className="mr-3" />
                                    @{creator.username}</a>
                                <a href="#" className="flex items-center text-gray-600 hover:text-pink-500"><Instagram size={18} className="mr-3" />
                                    @{creator.username}</a>
                                <a href="#" className="flex items-center text-gray-600 hover:text-amber-600"><Globe size={18} className="mr-3" />
                                    {creator.username}.com</a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default CreatorPage;

import React, { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import CampaignCard from "@/components/CampaignCard";

const campaigns = [
  {
    id: 1,
    category: "Tech",
    title: "Arc Reactor 2.0 – Clean Energy for Everyone",
    author: "Iron Man",
    authorAvatar: "iron_man_pp.jpeg",
    imageUrl: "iron_man.png",
    raised: 82000,
    goal: 100000,
  },
  {
    id: 2,
    category: "Martial Arts",
    title: "The Dragon Warrior Training Dojo",
    author: "Po from Kung Fu Panda",
    authorAvatar: "poo_pp.jpeg",
    imageUrl: "poo.png",
    raised: 13500,
    goal: 20000,
  },
  {
    id: 3,
    category: "Action",
    title: "Shield Bearers – A Heroes’ Relief Fund",
    author: "Captain America",
    authorAvatar: "captain_pp.jpeg",
    imageUrl: "captain.png",
    raised: 45000,
    goal: 60000,
  },
  {
    id: 4,
    category: "Justice",
    title: "Hell’s Kitchen Watch – Community Safety Initiative",
    author: "Daredevil",
    authorAvatar: "daredevil_pp.jpeg",
    imageUrl: "daredevil.png",
    raised: 7800,
    goal: 15000,
  },
  {
    id: 5,
    category: "Comedy",
    title: "BananaFest – The Ultimate Minion Fan Party",
    author: "The Author’s Minions",
    authorAvatar: "minions_pp.jpeg",
    imageUrl: "minions.png",
    raised: 12600,
    goal: 15000,
  },
  {
    id: 6,
    category: "Comedy",
    title: "Deadpool’s Fourth Wall Comedy Special",
    author: "Deadpool",
    authorAvatar: "deadpool_pp.jpeg",
    imageUrl: "deadpool.png",
    raised: 15200,
    goal: 25000,
  },
];

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns);

  const categories = [
    "All",
    "Martial Arts",
    "Action",
    "Tech",
    "Justice",
    "Comedy",
  ];

  useEffect(() => {
    let results = campaigns;
    if (category !== "All") {
      results = results.filter((campaign) => campaign.category === category);
    }
    if (searchTerm) {
      results = results.filter(
        (campaign) =>
          campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredCampaigns(results);
  }, [searchTerm, category]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Explore Campaigns
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Find the next big thing you want to support and bring to life.
          </p>
        </div>

        <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full border">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by campaign title or creator..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-40">
            <div className="relative w-full md:w-auto">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-amber-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-16 col-span-full">
            <h3 className="text-xl font-semibold text-gray-700">
              No campaigns found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectsPage;

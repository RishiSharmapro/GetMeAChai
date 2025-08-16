import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import CreatorCard from "@/components/CreatorCard";
import { getAllUsers } from "@/actions/useractions";

const allCreators = [
  {
    id: 1,
    name: "Iron Man",
    username: "ironman",
    email: "ironman@avengers.com",
    razorpayid: "rzp_test_v54yD3C4TLhlSO",
    razorpaysecret: "mzeOkhc26e5YJQ912iuqmYUk",
    avatar: "iron_man_pp.jpeg",
    coverImage: "iron_man.png",
    bio: "Genius, billionaire, playboy, philanthropist. Also builds world-saving tech in his spare time.",
    supporters: 3420,
    projects: 5,
    category: "Tech",
  },
  {
    id: 2,
    name: "Po from Kung Fu Panda",
    username: "kungfupanda",
    email: "po@kungfupanda.com",
    razorpayid: "rzp_test_v54yD3C4TLhlSO",
    razorpaysecret: "mzeOkhc26e5YJQ912iuqmYUk",
    avatar: "poo_pp.jpeg",
    coverImage: "poo.png",
    bio: "Kung Fu Master. Dumpling enthusiast. Teacher of inner peace and high kicks.",
    supporters: 1750,
    projects: 2,
    category: "Martial Arts",
  },
  {
    id: 3,
    name: "Captain America",
    username: "captainamerica",
    email: "captain@avengers.com",
    razorpayid: "rzp_test_v54yD3C4TLhlSO",
    razorpaysecret: "mzeOkhc26e5YJQ912iuqmYUk",
    avatar: "captain_pp.jpeg",
    coverImage: "captain.png",
    bio: "Leader, soldier, and symbol of freedom. Always ready to rally the troops.",
    supporters: 2980,
    projects: 3,
    category: "Action",
  },
  {
    id: 4,
    name: "Daredevil",
    username: "daredevil",
    email: "daredevil@murdock.com",
    razorpayid: "rzp_test_v54yD3C4TLhlSO",
    razorpaysecret: "mzeOkhc26e5YJQ912iuqmYUk",
    avatar: "daredevil_pp.jpeg",
    coverImage: "daredevil.png",
    bio: "Lawyer by day, vigilante by night. Protecting Hell’s Kitchen with justice and acrobatics.",
    supporters: 1640,
    projects: 1,
    category: "Justice",
  },
  {
    id: 5,
    name: "The Author’s Minions",
    avatar: "minions_pp.jpeg",
    username: "minions",
    email: "minions@despicableme.com",
    razorpayid: "rzp_test_v54yD3C4TLhlSO",
    razorpaysecret: "mzeOkhc26e5YJQ912iuqmYUk",
    coverImage: "minions.png",
    bio: "Small, yellow, chaotic. Specializing in bananas, mischief, and helping creators succeed.",
    supporters: 920,
    projects: 1,
    category: "Comedy",
  },
  {
    id: 6,
    name: "Deadpool",
    avatar: "deadpool_pp.jpeg",
    username: "deadpool",
    email: "deadpool@marvel.com",
    razorpayid: "rzp_test_v54yD3C4TLhlSO",
    razorpaysecret: "mzeOkhc26e5YJQ912iuqmYUk",
    coverImage: "deadpool.png",
    bio: "Merc with a Mouth. Breaking the fourth wall while breaking records.",
    supporters: 2100,
    projects: 2,
    category: "Comedy",
  },
];

const AllCreatorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCreators, setFilteredCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const creators = await getAllUsers();
      setFilteredCreators(creators);
      console.log("Fetched creators:", creators);
    };

    fetchCreators();
  }, []);

  useEffect(() => {
    const results = filteredCreators.filter(
      (creator) =>
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.bio.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCreators(results);
  }, [searchTerm]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Discover Creators
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Find and support talented creators from around the world.
          </p>
        </div>

        <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, category, or keyword..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <select className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-amber-500">
                <option>All Categories</option>
                <option>Art</option>
                <option>Tech</option>
                <option>Games</option>
                <option>Film</option>
                <option>Writing</option>
                <option>Music</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCreators.map((creator) => (
            <CreatorCard key={creator._id} creator={creator} />
          ))}
        </div>

        {filteredCreators.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-700">
              No creators found
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

export default AllCreatorsPage;

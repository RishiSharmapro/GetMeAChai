import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import CreatorCard from "@/components/CreatorCard";
import { getAllCreators } from "@/actions/useractions";

const AllCreatorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [creators, setCreators] = useState([]);
  const [filteredCreators, setFilteredCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const creators = await getAllCreators();
      setCreators(creators);
      setFilteredCreators(creators);
    };

    fetchCreators();
  }, []);

  useEffect(() => {
    const results = creators.filter(
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
          <div className="relative flex-grow w-full">
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
              <select className="w-full min-w-40 appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-amber-500">
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

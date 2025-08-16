import Link from "next/link";

const CreatorCard = ({ creator }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group border border-gray-200 flex flex-col">
    <div className="relative">
      <img
        src={creator.coverImage}
        alt={`${creator.name}'s cover image`}
        className="h-28 w-full object-cover"
      />
      <img
        src={creator.avatar}
        alt={creator.name}
        className="w-20 h-20 rounded-full border-4 border-white absolute -bottom-10 left-1/2 -translate-x-1/2 shadow-md"
      />
    </div>
    <div className="pt-12 p-5 text-center flex-grow flex flex-col">
      <h3 className="text-lg font-bold text-gray-900">{creator.name}</h3>
      <p className="text-amber-600 text-sm font-semibold">{creator.category}</p>
      <p className="text-gray-600 text-sm my-3 flex-grow">{creator.bio}</p>
      <div className="flex justify-around text-sm text-gray-700 py-2">
        <div>
          <strong className="block text-lg text-gray-900">
            {creator.supporters}
          </strong>{" "}
          Supporters
        </div>
        <div>
          <strong className="block text-lg text-gray-900">
            {creator.projects}
          </strong>{" "}
          Projects
        </div>
      </div>
    </div>
    <div className="p-4 bg-gray-50">
      <Link href={`/creators/${creator.username}`} >
      <button className="cursor-pointer w-full bg-amber-500 text-white font-bold py-2 px-4 rounded-full hover:bg-amber-600 transition-colors">
        View Profile
      </button>
      </Link>
    </div>
  </div>
);

export default CreatorCard;

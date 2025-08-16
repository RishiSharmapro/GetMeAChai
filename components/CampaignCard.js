import ProgressBar from '@/components/ProgressBar';
import Image from 'next/image';
import Link from 'next/link';

const CampaignCard = ({ campaign }) => {
  const progress = (campaign.raised / campaign.goal) * 100;  

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group border border-gray-200">
      <div className="overflow-hidden h-auto">
        <Image src={`/${campaign.imageUrl}`} height={400} width={400} alt={campaign.title} className="w-full  object-cover  group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-5">
        <p className="text-amber-600 text-sm font-semibold mb-2">{campaign.category}</p>
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate text-wrap">{campaign.title}</h3>
        <div className="flex items-center mb-4">
          <Image src={`/${campaign.authorAvatar}`} height={40} width={40} alt={campaign.author} className="w-8 h-8 rounded-full mr-3" />
          <p className="text-gray-600 text-sm">by &nbsp;
            <Link 
            href={`/creators/${campaign.username}`} 
            className="hover:text-amber-500 hover:font-semibold">
              {campaign.author}
            </Link>
          </p>
        </div>
        <div className="mb-4">
          <ProgressBar value={progress} />
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="font-bold text-gray-800">
            <span className="text-amber-500">${campaign.raised.toLocaleString()}</span> raised
          </div>
          <div className="text-gray-500">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
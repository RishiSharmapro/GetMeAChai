import CampaignCard from '@/components/CampaignCard';
import Link from 'next/link';

const campaigns = [
  {
    id: 1,
    category: 'Superhero Tech',
    title: 'IronSuit X: The Next-Gen Armor Upgrade',
    author: 'Iron Man',
    username: 'ironman',
    authorAvatar: 'iron_man_pp.jpeg',
    imageUrl: 'iron_man.png',
    raised: 85000,
    goal: 100000,
  },
  {
    id: 2,
    category: 'Martial Arts & Animation',
    title: '"Inner Peace" - Po\'s Kung Fu Training Academy',
    author: 'Po from Kung Fu Panda',
    username: 'kungfupanda',
    authorAvatar: 'poo_pp.jpeg',
    imageUrl: 'poo.png',
    raised: 15000,
    goal: 20000,
  },
  {
    id: 3,
    category: 'Action & Adventure',
    title: 'Shield of Freedom - The Captain America Story',
    author: 'Captain America',
    username: 'captainamerica',
    authorAvatar: 'captain_pp.jpeg',
    imageUrl: 'captain.png',
    raised: 62000,
    goal: 75000,
  },
  {
    id: 4,
    category: 'Crime & Vigilante Justice',
    title: 'Hell\'s Kitchen Chronicles - Daredevil\'s Fight for Justice',
    author: 'Daredevil',
    username: 'daredevil',
    authorAvatar: 'daredevil_pp.jpeg',
    imageUrl: 'daredevil.png',
    raised: 18000,
    goal: 25000,
  },
  {
    id: 5,
    category: 'Creative Squad Projects',
    title: 'Minions Mayhem - The Ultimate Banana Festival',
    author: 'Minions',
    username: 'minions',
    authorAvatar: 'minions_pp.jpeg',
    imageUrl: 'minions.png',
    raised: 5000,
    goal: 10000,
  },
  {
    id: 6,
    category: 'Chaotic Comedy',
    title: 'Maximum Effort - Deadpool\'s Guide to Chaos',
    author: 'Deadpool',
    username: 'deadpool',
    authorAvatar: 'deadpool_pp.jpeg',
    imageUrl: 'deadpool.png',
    raised: 25000,
    goal: 30000,
  },
];


const FeaturedCampaigns = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Campaigns</h2>
        <p className="text-lg text-gray-600 mt-2">Projects our community is loving right now.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map(campaign => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/projects" className="text-amber-600 font-semibold hover:text-amber-700 transition-colors">
          View All Projects &rarr;
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturedCampaigns;

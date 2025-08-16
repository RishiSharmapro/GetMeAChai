import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "I built this suit in a cave… with a box of scraps. But seriously, the platform’s tools made upgrading IronSuit X smoother than my arc reactor’s power flow.",
    author: "Iron Man",
    project: "Creator of 'IronSuit X: The Next-Gen Armor Upgrade'",
    avatar: "iron_man_pp.jpeg"
  },
  {
    quote: "Skadoosh! Thanks to this platform, my Kung Fu Training Academy is packed. Now I can eat dumplings AND teach inner peace at the same time.",
    author: "Po from Kung Fu Panda",
    project: "Founder of 'Inner Peace Kung Fu Academy'",
    avatar: "poo_pp.jpeg"
  },
  {
    quote: "With great support comes great responsibility… wait, wrong guy. Anyway, this platform helped me rally the troops and fund the Shield of Freedom project.",
    author: "Captain America",
    project: "Leader of 'Shield of Freedom Initiative'",
    avatar: "captain_pp.jpeg"
  },
  {
    quote: "Justice is blind, but thanks to this site, it\'s also well-funded. I can keep protecting Hell’s Kitchen without worrying about legal bills.",
    author: "Daredevil",
    project: "Defender of 'Hell’s Kitchen Chronicles'",
    avatar: "daredevil_pp.jpeg"
  },
  {
    quote: "Bananas funded. Party planned. Minions happy. Author happy. Mission complete.",
    author: "The Author’s Minions",
    project: "Organizers of 'The Ultimate Banana Festival'",
    avatar: "minions_pp.jpeg"
  },
  {
    quote: "Maximum Effort! This platform made my chaos look… professional. Didn’t see that coming, did you?",
    author: "Deadpool",
    project: "Writer of 'Maximum Effort - A Guide to Chaos'",
    avatar: "deadpool_pp.jpeg"
  }
];


const Testimonials = () => (
    <section className="py-40 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Loved by Creators Worldwide</h2>
                <p className="text-lg text-gray-600 mt-2">See what our successful creators have to say.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                        <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => <Star key={i} size={20} className="text-amber-400 fill-current" />)}
                        </div>
                        <p className="text-gray-700 mb-6 h-24">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                            <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4"/>
                            <div>
                                <p className="font-bold text-gray-800">{testimonial.author}</p>
                                <p className="text-sm text-gray-500">{testimonial.project}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Testimonials;

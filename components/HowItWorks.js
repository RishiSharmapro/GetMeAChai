import { Rocket, Users, Target } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: <Rocket size={32} className="text-amber-500" />,
            title: "Launch Your Idea",
            description: "Create your project page in minutes. Tell your story with video and images, and set your funding goal."
        },
        {
            icon: <Users size={32} className="text-amber-500" />,
            title: "Build Your Community",
            description: "Share your campaign with friends, family, and your social networks to start gaining momentum and backers."
        },
        {
            icon: <Target size={32} className="text-amber-500" />,
            title: "Achieve Your Goal",
            description: "Collect your funds and start creating! Keep your backers updated on your progress every step of the way."
        }
    ];

    return (
        <section className="py-40 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get Funded in 3 Easy Steps</h2>
                    <p className="text-lg text-gray-600 mt-2">Bringing your project to life has never been simpler.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    {steps.map((step, index) => (
                        <div key={index} className="p-6">
                            <div className="flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-amber-100 mx-auto">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

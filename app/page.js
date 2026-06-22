'use client';
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FeaturedCampaigns from "@/components/FeaturedCampaigns";

export default function Home() {

  return (
    <>
      <section className="bg-gray-50 py-20 md:py-52">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Turn Your Creative Idea <br /> Into <span className="text-amber-500">Reality</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            GetMeAChai is the platform where creators and backers come together to bring new ideas to life. Your next big thing starts here.
          </p>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <Link href={"/campaigns"} className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 border border-gray-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2 w">
              Explore Campaigns <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
      <FeaturedCampaigns />
      <HowItWorks />
      <Testimonials />
    </>
  );
}

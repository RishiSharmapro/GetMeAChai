import React from 'react'
import { Lightbulb, Handshake, Eye } from 'lucide-react';
import Link from "next/link";

export const metadata = {
    title: "About Us - Get me A Chai",
    description: "Learn more about Get me A Chai and our mission to support creators.",
    icon: "/favicon.png",
};  

const about = () => {
    // return (
    //     <>
    //         {/* <main className="max-w-4xl mx-auto p-6">
    //             <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
    //             <section className="mb-8">
    //                 <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
    //                 <p className="text-lg leading-relaxed">
    //                     Welcome to Get me A Chai, where we are dedicated to supporting creators and their communities. Our mission is to provide a platform that empowers creators to connect with their audience and receive support for their work.
    //                 </p>
    //             </section>
    //             <section className="mb-8">
    //                 <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
    //                 <p className="text-lg leading-relaxed">
    //                     We offer a range of tools and features designed to help creators thrive. From flexible membership tiers to seamless content management, our platform is built with your needs in mind.
    //                 </p>
    //             </section>
    //             <section className="mb-8">
    //                 <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
    //                 <p className="text-lg leading-relaxed">
    //                     Our journey began with a simple idea: to create a space where creators can build meaningful relationships with their supporters. What started as a small project has grown into a vibrant community of passionate individuals.
    //                 </p>
    //             </section>
    //             <section>
    //                 <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
    //                 <p className="text-lg leading-relaxed">
    //                     We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us at <a href="mailto:contact@getmeachai.com" className="text-blue-500 hover:underline">contact@getmeachai.com</a>.
    //                 </p>
    //             </section>
    //         </main> */}

    //     </>
    // )
    return (
        <div className="bg-white">
            <div className="relative bg-gray-900 text-white text-center py-20 md:py-32">
                <div className="absolute inset-0">
                    <img src="team-banner.avif" className="w-full h-full object-cover opacity-30" />
                </div>
                <div className="relative container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">We believe in the power of a simple idea.</h1>
                    <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto">GetMeAChai is more than a platform; it's a community dedicated to fueling creativity, one cup at a time.</p>
                </div>
            </div>

            <section className="py-32">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
                            <p className="text-gray-600 mb-4">It all started with a simple thought: "I love this artist's work, I wish I could just buy them a chai to say thanks and support them." That small idea sparked a movement. We realized that the world is full of incredible creators—artists, writers, developers, musicians—who pour their hearts into their work, often with little support.</p>
                            <p className="text-gray-600">We created GetMeAChai to bridge that gap. To build a place where a small, meaningful gesture of support can make a huge difference. It's a platform built on the idea that everyone deserves a chance to pursue their passion, and that a community of supporters can turn dreams into reality.</p>
                        </div>
                        <div>
                            <img src="chai-about.avif" alt="Cup of chai" className="rounded-xl shadow-lg" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-32">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">What We Stand For</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="p-6">
                            <div className="flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-amber-100 mx-auto"><Lightbulb size={32} className="text-amber-500" /></div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Empower Creativity</h3>
                            <p className="text-gray-600">We provide the tools and platform for creators to thrive and focus on what they do best: creating.</p>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-amber-100 mx-auto"><Handshake size={32} className="text-amber-500" /></div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Foster Community</h3>
                            <p className="text-gray-600">We connect creators with their most passionate supporters, building relationships that go beyond funding.</p>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-amber-100 mx-auto"><Eye size={32} className="text-amber-500" /></div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Champion Transparency</h3>
                            <p className="text-gray-600">We believe in clear, honest communication. Creators and supporters always know where their money is going.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Meet the Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map(member => (
                            <div key={member.name}>
                                <img src={member.avatar} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md" />
                                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                                <p className="text-amber-600 font-semibold mb-2">{member.role}</p>
                                <p className="text-gray-600 text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            <section className="bg-amber-500 ">
                <div className="container mx-auto px-4 py-16 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Join Our Creative Community</h2>
                    <p className="max-w-2xl mx-auto mb-8">Whether you're a creator with a big idea or a supporter looking to make an impact, you have a home here.</p>
                    <div className="flex justify-center items-center gap-4 flex-wrap">
                        <Link href="/login" className="bg-white text-amber-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 w-56">
                            Start a Campaign
                        </Link>
                        <Link href="/creators" className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-amber-600 transition-all duration-300 transform hover:-translate-y-1 w-56">
                            Discover Creators
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default about   

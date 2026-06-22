import React from 'react'
import { Lightbulb, Handshake, Eye } from 'lucide-react';

export const metadata = {
    title: "About Us - Get me A Chai",
    description: "Learn more about Get me A Chai and our mission to support creators.",
    icon: "/favicon.png",
};  

const about = () => {
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
        </div>
    );
}

export default about   

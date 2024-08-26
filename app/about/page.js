import React from 'react'

export const metadata = {
    title: "About Us - Get me A Chai",
    description: "Learn more about Get me A Chai and our mission to support creators.",
    icon: "/favicon.png",
};  

const about = () => {
    return (
        <>
            <main className="max-w-4xl mx-auto p-6">
                <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-lg leading-relaxed">
                        Welcome to Get me A Chai, where we are dedicated to supporting creators and their communities. Our mission is to provide a platform that empowers creators to connect with their audience and receive support for their work.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
                    <p className="text-lg leading-relaxed">
                        We offer a range of tools and features designed to help creators thrive. From flexible membership tiers to seamless content management, our platform is built with your needs in mind.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                    <p className="text-lg leading-relaxed">
                        Our journey began with a simple idea: to create a space where creators can build meaningful relationships with their supporters. What started as a small project has grown into a vibrant community of passionate individuals.
                    </p>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                    <p className="text-lg leading-relaxed">
                        We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us at <a href="mailto:contact@getmeachai.com" className="text-blue-500 hover:underline">contact@getmeachai.com</a>.
                    </p>
                </section>
            </main>
        </>
    )
}

export default about   

import Campaign from "../models/Campaign.js";
import User from "../models/User.js";
import mongoose from "mongoose";


const allCreators = [
  {
    name: "Iron Man",
    username: "ironman",
    email: "ironman@avengers.com",
    razorpayid: "rzp_test_v54yD3C4TLhlSO",
    razorpaysecret: "mzeOkhc26e5YJQ912iuqmYUk",
    avatar: "iron_man_pp.jpeg",
    coverImage: "iron_man.png",
    bio: "Genius, billionaire, playboy, philanthropist. Also builds world-saving tech in his spare time.",
    supporters: 3420,
    projects: 5,
    category: "Tech",
  },
  {
    name: "Po from Kung Fu Panda",
    username: "kungfupanda",
    email: "po@kungfupanda.com",
    razorpayid: "rzp_test_v54yD3C4TLhlSO",
    razorpaysecret: "mzeOkhc26e5YJQ912iuqmYUk",
    avatar: "poo_pp.jpeg",
    coverImage: "poo.png",
    bio: "Kung Fu Master. Dumpling enthusiast. Teacher of inner peace and high kicks.",
    supporters: 1750,
    projects: 2,
    category: "Martial Arts",
  },
  {
    name: "Captain America",
    username: "captainamerica",
    email: "captain@avengers.com",
    razorpayid: "rzp_test_v54yD3C4TLhlSO",
    razorpaysecret: "mzeOkhc26e5YJQ912iuqmYUk",
    avatar: "captain_pp.jpeg",
    coverImage: "captain.png",
    bio: "Leader, soldier, and symbol of freedom. Always ready to rally the troops.",
    supporters: 2980,
    projects: 3,
    category: "Action",
  },
  {
    name: "Daredevil",
    username: "daredevil",
    email: "daredevil@murdock.com",
    razorpayid: "rzp_test_v54yD3C4TLhlSO",
    razorpaysecret: "mzeOkhc26e5YJQ912iuqmYUk",
    avatar: "daredevil_pp.jpeg",
    coverImage: "daredevil.png",
    bio: "Lawyer by day, vigilante by night. Protecting Hell’s Kitchen with justice and acrobatics.",
    supporters: 1640,
    projects: 1,
    category: "Justice",
  },
  {
    name: "The Author’s Minions",
    avatar: "minions_pp.jpeg",
    username: "minions",
    email: "minions@despicableme.com",
    razorpayid: "rzp_test_v54yD3C4TLhlSO",
    razorpaysecret: "mzeOkhc26e5YJQ912iuqmYUk",
    coverImage: "minions.png",
    bio: "Small, yellow, chaotic. Specializing in bananas, mischief, and helping creators succeed.",
    supporters: 920,
    projects: 1,
    category: "Comedy",
  },
  {
    name: "Deadpool",
    avatar: "deadpool_pp.jpeg",
    username: "deadpool",
    email: "deadpool@marvel.com",
    razorpayid: "rzp_test_v54yD3C4TLhlSO",
    razorpaysecret: "mzeOkhc26e5YJQ912iuqmYUk",
    coverImage: "deadpool.png",
    bio: "Merc with a Mouth. Breaking the fourth wall while breaking records.",
    supporters: 2100,
    projects: 2,
    category: "Comedy",
  },
];

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

async function seedDatabase() {
    try {
        const conn = await mongoose.connect('mongodb+srv://project-chai:chai1234@cluster0.g39ao.mongodb.net/chai');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log("Connected to MongoDB");
    
        // Clear existing users
        await User.deleteMany({});
        console.log("Existing users cleared");
        await Campaign.deleteMany({});
        console.log("Existing campaigns cleared");

        // Insert all creators and campaigns
        console.log("Seeding database with creators and campaigns...");
        await User.insertMany(allCreators);
        await Campaign.insertMany(campaigns);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();

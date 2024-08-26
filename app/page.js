import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="className=" text-white>
      <div className="flex flex-col gap-4 h-96 items-center justify-center text-white">
        <div>
          <h1 className="text-4xl font-bold text-center text-white">Welcome to Chai</h1>
          <p className="text-center text-sm px-6">A crowdfunding platform for devlopers to fund their projects with chai.</p>
        </div>
        <div className="flex justify-center">
          <Link href="/about">
            <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Read More</button>
          </Link>

          <Link href="/login">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          </Link>
        </div>
      </div>
      <hr className="opacity-15" />

      <div className="text-white flex flex-col justify-center items-center py-16">
        <h1 className="md:text-2xl text-xl font-bold pb-8">Your friends can buy you a Chai</h1>
        <div className="items flex gap-32 flex-col xl:flex-row">
          <div className="flex items-center justify-center flex-col">
            <img src="/support.gif" alt="support" />
            <p className="font-bold ">Friends want to help</p>
            <span>Your friends are available to support you</span>
          </div>
          <div className="flex items-center justify-center flex-col">
            <img src="/support.gif" alt="support" />
            <p className="font-bold">Friends want to contribute</p>
            <span>Your friends are willing to contribute financially</span>
          </div>
          <div className="flex items-center justify-center flex-col">
            <img src="/support.gif" alt="support" />
            <p className="font-bold">Friends want to collaborate</p>
            <span>Your friends are ready for collaboration</span>
          </div>
        </div>
      </div>
      <hr className="opacity-15" />

      <div className="flex flex-col justify-center items-center py-16">
        <h1 className="md:text-2xl text-xl font-bold pb-8">Learn more about us</h1>
        {/* embedding youtube video */}
        <iframe width="560" height="315" src="https://www.youtube.com/embed/3k3ZDmNpe3M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  );
}

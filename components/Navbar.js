"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import { Search, Bell, User, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';


const Navbar = () => {
  const { data: session, status } = useSession();
  const path = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);

  React.useEffect(() => {
    console.log("Params:", path);
    
    setShowDropdown(false);
    console.log("Session Data:", session);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [session, path]);

  const renderArrow = () => (
    <>
      {showDropdown ? (
        <ChevronUp size={16} className="ml-1 text-gray-500" />
      ) : (
        <ChevronDown size={16} className="ml-1 text-gray-500" />
      )}
    </>
  );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-bold text-gray-900">GetMeA<span className="text-amber-500">Chai</span></Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/creators" className="text-gray-600 hover:text-amber-500 transition-colors">Discover</Link>
            <Link href="/login" className="text-gray-600 hover:text-amber-500 transition-colors">Start a Campaign</Link>
            <Link href="/about" className="text-gray-600 hover:text-amber-500 transition-colors">About</Link>
          </nav>

          <div className="hidden relative md:flex items-center space-x-4">
            {(status === "authenticated") ? (
              // <Link href={'/dashboard'} >
                <div className="flex justify-center items-center text-amber-500  font-bold py-2 px-2 rounded-md hover:text-amber-600 transition-colors text-sm">
                  {/* <User size={20} className="text-gray-600 bg-white border rounded-full" /> */}
                  <Image src={session.user.image} height={30} width={30} alt={session.user.name} className="rounded-full" />
                  <button onClick={() => setShowDropdown(!showDropdown)} className='cursor-pointer ml-2 flex items-center py-1'>
                    {session.user.name} {renderArrow()}
                  </button>
                  {/* <span className="ml-2">My Dashboard</span> */}
                  {showDropdown && (
                    <div onMouseLeave={() => setShowDropdown(false)} className="absolute right-0 top-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                      <Link href="/dashboard" className="w-full text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Dashboard</Link>
                      <button onClick={() => signOut()} className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
                    </div>
                  )}
                </div>
              // </Link>
            ) : (
              <>
                <button className="text-gray-500 hover:text-amber-500"><Search size={20} /></button>
                <Link href={'/login'} className="text-gray-600 font-medium hover:text-amber-500 px-3 py-2 rounded-lg text-sm">Login</Link>
                <Link href={'/login?signup=true'} className="bg-amber-500 text-white font-bold py-2 px-4 rounded-full hover:bg-amber-600 transition-colors text-sm">Sign Up</Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-20 left-0 w-full">
          <nav className="flex flex-col p-4 space-y-4">
            <Link href="/creators" className="cursor-pointer text-gray-700 hover:text-amber-500">Discover</Link>
            <Link href="/login" className="cursor-pointer text-gray-700 hover:text-amber-500">Start a Campaign</Link>
            <Link href="/about" className="cursor-pointer text-gray-700 hover:text-amber-500">About</Link>
            {(status === "authenticated") && (
              // <Link href={'/dashboard'} >
                <div className="flex justify-center items-center text-amber-500  font-bold py-2 px-2 rounded-md hover:text-amber-600 transition-colors text-sm">
                  {/* <User size={20} className="text-gray-600 bg-white border rounded-full" /> */}
                  <Image src={session.user.image} height={30} width={30} alt={session.user.name} className="rounded-full" />
                  <button onClick={() => setShowDropdown(!showDropdown)} className='cursor-pointer ml-2 flex items-center py-1'>
                    {session.user.name} {renderArrow()}
                  </button>
                  {showDropdown && (
                    <div onMouseLeave={() => setShowDropdown(false)} className="absolute left-30 top-45 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                      <Link href="/dashboard" className="w-full text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Dashboard</Link>
                      <button onClick={() => signOut()} className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
                    </div>
                  )}
                  {/* <span className="ml-2">My Dashboard</span> */}
                </div>
              )}
            {/* <div className="border-t pt-4 flex items-center space-x-4"> */}
              {/* <button className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                <User size={20} className="text-gray-600" />
              </button> */}

              {/* <span className="text-gray-700">My Profile</span> */}
            {/* </div> */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar
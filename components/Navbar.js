"use client"
import React from 'react'
import { useSession, useState, signIn, signOut } from "next-auth/react"
import Link from "next/link";


const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = React.useState(false)
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }
  return (
    <nav className='flex justify-between p-4 py-4 items-center bg-blue-950 text-white'>
      <Link href={'/'} className="logo font-bold text-3xl">Chai</Link>
      <div className="links flex gap-5">
        <div className="flex flex-row ">
        </div>

        {session && session.user && <div className='relative'>
            <button onClick={() => setShowDropdown(!showDropdown)} onBlur={() => setTimeout(() => {
              setShowDropdown(false)
            }, 50)} id="dropdownInformationButton" data-dropdown-toggle="relative dropdownInformation" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.name}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            <div onMouseLeave={() => setShowDropdown(!showDropdown)} id="dropdownInformation" className={`absolute top-11 right-0 z-10 ${showDropdown ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div className="font-medium truncate">{session.user.email}</div>
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.username}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                </li>
                <li>
                  <Link href="/setting" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                </li>
              </ul>
              <div className="py-2">
                <Link onClick={() => signOut()} href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">Sign out</Link>
              </div>
            </div>
          </div>}
              {!session?.user && (
                <Link href={'/login'}>
                  <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
                </Link>
                )}

      </div>
    </nav>
  )
}

export default Navbar

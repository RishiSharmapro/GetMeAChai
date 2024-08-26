
import React from 'react'
// import { useSession, useState, signIn, signOut } from "next-auth/react"
import PaymentPage from '@/components/PaymentPage'
import { connectDB } from '@/db/connect'
import User from '@/models/User'
import { notFound } from 'next/navigation'


export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Get me A Chai`,
    description: `Support ${params.username} by making a payment.`,
    icon: "/favicon.png",
  }
}

const page = async ( {params} ) => {
    // if username is not available in the database, show 404 page
    const checkUser = async (username) => {
        await connectDB();
        const user = await User.findOne({username: username});
        if (!user) {
            return notFound();
        }
    }
    await checkUser(params.username);

  return (
    <>
        <PaymentPage params={params}/>
    </>
  )
}

export default page

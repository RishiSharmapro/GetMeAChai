import React from 'react'
import User from '@/models/User'
import CreatorPage from '@/components/CreatorPage'



export async function generateMetadata({ params }) {
  const { username }  = await params;
  return {
    title: `${username} - Get me A Chai`,
    description: `Support ${username} by making a payment.`,
    icon: "/favicon.png",
  }
}

const page = async ({ params }) => {
  const {username} = await params;

  return (
    <>
        {/* <PaymentPage params={params}/> */}
        <CreatorPage username={username} />
    </>
  )
}

export default page

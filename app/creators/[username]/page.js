import React from 'react'
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
        <CreatorPage username={username} />
    </>
  )
}

export default page

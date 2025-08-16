import React from 'react'
import DashboardPage from '@/components/Dashboard';

export const metadata = {
    title: "Dashboard - Get me A Chai",
    description: "Support your favourite creators by making a payment.",
    icon: "/favicon.png",
};

const dashboardPage = () => {
  return (
    <div>
        <DashboardPage />
    </div>
  )
}

export default dashboardPage

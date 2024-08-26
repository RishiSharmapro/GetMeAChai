"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { set } from 'mongoose'
import { updateProfile } from '@/actions/useractions'
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [form, setForm] = React.useState({})

  if (!session) {
    router.push('/login')
  }

  React.useEffect(() => {
    setForm({
      name: session?.user?.name,
      email: session?.user?.email,
      username: session?.user?.username,
      profilepicture: session?.user?.profilepicture,
      coverpicture: `https://picsum.photos/1000/${Math.round(visualViewport.height/2.1)}`,
      // coverpicture: `https://picsum.photos/1000/390`,
      razorpayid: session?.user?.razorpayid || null,
      razorpaysecret: session?.user?.razorpaysecret || null
    })
  }, [])


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    if(!form.name || !form.email || !form.username) {
      toast.error('Please fill all the fields', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
      return
    }
    updateProfile(form, session.user.username, session.user.email)
    toast('Profile Updated sucessfully!', {
      // type: 'success',
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });

    setTimeout(() => {
      router.push(`/${session.user.username}`)
    }, 6000)
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        limit={3}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition='Bounce'
      />

      <div>
        <div className='flex flex-col justify-center items-center md:p-12  py-16'>
          <h1 className='md:text-3xl text-xl font-bold text-center '>Welcome to the Dashborad</h1>
          <div className="sections md:w-[36rem]">
            {/* input for name */}
            <div className="my-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input value={form.name ? form.name : ""} onChange={handleChange}
                type="text"
                name='name' id="name" className='w-80 md:w-full px-3 py-2 rounded-lg bg-slate-700 focus:outline-none hover:ring-white focus:ring-1' placeholder='Enter name' />
            </div>
            {/* input for email */}
            <div className="my-2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input value={form.email ? form.email : ""} onChange={handleChange}
                type="email"
                name='email' id="email" className='w-80 md:w-full px-3 py-2 rounded-lg bg-slate-700 focus:outline-none hover:ring-white focus:ring-1' placeholder='Enter email' />
            </div>
            {/* input for username */}
            <div className="my-2">
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username </label>
              <input value={form.username ? form.username : ""} onChange={handleChange}
                type="text"
                name='username' id="username" className='w-80 md:w-full px-3 py-2 rounded-lg bg-slate-700 focus:outline-none hover:ring-white focus:ring-1' placeholder='Enter username' />
            </div>
            {/* input for profile picture */}
            <div className="my-2">
              <label htmlFor="profilepicture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
              <input value={form.profilepicture ? form.profilepicture : ""} onChange={handleChange}
                type="text"
                name='profilepicture' id="profilepicture" className='w-80 md:w-full px-3 py-2 rounded-lg bg-slate-700 focus:outline-none hover:ring-white focus:ring-1' placeholder='Enter profile picture' />
            </div>
            {/* input for cover picture */}
            <div className="my-2">
              <label htmlFor="coverpicture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
              <input value={form.coverpicture ? form.coverpicture : ""} onChange={handleChange}
                type="text"
                name='coverpicture' id="coverpicture" className='w-80 md:w-full px-3 py-2 rounded-lg bg-slate-700 focus:outline-none hover:ring-white focus:ring-1' placeholder='Enter cover picture' />
            </div>


            {/* input for Razorpay id */}
            <div className="my-2">
              <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Id</label>
              <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange}
                type="text"
                name='razorpayid' id="razorpayid" className='w-80 md:w-full px-3 py-2 rounded-lg bg-slate-700 focus:outline-none hover:ring-white focus:ring-1' placeholder='Enter razorpay id' />
            </div>
            {/* input for Razorpay secret */}
            <div className="my-2">
              <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
              <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange}
                type="text"
                name='razorpaysecret' id="razorpaysecret" className='w-80 md:w-full px-3 py-2 rounded-lg bg-slate-700 focus:outline-none hover:ring-white focus:ring-1' placeholder="Enter razorpay secret" />
            </div>

            <div>
              <button onClick={handleSave} className='bg-blue-600 hover:bg-blue-700 text-white py-2 my-4 rounded-lg w-80 md:w-[36rem]'>Save</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

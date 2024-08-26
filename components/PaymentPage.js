'use client'

import React from 'react'
import Script from 'next/script'
import { createOrder, fetchUser, getUserSupporters } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'



const PaymentPage = ({ params }) => {
    const { data: session } = useSession()
    const [paymentform, setPaymentform] = React.useState({ name: "", message: "", amount: "" });
    const [supporters, setSupporters] = React.useState([]);
    const [user, setUser] = React.useState();
    const searchParams = useSearchParams();
    const router = useRouter();

    React.useEffect(() => {
        if(searchParams.get('status') === 'success') {
            toast('Success! We Got Your Payment', {
                type: 'success',
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
            router.replace(`/${params.username}`);
        }
        const fetchSupporters = async () => {
            const data = await getUserSupporters(params.username);
            const userData = await fetchUser(params.username);
            setSupporters(data);
            setUser(userData);
        }
        fetchSupporters();
    }, [])

    const handleChange = (e) => {
        setPaymentform({
            ...paymentform,
            [e.target.name]: e.target.value
        })
    }

    const pay = async (amount) => {
        if(amount < 1) {
            toast.error('Amount should be greater than 0', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
            });
            return;
        }
        //get a order id from the backend
        const id = await createOrder(amount, params.username, paymentform);
        const orderId = id.id;

        var options = {
            "key": user.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Chai", //your business name
            "description": "Test Transaction",
            "image": "/chai.png",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": user.name, //your customer's name
                "email": user.email,
                "contact": `+917089632368` //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
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
                transition= 'Bounce'
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div>
                <div className="head relative">
                    {/* <img src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/11283601/de102b58a1754109b0c1510f4182bfd1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/5.png?token-time=1722729600&token-hash=B-LbF9hB7UVkVFb3VvBxY2OhcF0rb0_wLlFtfozA-Eo%3D" alt="img" /> */}
                    <div className={`cover-pic min-h-[16vh]`}>
                    <img src={ `https://picsum.photos/1000/${Math.round(visualViewport.height/2.1)}`} alt="img" className='w-screen border border-slate-700' />
                    </div>
                    <div className='profile-pic absolute -bottom-12 flex w-full justify-center'>
                        <img className='md:w-32 w-28 rounded-md' src={user?.profilepicture || 'https://picsum.photos/400/400'} alt="profile-pic" />
                        {/* <img className='w-32 rounded-md' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/11283601/c5f7b7bb28c340869255cc8d9dc781f7/eyJoIjoxMDgwLCJ3IjoxMDgwfQ%3D%3D/9.jpg?token-time=1723507200&token-hash=KR8yKCCSfkg1_CO-sEYSrADVEMqJGwU0AdndoWs28RY%3D" alt="profile-pic" /> */}
                    </div>
                </div>
                <div className='user my-16'>
                    <div className='flex justify-center'>
                        <h1 className='md:text-2xl text-xl font-bold'>@{decodeURIComponent(params.username)}</h1>
                    </div>
                    <div className='flex justify-center text-zinc-500 text-center'>
                        <p>Long Covid advocacy, community, mutual aid, disability justice, poetry, and plants🪴</p>
                    </div>
                    <div className='flex justify-center text-zinc-500'>
                        <p>{supporters.length} Payments • ₹{supporters.reduce((a,b) => a + parseInt(b.amount), 0)} raised</p>
                    </div>
                </div>
                <div className="payments flex md:flex-row flex-col max-w-full xl:mx-28 xl:gap-6 pb-16">
                    <div className="supportersList md:w-1/2 bg-slate-800 rounded-lg m-4 md:p-8 p-4 md:h-96">
                        <h1 className="md:text-2xl text-xl font-bold mb-3">Supporters</h1>
                        <ul className="px-3 overflow-scroll md:h-64">
                            {supporters.map((supporter, index) => (
                                index !== null && (
                                    <li key={index} className='flex items-center py-2'>
                                        <img width={30} src="/avatar.gif" alt="avatar" className='self-start mx-2' />
                                        <span>
                                            {supporter.name} donated <span className='font-semibold'>₹{supporter.amount}</span> with a message "{supporter.message}"
                                        </span>
                                    </li>
                                )
                            ))}
                            {supporters.length === 0 && <p className='text-center'>No supporters yet</p>}
                        </ul>
                    </div>
                    <div className="support md:w-1/2 bg-slate-800 rounded-lg flex flex-col m-4 gap-2 md:p-8 p-4 md:h-96">
                        <h2 className='text-2xl font-bold'>Make a Payment</h2>
                        <input onChange={handleChange} value={paymentform.name} name="name" className='w-full p-3 rounded-lg bg-slate-700 focus:outline-none hover:ring-white focus:ring-1' type="text" placeholder="Enter a name" />
                        <input onChange={handleChange} value={paymentform.message} name="message" className='w-full p-3 rounded-lg bg-slate-700 focus:outline-none hover:ring-white focus:ring-1' type="text" placeholder="Enter a message" />
                        <input onChange={handleChange} value={paymentform.amount} name="amount" className='w-full p-3 rounded-lg bg-slate-700 focus:outline-none hover:ring-white focus:ring-1 -moz-appearance:textfield -webkit-appearance:none arrow-hide' type="number" placeholder="Enter a amount" />
                        <button className='bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-lg disabled:hover:cursor-not-allowed disabled:hover:bg-blue-900' onClick={() => pay(paymentform.amount)} disabled={paymentform.name.length < 3 || paymentform.message.length < 4}>Pay</button>

                        <div className="flex gap-4 mt-3 ">
                            <button className='bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-lg disabled:hover:cursor-not-allowed disabled:hover:bg-blue-900' disabled={paymentform.name.length < 3 || paymentform.message.length < 4} onClick={() => pay(100)}>₹100</button>
                            <button className='bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-lg disabled:hover:cursor-not-allowed disabled:hover:bg-blue-900' disabled={paymentform.name.length < 3 || paymentform.message.length < 4} onClick={() => pay(200)}>₹200</button>
                            <button className='bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-lg disabled:hover:cursor-not-allowed disabled:hover:bg-blue-900' disabled={paymentform.name.length < 3 || paymentform.message.length < 4} onClick={() => pay(500)}>₹500</button>
                            <button className='bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-lg disabled:hover:cursor-not-allowed disabled:hover:bg-blue-900' disabled={paymentform.name.length < 3 || paymentform.message.length < 4} onClick={() => pay(1000)}>₹1000</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
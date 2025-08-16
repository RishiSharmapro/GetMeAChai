'use client';
import { useState } from "react";
import { Shield, X } from 'lucide-react';
import { createOrder } from "@/actions/useractions";
// import { toast, Flip } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";


const PaymentModal = ({ isOpen, onClose, creatorUsername }) => {
    const [amount, setAmount] = useState(10);
    const [paymentform, setPaymentform] = useState({ name: "", message: "" });
    const presetAmounts = [50, 100, 200, 500, 1000];


    // Placeholder for Razorpay integration
    const handlePayment = async () => {
        console.log(`Initiating payment of ₹${amount} to ${creatorUsername}`);
        pay(amount);
        // alert(`This would open Razorpay to process a payment of ₹${amount} to ${creatorUsername}.`);
        onClose();
    };

    const pay = async (amount) => {
        if (amount < 1) {
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
        console.log(`Creating order for amount: $${amount}, creator: ${creatorUsername}`);

        const id = await createOrder(amount, creatorUsername, paymentform);
        const orderId = id.id;
        // console.log(`Order ID received: ${orderId}`);

        var options = {
            "key": process.env.NEXT_PUBLIC_RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Chai", //your business name
            "description": "Test Transaction",
            "image": "/chai.png",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": paymentform.name, //your customer's name
                "email": 'xyz@zyx.com',
                "contact": `+917089632368` //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        // console.log(`Razorpay options: ${JSON.stringify(options)}`);
        var rzp1 = new window.Razorpay(options);
        console.log(`Razorpay instance created: ${JSON.stringify(rzp1)}`);
        rzp1.open();
    }

    if (!isOpen) return null;

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={() => {
                    console.log('Script has loaded')
                }}
            />
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all" onClick={(e) => e.stopPropagation()}>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Support {creatorUsername}</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>
                        <p className="text-gray-600 mb-6">Your contribution helps creators continue their passion. Thank you!</p>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Choose an amount (USD)</label>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {presetAmounts.map(setAmt => (
                                    <button key={setAmt} onClick={() => setAmount(setAmt)} className={`px-4 py-2 rounded-lg border transition-colors flex-grow ${amount === setAmt ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}>
                                        ₹{setAmt}
                                    </button>
                                ))}
                            </div>
                            <div className="relative mb-4">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full pl-7 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" placeholder="10" />
                                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">INR</span>
                            </div>
                            <div className="relative">
                                <input type="text" placeholder="Your Name" onChange={(e) => setPaymentform({ ...paymentform, name: e.target.value })} className="w-full pl-7 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 mb-2" />
                                <input type="text" placeholder="Add a message" onChange={(e) => setPaymentform({ ...paymentform, message: e.target.value })} className="w-full pl-7 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" />
                            </div>
                        </div>
                        <button onClick={handlePayment} className="w-full bg-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center space-x-2">
                            <Shield size={20} />
                            <span>Pay Securely with Razorpay</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentModal;
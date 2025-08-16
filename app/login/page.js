"use client";
import { useEffect, useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// import { useSession, signIn, signOut } from "next-auth/react"
// import { useRouter } from 'next/navigation'

// const page = () => {
//   const { data: session } = useSession()
//   const router = useRouter()

//   useEffect(() => {
//     document.title = 'Login - Get me A Chai'
//     document.querySelector('meta[name="description"]').setAttribute('content', 'Login to your account')
//     if(session) {
//       router.push('/dashboard')
//       // router.replace('/dashboard')
//     }
//   }, [router, session])

//   // if(session?.user) {
//   //   router.push('/dashboard')
//   //   // router.replace('/dashboard')
//   // }

//   return (
//     <div className='flex flex-col justify-center items-center text-white py-32 '>
//       <div className="wrapper border bg-neutral-50/5 p-16 rounded-md">
//         <h1 className="text-4xl font-bold text-center text-white pb-12">Login/Signup to get you account </h1>
//         <div className="login-btn flex flex-col justify-center items-center py-3">
//             <button type="button" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2 w-[13.3rem]">
//             <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
//             <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
//             </svg>
//             Sign in with Facebook
//             </button>
//             <button type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2 w-[13.3rem]">
//             <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
//             <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd"/>
//             </svg>
//             Sign in with Twitter
//             </button>
//             <button onClick={()=> signIn('github')} type="button" className="text-white bg-[#2a2e34] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2 w-[13.3rem]">
//             <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd"/>
//             </svg>
//             Sign in with Github
//             </button>
//             <button type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 w-[13.3rem]">
//             <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
//             <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
//             </svg>
//             Sign in with Google
//             </button>
//             <button type="button" className="text-white bg-[#000000] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2 w-[13.3rem]">
//             <svg className="w-5 h-5 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
//             Sign in with Apple
//             </button>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default page

const AuthPage = () => {
    const { data: currSession, status } = useSession();
    const router = useRouter();
    // const searchParams = useSearchParams();
    const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
    const [loginType, setLoginType] = useState("supporter"); // 'supporter' or 'creator'

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard");
        }

        // if (searchParams.get('signup') === 'true') {
        //     setAuthMode('signup');
        // } else {
        //     setAuthMode('login');
        // }

        // if (authMode === 'signup') {
        //     router.push('/login?signup=true');
        // }
        // else {
        //     router.push('/login');
        // }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        console.log({ email, password });

        const res = await signIn("credentials", {
            redirect: false, // prevent auto redirect
            email,
            password,
        });

        if (res?.error) {
            console.log(res.error);
        } else if (res?.ok) {
            router.push("/dashboard");
        }
    };

    const handleGoogleSignIn = async () => {
        console.log("Handling Google sign in");
        await signIn("google", {
            redirectTo: "/dashboard",
        });
    };

    const handleGithubSignIn = async () => {
        console.log("Handling sign in");
        await signIn("github", {
            redirectTo: "/dashboard",
        });
    };

    const SocialButton = ({ icon, handler, provider }) => (
        <button 
        onClick={handler}
        className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-md font-medium text-gray-800">
            {icon}
            <span>Sign in with {provider}</span>
        </button>
    );

    return (
        // <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4">
        //     <div className="w-full max-w-md">
        //         <div className="text-center mb-8">
        //             <h1 className="text-3xl font-bold text-gray-900">
        //                 {authMode === "login" ? "Welcome Back" : "Join GetMeAChai"}
        //             </h1>
        //             <p className="text-gray-600 mt-2">
        //                 {authMode === "login"
        //                     ? "Log in to continue your journey."
        //                     : "Create an account to start supporting or creating."}
        //             </p>
        //         </div>

        //         <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        //             <div className="grid grid-cols-2 gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
        //                 <button
        //                     onClick={() => setLoginType("supporter")}
        //                     className={`py-2.5 rounded-md text-sm font-semibold transition-colors ${loginType === "supporter"
        //                             ? "bg-white shadow text-amber-600"
        //                             : "text-gray-600 hover:bg-gray-200"
        //                         }`}
        //                 >
        //                     I'm a Supporter
        //                 </button>
        //                 <button
        //                     onClick={() => setLoginType("creator")}
        //                     className={`py-2.5 rounded-md text-sm font-semibold transition-colors ${loginType === "creator"
        //                             ? "bg-white shadow text-amber-600"
        //                             : "text-gray-600 hover:bg-gray-200"
        //                         }`}
        //                 >
        //                     I'm a Creator
        //                 </button>
        //             </div>

        //             <form onSubmit={handleSubmit} className="space-y-6">
        //                 {authMode === "signup" && (
        //                     <div className="relative">
        //                         <User
        //                             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        //                             size={20}
        //                         />
        //                         <input
        //                             type="text"
        //                             placeholder="Full Name"
        //                             name="name"
        //                             required
        //                             className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
        //                         />
        //                     </div>
        //                 )}
        //                 <div className="relative">
        //                     <Mail
        //                         className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        //                         size={20}
        //                     />
        //                     <input
        //                         type="email"
        //                         name="email"
        //                         placeholder="Email Address"
        //                         required
        //                         className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
        //                     />
        //                 </div>
        //                 <div className="relative">
        //                     <Lock
        //                         className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        //                         size={20}
        //                     />
        //                     <input
        //                         type="password"
        //                         name="password"
        //                         placeholder="Password"
        //                         required
        //                         className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
        //                     />
        //                 </div>

        //                 {authMode === "login" && (
        //                     <div className="flex items-center justify-between text-sm">
        //                         <div className="flex items-center gap-2">
        //                             <input
        //                                 id="remember-me"
        //                                 type="checkbox"
        //                                 className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
        //                             />
        //                             <label htmlFor="remember-me" className="text-gray-600">
        //                                 Remember me
        //                             </label>
        //                         </div>
        //                         <a
        //                             href="#"
        //                             className="font-medium text-amber-600 hover:text-amber-500"
        //                         >
        //                             Forgot password?
        //                         </a>
        //                     </div>
        //                 )}

        //                 <div>
        //                     <button
        //                         type="submit"
        //                         className="cursor-pointer w-full bg-amber-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-600 transition-colors"
        //                     >
        //                         {authMode === "login"
        //                             ? `Log In as a ${loginType.charAt(0).toUpperCase() + loginType.slice(1)
        //                             }`
        //                             : "Create Account"}
        //                     </button>
        //                 </div>
        //             </form>

        //             <div className="relative my-8">
        //                 <div className="absolute inset-0 flex items-center">
        //                     <div className="w-full border-t border-gray-300" />
        //                 </div>
        //                 <div className="relative flex justify-center text-sm">
        //                     <span className="bg-white px-2 text-gray-500">
        //                         Or continue with
        //                     </span>
        //                 </div>
        //             </div>

        //             <div className="flex flex-col sm:flex-row gap-4">
        //                 <button
        //                     onClick={handleGoogleSignIn}
        //                     className="cursor-pointer flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        //                 >
        //                     <img src="./google-icon.svg" alt="Google" className="w-5 h-5" />
        //                     Google
        //                 </button>
        //                 <button
        //                     onClick={handleGithubSignIn}
        //                     className="cursor-pointer flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        //                 >
        //                     <img src="./github-icon.svg" alt="Github" className="w-5 h-5" />
        //                     Github
        //                 </button>
        //             </div>

        //             <p className="mt-8 text-center text-sm text-gray-600">
        //                 {authMode === "login"
        //                     ? "Don't have an account?"
        //                     : "Already have an account?"}
        //                 <button
        //                     onClick={() =>
        //                         setAuthMode(authMode === "login" ? "signup" : "login")
        //                     }
        //                     className="cursor-pointer font-medium text-amber-600 hover:text-amber-500 ml-1"
        //                 >
        //                     {authMode === "login" ? "Sign up" : "Log in"}
        //                 </button>
        //             </p>
        //         </div>
        //     </div>
        // </div>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                     <h1 className="text-3xl font-bold text-gray-900">Join GetMeAChai</h1>
                    <p className="text-gray-600 mt-2">Sign in or create an account to continue.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="grid grid-cols-2 gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
                        <button 
                            onClick={() => setLoginType('supporter')}
                            className={`py-2.5 rounded-md text-sm font-semibold transition-colors ${loginType === 'supporter' ? 'bg-white shadow text-amber-600' : 'text-gray-600 hover:bg-gray-200'}`}
                        >
                            I'm a Supporter
                        </button>
                        <button 
                            onClick={() => setLoginType('creator')}
                            className={`py-2.5 rounded-md text-sm font-semibold transition-colors ${loginType === 'creator' ? 'bg-white shadow text-amber-600' : 'text-gray-600 hover:bg-gray-200'}`}
                        >
                            I'm a Creator
                        </button>
                    </div>

                    <div className="space-y-4">
                        <SocialButton 
                            handler={handleGoogleSignIn}
                            provider="Google"
                            icon={<svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.03,4.73 15.69,5.36 16.95,6.45L19.05,4.36C17.22,2.79 15,2 12.19,2C6.92,2 2.71,6.62 2.71,12C2.71,17.38 6.92,22 12.19,22C17.6,22 21.54,18.33 21.54,12.23C21.54,11.76 21.48,11.43 21.35,11.1Z"></path></svg>}
                        />
                        <SocialButton 
                            handler={handleGithubSignIn}
                            provider="GitHub"
                            icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>}
                        />
                    </div>

                    <p className="mt-8 text-center text-xs text-gray-500">
                        By continuing, you agree to the GetMeAChai <a href="#" className="underline hover:text-gray-700">Terms of Service</a> and <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;

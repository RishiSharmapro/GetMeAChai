"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AuthPage = () => {
    const { data: currSession, status } = useSession();
    const router = useRouter();
    const [loginType, setLoginType] = useState("supporter"); // 'supporter' or 'creator'

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard");
        }
    }, []);


    const handleGoogleSignIn = async () => {
        await signIn("google", {
            redirectTo: "/dashboard",
        });
    };

    const handleGithubSignIn = async () => {
        await signIn("github", {
            redirectTo: "/dashboard",
        });
    };

    const SocialButton = ({ icon, handler, provider }) => (
        <button
            onClick={handler}
            className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-md font-medium text-gray-800 cursor-pointer">
            {icon}
            <span>Sign in with {provider}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4">
            <div className="w-full max-w-sm">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Join GetMeA<span className="text-amber-500">Chai</span></h1>
                        <p className="text-gray-600 mt-2">Sign in or create an account to continue.</p>
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
                            icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>}
                        />
                        <button
                            onClick={() => router.push("/")}
                            className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-md font-medium text-gray-800 cursor-pointer">
                            <span>Back to GetMeAChai</span>
                        </button>
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

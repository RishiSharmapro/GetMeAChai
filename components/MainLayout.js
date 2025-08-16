'use client';
import { get_url } from '.';
import Navbar from './Navbar';
import Footer from './Footer';
import AuthPage from '@/app/login/page';

const MainLayout = ({ children }) => {
    const currentPath = get_url();
    if (currentPath === '/login' || currentPath === '/register') {
        return (
            <>
                <AuthPage />
            </>
        )
    }

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default MainLayout
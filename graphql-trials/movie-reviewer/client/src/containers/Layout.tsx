import { Outlet } from "react-router-dom"
import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function Layout() {

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow py-11">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
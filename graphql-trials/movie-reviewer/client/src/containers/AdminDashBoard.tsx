import useAuthContext from "@/hooks/useAuthContext"
import { NavLink, Navigate, Outlet } from "react-router-dom";
import clsx from 'clsx';

const navLinkClasses = ({ isActive }: { isActive: boolean }) => clsx("text-xl font-medium px-9 py-2.5 rounded-[7.5px] duration-500 ease-in-out hover:scale-[1.05]", !isActive ? "bg-gray-400 text-background" : "bg-primary text-background")

export default function AdminDashBoard() {
    const { authInfo, loadingAuth } = useAuthContext();


    if (loadingAuth) {
        return <div>Loading Please Wait...</div>
    }

    return authInfo.auth && authInfo.role === "ADMIN" ? (
        <div className="mb-myspace mx-myspace">
            <div className="flex justify-center items-center gap-x-3 mb-11">
                <NavLink to="/admin/manage-movies" className={navLinkClasses} >Manage Movies</NavLink>
                <NavLink to="/admin/manage-celebs" className={navLinkClasses} >Manage Celebs</NavLink>
            </div>
            <Outlet />
        </div>
    ) : <Navigate to="/" replace />
}
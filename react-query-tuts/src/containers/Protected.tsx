import { Outlet, Navigate } from "react-router-dom";
import url from "../helpers/urldata";
import useAuthState from "../context/AuthContext";
import StaircaseLoader from "../components/StaircaseLoader";



export default function Protected({ role }: { role: authStatus }) {
    const { authState: { status } } = useAuthState();

    if (status === "loading") {
        return <StaircaseLoader />
    }

    return status === role ? <Outlet /> : <Navigate to={url.home.value} replace />
}
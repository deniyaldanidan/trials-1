import { Link } from 'react-router-dom';
import clsx from 'clsx';
import LoginBTN from './LoginBTN';
import RegisterBTN from './RegisterBTN';
import useAuthContext from '@/hooks/useAuthContext';
import myAxios from '@/lib/myAxios';


const basicMenuClassNames = "text-xl capitalize font-medium hover:text-accent duration-150 ease-in-out cursor-pointer";

export default function Header() {
    const { authInfo, resetAuth } = useAuthContext();

    const logoutHandler = async () => {
        try {
            await myAxios.post("/logout");
            resetAuth()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className=" sticky top-0 left-0 flex items-center justify-between px-myspace py-4 bg-background border-b-[1.5px] border-b-border">
            <div className="text-2xl font-serif text-primary">Pixel Ratings</div>
            <div className="flex items-center gap-x-8">
                <Link className={clsx(basicMenuClassNames)} to="/">Home</Link>
                {authInfo.auth ? (<>
                    <Link to="/profile" className={basicMenuClassNames}>{authInfo.name}</Link>
                    {
                        authInfo.role === "ADMIN" ? <Link to="/admin/manage-movies" className={basicMenuClassNames}>Admin Dashboard</Link> : ""
                    }
                    <button className={basicMenuClassNames} onClick={logoutHandler} >Logout</button>
                </>) : (<>
                    <LoginBTN className={basicMenuClassNames} />
                    <RegisterBTN className={basicMenuClassNames} />
                </>)}
            </div>
        </header>
    )
}
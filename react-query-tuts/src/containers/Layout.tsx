import clsx from 'clsx';
import styles from '../styles/containers/layout.module.scss';
import { NavLink, Outlet } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import useAuthState from '../context/AuthContext';
import useDarkLightTheme from '../context/DarkLightContext';
import DarkLightToggler from '../components/DarkLightToggler';

const menuClasses = (isActive: boolean, isDark?: boolean) => {
    return clsx(styles.menu, isActive && styles.active_menu)
}

export default function Layout() {
    const { theme } = useDarkLightTheme();
    const { authState: { status, userInfo } } = useAuthState();
    const logout = useLogout();

    return (
        <div className={clsx(styles.app, theme === "light" && styles.appLight)}>
            <header>
                <div className={styles.logo}>Ideas</div>
                <div className={styles.menus}>
                    <NavLink to="/"
                        className={({ isActive }) => menuClasses(isActive)}
                    >Home</NavLink>
                    {
                        status === "auth" ? (
                            <>
                                <div className={styles.menu}>{userInfo?.name}</div>
                                <div className={styles.menu} onClick={() => logout()}>logout</div>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login"
                                    className={({ isActive }) => menuClasses(isActive)}
                                >Login</NavLink>
                                <NavLink to="/register"
                                    className={({ isActive }) => menuClasses(isActive)}
                                >Register</NavLink>
                            </>
                        )}
                    <DarkLightToggler />
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                &copy; Copyright 2023. Dani's Products
            </footer>
        </div>
    )
}
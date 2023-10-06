import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';
import useDarkLightTheme from '../context/DarkLightContext';
import styles from '../styles/components/dark-light-toggler.module.scss';
import clsx from 'clsx';

export default function DarkLightToggler() {
    const { theme, setTheme } = useDarkLightTheme();

    return (
        <div className={clsx(styles.themeTogg, theme === "light" && styles.light)} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {
                theme === "dark" ? <BsFillSunFill /> : <BsMoonStarsFill />
            }
        </div>
    )
}
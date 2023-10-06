import useDarkLightTheme from '../context/DarkLightContext';
import styles from '../styles/components/staircase-loader.module.scss';
import clsx from 'clsx';

export default function StaircaseLoader() {
    const { theme } = useDarkLightTheme();

    return (
        <div className={clsx(styles.loader_container, theme === "light" && styles.light)}>
            <div className={styles.loader}>
                <div className={styles.loader__bar}></div>
                <div className={styles.loader__bar}></div>
                <div className={styles.loader__bar}></div>
                <div className={styles.loader__bar}></div>
                <div className={styles.loader__bar}></div>
                <div className={styles.loader__ball}></div>
            </div>
            <h1>Loading..</h1>
        </div>
    )
}
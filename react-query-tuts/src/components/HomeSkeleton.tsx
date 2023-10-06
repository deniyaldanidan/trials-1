import useDarkLightTheme from '../context/DarkLightContext';
import styles from '../styles/components/home-skeleton.module.scss';
import clsx from 'clsx';

export default function HomeSkeleton() {
    const { theme } = useDarkLightTheme();

    return (
        <div className={clsx(styles.homeSkeleton, theme === "light" && styles.lightHSKLTN)}>
            <div className={styles.skeletonpghd}>Latest Ideas</div>
            <div className={styles.skeletonideas}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
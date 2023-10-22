import { useQuery } from '@tanstack/react-query';
import { fetchIdeasClient } from '../helpers/myAxios';
import styles from '../styles/pages/home.module.scss';
import IdeaCard from '../components/IdeaCard';
import HomeSkeleton from '../components/HomeSkeleton';
import useDarkLightTheme from '../context/DarkLightContext';
import clsx from 'clsx';


export default function Home() {
    const { theme } = useDarkLightTheme();
    const { isLoading, data, isError, refetch, isRefetching } = useQuery({
        queryKey: ["ideas"],
        queryFn: fetchIdeasClient,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    })

    if (isLoading || isRefetching) {
        return (
            <HomeSkeleton />
        )
    }

    if (isError) {
        return (
            <div>Error happened</div>
        )
    }

    return (
        <div className={clsx(styles.homePage, theme === "light" && styles.homePageLight)}>
            <div className={styles.pageHead}>
                <span>Latest Ideas</span>
                <button onClick={() => refetch()}>Reload</button>
            </div>
            <div className={styles.ideasList}>
                {
                    data.map((idea) =>
                        <IdeaCard key={idea.id} idea={idea} />
                    )
                }
            </div>
        </div>
    )
}
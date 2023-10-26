import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchIdeasClient } from '../helpers/myAxios';
import styles from '../styles/pages/home.module.scss';
import IdeaCard from '../components/IdeaCard';
import HomeSkeleton from '../components/HomeSkeleton';
import useDarkLightTheme from '../context/DarkLightContext';
import clsx from 'clsx';
import { allIdeasQKEY } from '../helpers/query-keys';
import React from 'react';


export default function Home() {
    const { theme } = useDarkLightTheme();

    const { data, fetchNextPage, isFetching, isFetchingNextPage, isError, refetch, hasNextPage } = useInfiniteQuery({
        queryKey: allIdeasQKEY,
        queryFn: fetchIdeasClient,
        initialPageParam: 1,
        getNextPageParam(lastPage, __, lastPageParam) {
            return lastPage.length ? lastPageParam + 1 : undefined
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });

    if (isError) {
        return (
            <div>
                <div>Some Error Happened</div>
                <button onClick={() => refetch()}>Refetch</button>
            </div>
        )
    }

    if (isFetching) {
        return (
            <HomeSkeleton />
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
                    data?.pages.length ? (data.pages.map((group, i) =>
                        <React.Fragment key={i}>
                            {
                                group.map(idea => <IdeaCard key={idea.id} idea={idea} />)
                            }
                        </React.Fragment>
                    )
                    ) : <div>No List to show</div>
                }
            </div>
            {
                hasNextPage ? <button disabled={isFetchingNextPage} onClick={() => fetchNextPage()} className={styles.loadMoreBTN} >{isFetchingNextPage ? "Loading" : "Load More"}</button> : ""
            }
        </div>
    )
}

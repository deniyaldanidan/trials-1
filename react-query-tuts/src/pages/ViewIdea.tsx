import { useQuery } from "@tanstack/react-query"
import { fetchOneIdeaClient } from "../helpers/myAxios"
import { CUST404 } from "../helpers"
import { Link, useParams } from "react-router-dom"
import { z } from "zod"
import myValidators from "../helpers/validator"
import IdeaCard from "../components/IdeaCard"
import { useMemo } from "react"
import styles from '../styles/pages/view-idea.module.scss';
import useDarkLightTheme from "../context/DarkLightContext"
import clsx from "clsx"
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import useAuthState from "../context/AuthContext";
import { useDeleteIdea } from "../hooks/useDeleteIdea";
import { useLikeUnlike } from "../hooks/useLikeUnlike";
import url from "../helpers/urldata"
import { oneIdeaQKEY } from "../helpers/query-keys"


const validator = z.object({
    id: myValidators.convertableValidIntId
})

export default function ViewIdea() {
    const params = validator.safeParse(useParams());
    const { theme } = useDarkLightTheme();
    const { authState } = useAuthState();

    const { isLoading, error, isError, data } = useQuery({
        queryKey: oneIdeaQKEY(params.success ? params.data.id : null),
        queryFn: () => params.success ? fetchOneIdeaClient(params.data.id) : null,
        retry(failureCount, error) {
            if (failureCount >= 3) {
                return false
            }
            if (error instanceof CUST404) {
                return false
            }
            return true;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });

    const { mutate: likeFN, isLoading: isLiking } = useLikeUnlike();
    const { deleteFN, isDeleting } = useDeleteIdea();


    const ideaInfo: Idea1 | null = useMemo(() => {
        if (data) {
            return {
                ...data, comments: undefined, _count: {
                    comments: data.comments.length
                }
            }
        }
        return null;
    }, [data]);



    if (!params.success) {
        return <div>Invalid Path</div>
    }

    if (isError) {
        return error instanceof CUST404 ? <div>404 Not Found</div> : <div>Error Happened</div>
    }

    if (isLoading) {
        return (
            <div>Loading idea...</div>
        )
    }

    return ideaInfo ? (
        <div className={clsx(styles.viewPage, theme === "light" && styles.viewPageLight)}>
            <IdeaCard
                idea={ideaInfo}
                viewPage
                isLiking={isLiking}
                likeFunc={likeFN}
                authBTNS={
                    (className: string) => {
                        return (authState.status === "auth" && authState.userInfo.username === ideaInfo.Author.username) ? (
                            <div className={className}>
                                <Link to={url.updateIdea.value} state={{ id: ideaInfo.id, content: ideaInfo.content }}><AiFillEdit /></Link>
                                <AiFillDelete onClick={() => !isDeleting && deleteFN(ideaInfo.id)} />
                            </div>
                        ) : ""
                    }
                }
            />
        </div>
    ) : (
        <div>No data to display</div>
    )
}
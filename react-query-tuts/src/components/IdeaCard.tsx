import { avatarGen, getFullName, readableDate } from "../helpers";
import { FaPlus, FaPen, FaComments, FaThumbsUp, FaThumbsDown, FaShare } from 'react-icons/fa';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import styles from '../styles/components/idea-card.module.scss';
import { Link } from "react-router-dom";
import clsx from "clsx";
import useDarkLightTheme from "../context/DarkLightContext";
import useAuthState from "../context/AuthContext";
import url from "../helpers/urldata";

export default function IdeaCard({ idea }: { idea: Idea1 }) {

    const { authState } = useAuthState();

    const nlikes: number = idea.likes.filter(like => like.value === "like").length;
    const ndislikes: number = idea.likes.filter(like => like.value === "Dislike").length;
    const { theme } = useDarkLightTheme();

    return (
        <div className={clsx(styles.idea, theme === "light" && styles.ideaLight)}>
            <div className={styles.header}>
                <img src={avatarGen(idea.Author.username)} alt={idea.Author.username} className={styles.avatar_author} />
                <div className={styles.name}>{getFullName(idea.Author.profile.firstname, idea.Author.profile.lastname)}</div>
                <Link to={`/viewuser/${idea.Author.username}`} className={styles.username}>@{idea.Author.username}</Link>
                <time dateTime={idea.createdAt} className={styles.date}>
                    <FaPlus />
                    {readableDate(idea.createdAt)}
                </time>
                <time className={styles.date}>
                    <FaPen />
                    {readableDate(idea.updatedAt)}
                </time>
                {
                    authState.status === "auth" && authState.userInfo.username === idea.Author.username ? (
                        <div className={styles.author_btns}>
                            <Link to={url.updateIdea.value} state={{ id: idea.id, content: idea.content }}><AiFillEdit /></Link>
                            <AiFillDelete />
                        </div>
                    ) : ""
                }
            </div>
            <div className={styles.content}>
                {idea.content}
            </div>
            <div className={styles.footer}>
                <div className={clsx(styles.icon_secs)}>{nlikes} <FaThumbsUp /></div>
                <div className={clsx(styles.icon_secs)}>{ndislikes} <FaThumbsDown /></div>
                <div className={styles.icon_secs}>{idea._count.comments} <FaComments /></div>
                <FaShare className={styles.icon_btn} />
            </div>
        </div>
    )
}
import { avatarGen, getFullName, readableDate } from "../helpers";
import { FaPlus, FaPen, FaComments, FaThumbsUp, FaThumbsDown, FaShare } from 'react-icons/fa';
import styles from '../styles/components/idea-card.module.scss';
import { Link } from "react-router-dom";
import clsx from "clsx";
import useDarkLightTheme from "../context/DarkLightContext";
import url from "../helpers/urldata";
import React from 'react';
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


type props = {
    idea: Idea1,
    viewPage?: undefined,
    likeFunc?: undefined,
    isLiking?: undefined,
    authBTNS?: undefined
} | {
    idea: Idea1,
    viewPage: true,
    likeFunc: UseMutateFunction<AxiosResponse, unknown, {
        value: likeVal;
        idea_id: number;
    }>,
    isLiking: boolean,
    authBTNS: (className: string) => React.ReactNode
}

export default function IdeaCard({ idea, viewPage, authBTNS, likeFunc, isLiking }: props) {

    const { theme } = useDarkLightTheme();

    const nlikes: number = idea.likes.filter(like => like.value === "Like").length;
    const ndislikes: number = idea.likes.filter(like => like.value === "Dislike").length;

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
                    viewPage ? authBTNS(styles.author_btns) : ""
                }
            </div>
            <div className={styles.content}>
                {idea.content}
            </div>
            {
                !viewPage ?
                    <Link to={url.viewIdea.urlFN(idea.id)} className={styles.viewBTN}>View {">"}</Link> : ""
            }
            <div className={styles.footer}>
                <div
                    className={clsx(styles.icon_secs, viewPage && styles.btn)}
                    onClick={() => (viewPage && !isLiking) && likeFunc({ value: "Like", idea_id: idea.id })}
                >
                    {nlikes} <FaThumbsUp />
                </div>
                <div
                    className={clsx(styles.icon_secs, viewPage && styles.btn)}
                    onClick={() => (viewPage && !isLiking) && likeFunc({ value: "Dislike", idea_id: idea.id })}
                >
                    {ndislikes} <FaThumbsDown />
                </div>
                <div className={styles.icon_secs}>{idea._count.comments} <FaComments /></div>
                <FaShare className={styles.icon_btn} />
            </div>
        </div>
    )
}
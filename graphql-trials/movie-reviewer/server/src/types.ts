import { Schema } from "mongoose";

export const celebTitles = ["ACTOR", "DIRECTOR"] as const;
export const userRoles = ["ADMIN", "USER"] as const;

export type celebTitleEnum = typeof celebTitles[number];
export type userRoleEnum = typeof userRoles[number];

export type objectIdType = typeof Schema.Types.ObjectId;

export interface ICelebrity {
    _id?: objectIdType,
    name: string,
    bio: string,
    titles: Array<celebTitleEnum>
}

export interface IMovie {
    _id?: objectIdType,
    name: string,
    year: number,
    plot: string,
    director: objectIdType,
    genre: string[],
    actors: Array<objectIdType>
}

export interface IReview {
    _id?: objectIdType,
    content: string,
    starRating: Number,
    movie: objectIdType,
    user: objectIdType
}

export interface IUser {
    _id?: objectIdType,
    username: string,
    email: string,
    name: string,
    role: userRoleEnum,
    password: string,
    refresh: string
}
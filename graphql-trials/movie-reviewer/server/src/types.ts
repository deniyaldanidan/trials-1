import { BaseContext } from "@apollo/server";
import { Schema, Types } from "mongoose";

export const celebTitles = ["ACTOR", "DIRECTOR"] as const;
export const userRoles = ["ADMIN", "USER"] as const;

export type celebTitleEnum = typeof celebTitles[number];
export type userRoleEnum = typeof userRoles[number];

// export type objectIdType = typeof Schema.Types.ObjectId;

export type objectIdType = Types.ObjectId

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

export interface AccessPayload {
    _id: objectIdType,
    username: string,
    name: string,
    role: userRoleEnum
}

export interface RefreshPayload {
    username: string
}


type AuthedContext = {
    authed: true,
    _id: string,
    username: string,
    role: userRoleEnum
}

type UnAuthedContext = {
    authed: false
    _id?: undefined
    username?: undefined
    role?: undefined
}

export type MyContext = (AuthedContext | UnAuthedContext) & BaseContext;

import { ZodError } from "zod";
import jwt from 'jsonwebtoken';

export function zodErrFormat(error: ZodError) {
    return error.issues.map(({ path, message }) => ({
        field: path[0],
        message
    }))
}

export class CUSTHTTPERROR extends Error {
    public statuscode: number;

    constructor(message: string, statuscode: number) {
        super(message);
        this.name = "InvalidInputError";
        this.statuscode = statuscode;
    }
}

export function signACCESS(payload: { username: string, name: string, userId: string }) {
    const ACCESS_SECRET = process.env.ACCESS_SECRET;
    if (!ACCESS_SECRET) {
        throw new Error("Provide Access Secret");
    }
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "4h" })
}

export function signRefresh(payload: { username: string }) {
    const REFRESH_SECRET = process.env.REFRESH_SECRET;
    if (!REFRESH_SECRET) {
        throw new Error("Provide Refresh Secret");
    }
    return {
        token: jwt.sign(payload, REFRESH_SECRET, { expiresIn: "8h" }),
        maxAge: 8 * 60 * 60 * 1000
    }
}

export function capitalize(str: string) {
    if (str.length) {
        return str[0].toUpperCase() + str.substring(1);
    }
    return str;
}

export function fullname(firstname: string, lastname: string) {
    const myFirst = capitalize(firstname);
    const myLast = capitalize(lastname);
    return `${myFirst} ${myLast}`;
}
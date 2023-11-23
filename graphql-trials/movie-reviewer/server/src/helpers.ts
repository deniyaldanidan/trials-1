import jwt from "jsonwebtoken";
import { AccessPayload, RefreshPayload } from "./types";

export function capitalizer(str: string): string {
    if (!str) {
        return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const accessMaxAge = 60 * 60 * 6;
export const refreshMaxAge = 60 * 60 * 12;
export const refreshMaxAgeMilli = refreshMaxAge * 1000;

export function signACCESS(payload: AccessPayload) {
    if (typeof process.env.ACCESS_TOKEN === "undefined") {
        throw new Error("ACCESS SECRET IS NOT GIVEN");
    }

    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: accessMaxAge });
}

export function signREFRESH(payload: RefreshPayload) {
    if (typeof process.env.REFRESH_TOKEN === "undefined") {
        throw new Error("REFRESH SECRET IS NOT GIVEN");
    }

    return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: refreshMaxAge });
}
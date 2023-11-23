import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import z from 'zod';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { MyContext, userRoles } from "../types.js";
import { isObjectIdOrHexString } from "mongoose";

const bearerParser = z.string().trim().startsWith("Bearer ").transform(val => val.split(" ")[1]).refine(val => validator.isJWT(val));

const graphqlContext: ContextFunction<[ExpressContextFunctionArgument], MyContext> = async ({ req }) => {
    try {
        const bearerParsed = bearerParser.safeParse(req.headers?.authorization || req.headers?.Authorization);

        if (!bearerParsed.success) return { authed: false };

        const accessToken = bearerParsed.data;
        const accessSecret = process.env.ACCESS_TOKEN;

        if (typeof accessSecret === "undefined") {
            throw new Error("ACCESS_TOKEN IS NOT AVAILABLE");
        }

        const decoded: any = jwt.verify(accessToken, accessSecret);

        if (typeof decoded?.username !== "string" || typeof decoded?._id !== "string" || !isObjectIdOrHexString(decoded._id) || typeof decoded?.role !== "string" || !userRoles.includes(decoded.role)) {
            return { authed: false }
        }

        return { authed: true, username: decoded.username, _id: decoded._id, role: decoded.role };
    } catch (error) {
        return { authed: false }
    }
}

export default graphqlContext;
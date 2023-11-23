import { Request, Response } from 'express';
import { z } from 'zod';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { signACCESS } from '../helpers.js';

export default async function refreshHandler(req: Request, res: Response) {
    try {
        const refresh = z.string().trim().refine(val => validator.isJWT(val)).parse((req.cookies?.refresh));

        const refSecret = process.env?.REFRESH_TOKEN;

        if (typeof refSecret === "undefined") {
            throw new Error("REFRESH SECRET IS NOT AVAIL")
        }

        const decoded: any = jwt.verify(refresh, refSecret);

        if (typeof decoded?.username !== "string") {
            throw new Error("invalid token");
        }

        const existingUser = await User.findOne({ $and: [{ username: decoded.username }, { refresh }] }).exec();

        if (!existingUser) {
            throw new Error("token expired");
        }

        const newAccessToken = signACCESS({ _id: existingUser._id, username: existingUser.username, name: existingUser.name, role: existingUser.role });

        return res.json({ success: true, accessToken: newAccessToken });
    } catch (error) {
        return res.sendStatus(401);
    }
}
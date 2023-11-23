import { Request, Response } from 'express';
import { z } from 'zod';
import validator from 'validator';
import User from '../models/user.js';

export default async function logoutHandler(req: Request, res: Response) {
    try {
        const refreshParsed = z.string().trim().refine(val => validator.isJWT(val)).safeParse((req.cookies?.refresh));

        if (refreshParsed.success) await User.findOneAndUpdate({ refresh: refreshParsed.data }, { $unset: { refresh: "" } }).exec();

        res.cookie("refresh", "", { maxAge: 0, httpOnly: true, /*secure: true, sameSite: "none"*/ })
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
}
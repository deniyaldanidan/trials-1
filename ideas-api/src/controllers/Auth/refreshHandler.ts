import { NextFunction, Request, Response } from "express";
import myValidators from "../../lib/myValidators";
import db from "../../lib/db";
import jwt from 'jsonwebtoken';
import { CUSTHTTPERROR, fullname, signACCESS } from "../../lib/helpers";


export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const tokenInp = myValidators.isValidJWT.safeParse(req.cookies?.refresh);

        if (!tokenInp.success) {
            return res.sendStatus(401);
        }

        const refToken = tokenInp.data;
        const refSecret = process.env.REFRESH_SECRET;
        if (!refSecret) {
            throw new CUSTHTTPERROR("Internal Error Happened", 500);
        }

        jwt.verify(refToken, refSecret, async (err, decoded: any) => {
            if (err || !myValidators.username.safeParse(decoded?.username).success) {
                return res.sendStatus(401);
            }
            const existingUser = await db.user.findUnique({ where: { username: decoded.username, refresh: refToken }, include: { profile: { select: { firstname: true, lastname: true } } } });
            if (!existingUser) {
                return res.sendStatus(401);
            }
            const accToken = signACCESS({ username: existingUser.username, name: fullname(existingUser.profile?.firstname as string, existingUser.profile?.lastname as string), userId: existingUser.id });
            return res.status(200).json({ accToken });
        })
    } catch (error) {
        next(error)
    }
}
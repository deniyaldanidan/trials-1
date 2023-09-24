import { NextFunction, Request, Response } from "express";
import myValidators from "../../lib/myValidators";
import db from "../../lib/db";


export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const tokenInp = myValidators.isValidJWT.safeParse(req.cookies?.refresh);
        if (tokenInp.success) {
            const refToken = tokenInp.data;
            const existingUser = await db.user.findUnique({ where: { refresh: refToken } });
            if (existingUser) {
                await db.user.update({ where: { username: existingUser.username }, data: { refresh: "" } });
            }
        }
        res.clearCookie("refresh", { maxAge: 0, httpOnly: true, /*secure: true, sameSite: "none" */ });
        return res.json({ success: true });
    } catch (error) {
        next(error);
    }
}
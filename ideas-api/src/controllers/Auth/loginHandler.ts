import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import bcrypt from 'bcrypt';
import myValidators from "../../lib/myValidators";
import db from "../../lib/db";
import { fullname, signACCESS, signRefresh } from "../../lib/helpers";

const myInputs = z.object({
    unameOrEmail: myValidators.username.or(myValidators.email),
    password: myValidators.unrestrictedPWD
})

export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const reqInputs = myInputs.safeParse(req.body);

        if (reqInputs.success) {
            const { unameOrEmail, password } = reqInputs.data;

            const curr_user = await db.user.findFirst({
                where: { OR: [{ email: unameOrEmail }, { username: unameOrEmail }] },
                include: { profile: { select: { firstname: true, lastname: true } } }
            });

            if (curr_user) {
                const match = await bcrypt.compare(password, curr_user.password);

                if (match) {
                    const myfullname = fullname(curr_user.profile?.firstname ?? "", curr_user.profile?.lastname ?? "");
                    const accessToken = signACCESS({ username: curr_user.username, name: myfullname, userId: curr_user.id });
                    const { token: refreshToken, maxAge: refreshMaxage } = signRefresh({ username: curr_user.username });

                    const updatedUser = await db.user.update({ where: { id: curr_user.id }, data: { refresh: refreshToken } });

                    res.cookie("refresh", updatedUser.refresh, { httpOnly: true, /*sameSite: "none", secure: true,*/ maxAge: refreshMaxage }); //* Uncomment in production

                    return res.json({ success: `${myfullname} is loggedIn`, token: accessToken });
                }
            }
        }
        //! If nothing checked in send a conflict
        return res.status(409).json({ error: "Login Failed" });
    } catch (error) {
        next(error)
    }
}
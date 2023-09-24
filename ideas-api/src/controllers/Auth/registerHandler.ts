import { NextFunction, Request, Response } from "express";
import { z } from 'zod';
import myValidators from "../../lib/myValidators";
import db from "../../lib/db";
import { CUSTHTTPERROR, fullname, signACCESS, signRefresh } from "../../lib/helpers";
import bcrypt from 'bcrypt';

const userInput = z.object({
    username: myValidators.username,
    email: myValidators.email,
    password: myValidators.password,
    firstname: myValidators.nameInp,
    lastname: myValidators.nameInp
})

export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        //! parsing and validating user-input
        const { username, email, password, firstname, lastname } = userInput.parse(req.body);

        //! Checking for existing user
        const existingUser = await db.user.findFirst({ where: { OR: [{ email }, { username }] } })
        if (existingUser) {
            throw new CUSTHTTPERROR("User Already Exist", 409);
        }

        //! Creating access & refresh tokens
        const { token: refresh, maxAge: refreshMaxAge } = signRefresh({ username });

        //! Hashing provided password
        const hashedPWD = await bcrypt.hash(password, 10);

        //! Creating new user
        const newUser = await db.user.create({
            data: { username, email, password: hashedPWD, refresh, profile: { create: { firstname, lastname } } }
        });

        const accessToken = signACCESS({ username, name: fullname(firstname, lastname), userId: newUser.id });
        res.cookie("refresh", refresh, { httpOnly: true, /*sameSite: "none", secure: true,*/ maxAge: refreshMaxAge }); //* In production turn on the commented code.
        return res.json({ success: `NewUser ${newUser.username} is successfully created`, token: accessToken });
    } catch (error) {
        next(error);
    }
}
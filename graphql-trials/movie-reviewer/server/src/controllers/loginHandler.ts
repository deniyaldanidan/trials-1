import { Request, Response } from 'express';
import { z } from 'zod';
import validator from 'validator';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { refreshMaxAgeMilli, signACCESS, signREFRESH } from '../helpers.js';

const reqParser = z.object({
    unameOrEmail: z.string().trim().min(3).max(15).refine(val => validator.isAlphanumeric(val, "en-US", { ignore: "-_" })).or(z.string().trim().email()),
    password: z.string().trim().min(6).max(24)
})

export default async function loginHandler(req: Request, res: Response) {
    try {
        const { unameOrEmail, password } = reqParser.parse(req.body);

        const existingUser = await User.findOne({ $or: [{ username: unameOrEmail }, { email: unameOrEmail }] });

        if (!existingUser) throw new Error("User does not exist");

        const match = await bcrypt.compare(password, existingUser.password);

        if (!match) throw new Error("Password doesn't match");

        const refresh = signREFRESH({ username: existingUser.username });
        const accessToken = signACCESS({ username: existingUser.username, _id: existingUser._id, name: existingUser.name, role: existingUser.role });

        existingUser.refresh = refresh;
        await existingUser.save();

        res.cookie("refresh", refresh, { maxAge: refreshMaxAgeMilli, httpOnly: true, /* sameSite: "none", secure: true */ });
        return res.json({ success: true, accessToken });
    } catch (error) {
        return res.status(409).json({ error: "Login Failed." })
    }
}
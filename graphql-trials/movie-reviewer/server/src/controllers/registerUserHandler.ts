import { Request, Response } from "express";
import z from 'zod';
import validator from "validator";
import bcrypt from 'bcrypt';
import User from "../models/user.js";
import { capitalizer, refreshMaxAgeMilli, signACCESS, signREFRESH } from "../helpers.js";


const reqParser = z.object({
    username: z.string().trim().min(3).max(15).refine(val => validator.isAlphanumeric(val, "en-US", { ignore: "-_" })),
    email: z.string().trim().email(),
    firstname: z.string().trim().min(1).max(24).refine(val => validator.isAlpha(val)).transform(val => capitalizer(val)),
    lastname: z.string().trim().min(1).max(24).refine(val => validator.isAlpha(val)).transform(val => capitalizer(val)),
    pwd: z.string().trim().min(6).max(24)
});

export default async function registerUserHandler(req: Request, res: Response) {
    try {
        const { username, email, firstname, lastname, pwd } = reqParser.parse(req.body);

        const existingUser = await User.findOne({ username }).exec();
        if (existingUser) throw new Error("User already exist");

        const name = firstname + " " + lastname;
        const password = await bcrypt.hash(pwd, 10);
        const refreshToken = signREFRESH({ username });

        const newUser = await User.create({
            username,
            email,
            name,
            password,
            refresh: refreshToken
        });

        const accessToken = signACCESS({ username, name, _id: newUser._id, role: newUser.role });

        res.cookie("refresh", refreshToken, { maxAge: refreshMaxAgeMilli, httpOnly: true, /*sameSite: "none", secure: true*/ });
        return res.json({ success: true, accessToken });
    } catch (error) {
        return res.status(409).json({ error: "Registration Failed" });
    }
}
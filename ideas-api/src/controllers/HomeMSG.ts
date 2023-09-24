import { Request, Response } from "express";


export default function HOMEMSG(req: Request, res: Response) {
    return res.json({ msg: "Welcome to Ideas APP" });
}
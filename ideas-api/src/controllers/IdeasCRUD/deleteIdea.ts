import { NextFunction, Request, Response } from "express";
import myValidators from "../../lib/myValidators";
import db from "../../lib/db";

export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const id = myValidators.convertableValidIntId.safeParse(req.params.id);
        const username = myValidators.username.safeParse(res.locals.username);
        if (!username.success || !id.success) {
            return res.status(409).json({ error: "operation failed" });
        }

        await db.idea.delete({ where: { id: id.data, Author: { username: username.data } } });

        return res.json({ success: true });
    } catch (error) {
        next(error);
    }
}
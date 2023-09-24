import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import myValidators from "../../lib/myValidators";
import db from "../../lib/db";

const inpValidation = z.object({
    id: myValidators.validIntId,
    content: myValidators.spaceFilteredString
})

export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const { id, content } = inpValidation.parse(req.body);
        const username = myValidators.username.safeParse(res.locals.username);
        if (!username.success) {
            return res.status(409).json({ error: "operation failed" });
        }

        const updatedPost = await db.idea.update({ where: { id, Author: { username: username.data } }, data: { content } });

        return res.json(updatedPost);
    } catch (error) {
        next(error);
    }
}
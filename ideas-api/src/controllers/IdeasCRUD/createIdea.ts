import { NextFunction, Request, Response } from "express";
import myValidators from "../../lib/myValidators";
import { z } from "zod";
import db from "../../lib/db";

const reqInput = z.object({
    content: myValidators.spaceFilteredString
});

export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const { content } = reqInput.parse(req.body);
        const username = myValidators.username.safeParse(res.locals.username);
        if (!username.success) {
            return res.status(409).json({ error: "operation failed" });
        }

        const newIdea = await db.idea.create({
            data: {
                content,
                Author: {
                    connect: {
                        username: username.data
                    }
                }
            }
        })

        return res.json(newIdea)
    } catch (error) {
        next(error);
    }
}
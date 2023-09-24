import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import myValidators from "../../lib/myValidators";
import db from "../../lib/db";

const inpValidator = z.object({
    value: myValidators.validComment,
    ideaId: myValidators.validIntId
})

export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const { value, ideaId } = inpValidator.parse(req.body);
        const username = myValidators.username.safeParse(res.locals.username);
        if (!username.success) {
            return res.sendStatus(409);
        }

        const newComment = await db.comment.create({
            data: {
                value,
                commentby: {
                    connect: {
                        username: username.data
                    }
                },
                commentedIdea: {
                    connect: {
                        id: ideaId
                    }
                }
            }
        })

        return res.json(newComment);
    } catch (error) {
        next(error)
    }
}
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import myValidators from "../../lib/myValidators";
import db from "../../lib/db";

const inpValidator = z.object({
    comment_id: myValidators.validIntId,
    value: myValidators.validComment
});


export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const { value, comment_id } = inpValidator.parse(req.body);
        const username = myValidators.username.safeParse(res.locals.username);
        if (!username.success) {
            return res.sendStatus(409);
        }

        const updatedComment = await db.comment.update({
            where: {
                id: comment_id,
                commentby: {
                    username: username.data
                }
            },
            data: {
                value
            }
        })

        return res.json(updatedComment);
    } catch (error) {
        next(error)
    }
}
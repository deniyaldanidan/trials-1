import { NextFunction, Request, Response } from "express";
import myValidators from "../../lib/myValidators";
import db from "../../lib/db";


export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const commentId = myValidators.convertableValidIntId.safeParse(req.params.id);
        const username = myValidators.username.safeParse(res.locals.username);

        if (!commentId.success || !username.success) {
            return res.sendStatus(409);
        }

        await db.comment.delete({
            where: {
                commentby: {
                    username: username.data
                },
                id: commentId.data
            }
        })

        return res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}
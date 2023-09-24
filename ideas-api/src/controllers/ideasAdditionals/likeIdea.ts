import { NextFunction, Request, Response } from "express"
import myValidators from "../../lib/myValidators";
import { z } from "zod";
import db from "../../lib/db";

const inputValidator = z.object({
    idea_id: myValidators.validIntId,
    value: z.enum(["Like", "Dislike"])
})

export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const req_body = inputValidator.safeParse(req.body);
        const username = myValidators.username.safeParse(res.locals.username);
        const userId = myValidators.validUUID.safeParse(res.locals.userId);
        if (!username.success || !req_body.success || !userId.success) {
            return res.status(409).json({ error: "operation failed" });
        }

        const { idea_id, value } = req_body.data;

        await db.idea.update({
            where: { id: idea_id }, data: {
                likes: {
                    upsert: {
                        where: {
                            userId_ideaId: {
                                ideaId: idea_id,
                                userId: userId.data
                            }
                        },
                        create: {
                            value,
                            likedby: {
                                connect: {
                                    username: username.data
                                }
                            }
                        },
                        update: {
                            value
                        }
                    }
                }
            }
        });

        return res.json({ success: true })
    } catch (error) {
        next(error)
    }
}
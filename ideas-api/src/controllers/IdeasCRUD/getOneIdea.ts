import { Request, Response, NextFunction } from 'express';
import myValidators from '../../lib/myValidators';
import { CUSTHTTPERROR } from '../../lib/helpers';
import db from '../../lib/db';


export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const id = myValidators.convertableValidIntId.safeParse(req.params.id);
        if (!id.success) {
            throw new CUSTHTTPERROR("Requested Route not found", 404);
        }

        const idea = await db.idea.findUnique({
            where: {
                id: id.data
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                Author: {
                    select: {
                        username: true,
                        profile: {
                            select: {
                                firstname: true,
                                lastname: true
                            }
                        }
                    }
                },
                likes: {
                    select: {
                        value: true,
                        likedby: {
                            select: {
                                username: true
                            }
                        }
                    }
                },
                comments: {
                    select: {
                        id: true,
                        value: true,
                        commentby: {
                            select: {
                                username: true,
                                profile: {
                                    select: {
                                        firstname: true,
                                        lastname: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        if (idea) {
            return res.json(idea);
        };

        return res.status(404).json({ err: "Requested resource not found" });

    } catch (error) {
        next(error)
    }
}
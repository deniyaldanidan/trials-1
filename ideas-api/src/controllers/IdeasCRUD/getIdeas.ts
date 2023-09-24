import { NextFunction, Request, Response } from "express";
import db from "../../lib/db";


export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const ideas = await db.idea.findMany({
            include: {
                Author: { select: { username: true, profile: { select: { firstname: true, lastname: true } } } },
                _count: {
                    select: {
                        comments: true
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
                }
            }
        });
        return res.json(ideas);
    } catch (error) {
        next(error);
    }
}
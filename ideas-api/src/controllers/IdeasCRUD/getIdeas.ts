import { NextFunction, Request, Response } from "express";
import db from "../../lib/db";
import { z } from "zod";
import myValidators from "../../lib/myValidators";

const validQuery = z.object({
    page: myValidators.convertableValidIntId.or(z.undefined())
})

export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        var pageNo: number;
        const parsedQuery = validQuery.safeParse(req.query);
        if (!parsedQuery.success || parsedQuery.data.page === undefined) {
            pageNo = 1
        } else {
            pageNo = parsedQuery.data.page
        }

        const contentPerPage = 5;

        const ideas = await db.idea.findMany({
            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
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
            },
            orderBy: {
                updatedAt: "desc"
            },
            skip: (pageNo - 1) * contentPerPage,
            take: contentPerPage
        });

        return res.json(ideas);
    } catch (error) {
        next(error);
    }
}
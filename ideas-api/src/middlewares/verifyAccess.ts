import { NextFunction, Request, Response } from "express";
import myValidators from "../lib/myValidators";
import jwt from 'jsonwebtoken';
import { CUSTHTTPERROR } from "../lib/helpers";


export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const bearer = myValidators.isValidBearer.safeParse(req.headers?.authorization || req.headers?.Authorization);

        if (!bearer.success) return res.sendStatus(401);

        const accToken = myValidators.isValidJWT.safeParse(bearer.data.split(" ")[1]);
        if (!accToken.success) return res.sendStatus(401);

        const accSecret = process.env.ACCESS_SECRET;

        if (!accSecret) {
            throw new CUSTHTTPERROR("Internal Error Happened", 500);
        }

        jwt.verify(accToken.data, accSecret, (err, decoded: any) => {
            if (err || !decoded?.username || !decoded?.userId) {
                return res.sendStatus(401);
            }
            res.locals.username = decoded.username;
            res.locals.userId = decoded.userId;
            next();
        })
    } catch (error) {
        next(error)
    }
}
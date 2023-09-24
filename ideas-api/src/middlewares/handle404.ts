import { Request, Response } from "express";


export default function handle404(req: Request, res: Response) {
    res.status(404);
    const info404 = "404 REQUESTED RESOURCE NOT FOUND";

    if (req.accepts('json')) {
        return res.json({ error: info404 });
    }
    return res.type("text").send(info404);
}
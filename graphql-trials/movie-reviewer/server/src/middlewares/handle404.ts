import { Response, Request } from "express";

const handle404 = (_: Request, res: Response) => res.sendStatus(404);

export default handle404;
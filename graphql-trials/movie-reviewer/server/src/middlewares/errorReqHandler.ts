import { ErrorRequestHandler } from "express";


const errorReqHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    return res.status(500).json({ err: "Internal Error Happened" });
}

export default errorReqHandler;
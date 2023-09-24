import { ErrorRequestHandler } from "express";
import { CorsErrMsg } from "../config";
import { ZodError } from "zod";
import { CUSTHTTPERROR, zodErrFormat } from "../lib/helpers";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    if (err.message === CorsErrMsg) {
        if (req.accepts("json")) {
            return res.status(400).json({ error: "CORS ERROR" });
        }
        return res.status(400).type("text").send("CORS ERROR");
    }

    if (err?.type === "entity.parse.failed" || err?.status === 400) {
        return res.status(400).json({ error: "Invalid Input" });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({ errors: zodErrFormat(err) })
    }

    if (err instanceof PrismaClientKnownRequestError && err.code.toLowerCase() === "p2025") {
        return res.status(404).json({ error: "Requested resource not found" });
    }

    if (err instanceof CUSTHTTPERROR) {
        return res.status(err.statuscode).json({ error: err.message })
    }

    console.log(err)
    res.status(500);
    res.json({ err: "Some Internal Error Happened" });
}

export default errorHandler;
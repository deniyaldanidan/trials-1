import { Router } from "express";
import registerHandler from "../controllers/Auth/registerHandler";
import loginHandler from "../controllers/Auth/loginHandler";
import refreshHandler from "../controllers/Auth/refreshHandler";
import logoutHandler from "../controllers/Auth/logoutHandler";

const authRouter = Router();

authRouter
    .post("/register", registerHandler)
    .post("/login", loginHandler)
    .post("/logout", logoutHandler)
    .get("/refresh", refreshHandler);

export default authRouter;
import { Router } from "express";
import createComment from "../controllers/ideasAdditionals/createComment";
import updateComment from "../controllers/ideasAdditionals/updateComment";
import deleteComment from "../controllers/ideasAdditionals/deleteComment";
import verifyAccess from "../middlewares/verifyAccess";


const commentRouter = Router();

commentRouter.use(verifyAccess);

commentRouter.route("/")
    .post(createComment)
    .put(updateComment);

commentRouter.route("/:id")
    .delete(deleteComment);


export default commentRouter;
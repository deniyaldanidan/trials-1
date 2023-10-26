import { Router } from 'express';
import getIdeas from '../controllers/IdeasCRUD/getIdeas';
import createIdea from '../controllers/IdeasCRUD/createIdea';
import verifyAccess from '../middlewares/verifyAccess';
import updateIdea from '../controllers/IdeasCRUD/updateIdea';
import deleteIdea from '../controllers/IdeasCRUD/deleteIdea';
import likeIdea from '../controllers/ideasAdditionals/likeIdea';
import getOneIdea from '../controllers/IdeasCRUD/getOneIdea';

const ideasRouter = Router();

ideasRouter.route("/")
    .get(getIdeas)
    .post(verifyAccess, createIdea)
    .put(verifyAccess, updateIdea);


ideasRouter.post("/like", verifyAccess, likeIdea);

ideasRouter.route("/:id")
    .get(getOneIdea)
    .delete(verifyAccess, deleteIdea);


export default ideasRouter;
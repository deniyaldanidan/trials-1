import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Express, json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import corsOptions from './lib/corsOptions';
import handle404 from './middlewares/handle404';
import errorHandler from './middlewares/errorHandler';
import HOMEMSG from './controllers/HomeMSG';
import db from './lib/db';
import authRouter from './routers/authRouter';
import ideasRouter from './routers/ideasRouter';
import commentRouter from './routers/commentsRouter';

// ! Init.. APP
dotenv.config();
const app: Express = express();
const PORT: string = process.env.PORT || "8123"

// !Adding Middlewares
morgan.token("uOrigin", (req) => req.headers.origin)
morgan.token('myDate', () => new Date().toLocaleString('en-GB', { timeZone: "IST" }))
app.use(morgan(":myDate :url :method :remote-addr :status :uOrigin"));
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(urlencoded({ extended: true }))
app.use(json())

// !Routers
app.get("/", HOMEMSG);
app.use("/auth", authRouter);
app.use("/ideas", ideasRouter);
app.use("/comment", commentRouter);

// ! 404 Handler & Global Error Handler
app.use("*", handle404);
app.use(errorHandler);

// ! App Listener
app.listen(PORT, () => {
    console.log("App is listening on Port: ", PORT)
})

process.on("beforeExit", async () => {
    await db.$disconnect();
    console.log("Closing the App..")
})
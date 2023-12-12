import dotenv from 'dotenv';
import http from 'http';
import { connect, set as mongooseSet } from 'mongoose';
import { ApolloServer, } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express, { urlencoded, json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import gqlSchema from './schema.js';
import resolvers from './resolvers/resolvers.js';
import { MyContext } from './types.js';
import loginHandler from './controllers/loginHandler.js';
import registerUserHandler from './controllers/registerUserHandler.js';
import logoutHandler from './controllers/logoutHandler.js';
import refreshHandler from './controllers/refreshHandler.js';
import errorReqHandler from './middlewares/errorReqHandler.js';
import handle404 from './middlewares/handle404.js';
import graphqlContext from './middlewares/graphqlContext.js';


dotenv.config();
// mongooseSet("debug", true);
mongooseSet("autoIndex", false);


const DB_CONN_STRING = process.env.DB_CONN;
if (DB_CONN_STRING === undefined) {
    throw new Error("Include DB connection string in .env file.")
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
    typeDefs: gqlSchema,
    resolvers: resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    includeStacktraceInErrorResponses: false,
    formatError: (formattedError, error) => ({ ...formattedError, locations: undefined }),
});

await connect(DB_CONN_STRING)
await server.start();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => res.json({ msg: "Hello World" }));
app.post("/register", registerUserHandler);
app.post("/login", loginHandler);
app.get("/refresh", refreshHandler);
app.post("/logout", logoutHandler);

app.use("/graphql", expressMiddleware<MyContext>(server, {
    context: graphqlContext
}));

app.use("*", handle404);
app.use(errorReqHandler);

await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
console.log("Server ready at Port http://localhost:4000");
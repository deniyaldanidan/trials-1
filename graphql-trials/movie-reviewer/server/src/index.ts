import dotenv from 'dotenv';
import http from 'http';
import { connect } from 'mongoose';
import { ApolloServer, } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express, { urlencoded, json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import gqlSchema from './schema.js';
import resolvers from './resolver.js';

dotenv.config();

const DB_CONN_STRING = process.env.DB_CONN;

if (DB_CONN_STRING === undefined) {
    throw new Error("Include DB connection string in .env file.")
}

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: gqlSchema, resolvers, plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await connect(DB_CONN_STRING)
await server.start();

app.use(cors());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => res.json({ msg: "Hello World" }));

app.use("/graphql", expressMiddleware(server, {
    // context: 
}));

await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
console.log("Server ready at Port http://localhost:4000");
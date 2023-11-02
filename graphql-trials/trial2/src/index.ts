import dotenv from 'dotenv';
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from "mongoose";
import Book from "./models/books.js";

dotenv.config();

const typeDefs = `#graphql
    type Book{
        _id: ID!
        title: String!
        author: String!
        year: Int!
    }

    input BookInput{
        title: String
        author: String
        year: Int
    }

    type Query{
        getBook(ID: ID!): Book
        getBooks: [Book]
    }

    type Mutation{
        createBook(bookInput: BookInput): String!
        updateBook(ID: ID!, bookInput: BookInput): String!
        deleteBook(ID: ID!): String!
    }
`;

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            async getBook(_, { ID }) {
                return await Book.findById(ID).exec();
            },
            async getBooks() {
                return await Book.find();
            }
        },
        Mutation: {
            async createBook(_, { bookInput: { title, author, year } }) {
                const res = await new Book({ title, author, year }).save();
                return res._id;
            },
            async deleteBook(_, { ID }) {
                await Book.findByIdAndDelete(ID);
                return ID;
            },
            async updateBook(_, { ID, bookInput: { title, author, year } }) {
                await Book.findByIdAndUpdate(ID, { title, author, year });
                return ID;
            }
        }
    }
})


connect(process.env.dbstring ?? "", {
    dbName: "BooksTrGraphql1"
}).then(async () => {
    console.log("Connected to Database");
    const { url } = await startStandaloneServer(server, {
        listen: {
            port: 4000
        }
    });

    console.log("server is running on ", url)
}).catch(e => console.log(e));

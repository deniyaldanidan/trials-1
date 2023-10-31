import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./schema.js";
import _db from "./_db.js";


const resolvers = {
    Query: {
        games() {
            return _db.games
        },
        reviews() {
            return _db.reviews
        },
        authors() {
            return _db.authors
        },
        review(_, args) {
            return _db.reviews.find(rev => rev.id === args.id);
        },
        author(_, args) {
            return _db.authors.find(athr => athr.id === args.id);
        },
        game(_, args) {
            return _db.games.find(gm => gm.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return _db.reviews.filter(r => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return _db.reviews.filter(r => r.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return _db.authors.find(athr => athr.id === parent.author_id)
        },
        game(parent) {
            return _db.games.find(gm => gm.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(_, args) {
            _db.games = _db.games.filter(gm => gm.id !== args.id);
            return _db.games;
        },
        addGame(_, args) {
            let newGM = {
                ...args.game,
                id: Math.floor(Math.random() * 10000)
            }
            _db.games.push(newGM);
            return newGM;
        },
        updateGame(_, args) {
            _db.games = _db.games.map(gm => {
                if (gm.id === args.id) {
                    return { ...gm, ...args.editData }
                }
                return gm;
            });

            return _db.games.find(gm => gm.id === args.id);
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log(`Server is running at `, url);
import { ApolloServerOptionsWithTypeDefs } from "@apollo/server";
import { MyContext, celebTitleEnum, ICelebrity } from "../types.js";
import Celebrity from "../models/celebrity.js";
import AuthorizationError from "../errors/AuthorizationError.js";
import BadInputError from "../errors/BadInputError.js";
import Movie from "../models/movie.js";
import { isValidObjectId } from "../myValidator.js";

type createCelebData = {
    name: string,
    bio: string,
    titles: celebTitleEnum[]
};

const celebResolvers: ApolloServerOptionsWithTypeDefs<MyContext>['resolvers'] = {
    Query: {
        async getCelebs() {
            const data = await Celebrity.find().exec();
            return data;
        },

        async getCeleb(_, args: { id: string }) {
            if (!isValidObjectId(args.id)) {
                throw new BadInputError();
            }

            return await Celebrity.findById(args.id).exec();
        }
    },
    Mutation: {
        async addCelebrity(_, args: { data: createCelebData }, ctx) {
            if (!ctx.authed || ctx.role !== "ADMIN") {
                throw new AuthorizationError();
            }
            const newCeleb = new Celebrity(args.data);
            await newCeleb.save();
            return newCeleb;
        },
        async updateCelebrity(_, args: { id: string, data: createCelebData }, ctx) {
            if (!ctx.authed || ctx.role !== "ADMIN") {
                throw new AuthorizationError();
            }

            if (!isValidObjectId(args.id)) {
                throw new BadInputError();
            }

            const updCeleb = await Celebrity.findOneAndUpdate({ _id: args.id }, args.data, { new: true });
            return updCeleb;
        },
        async deleteCelebrity(_, args: { id: string }, ctx) {
            if (!ctx.authed || ctx.role !== "ADMIN") {
                throw new AuthorizationError()
            }

            if (!isValidObjectId(args.id)) {
                throw new BadInputError();
            }
            await Celebrity.deleteOne({ _id: args.id });
            return args.id;
        },
    },
    Celebrity: {
        async movies(parent: ICelebrity) {
            return await Movie.find({ $or: [{ director: parent._id }, { actors: parent._id }] }).exec()
        }
    },
}

export default celebResolvers;
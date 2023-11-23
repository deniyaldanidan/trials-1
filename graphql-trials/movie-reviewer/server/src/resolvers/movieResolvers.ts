import { ApolloServerOptionsWithTypeDefs } from "@apollo/server";
import z from 'zod';
import { MyContext, IMovie } from "../types.js";
import Movie from "../models/movie.js";
import AuthorizationError from "../errors/AuthorizationError.js";
import BadInputError from "../errors/BadInputError.js";
import Celebrity from "../models/celebrity.js";
import Review from "../models/review.js";
import { objectIdParser, createMovieParser, updateMovieParser, isValidObjectId } from "../myValidator.js";


const movieResolvers: ApolloServerOptionsWithTypeDefs<MyContext>['resolvers'] = {
    Query: {
        async getMovies() {
            const data = await Movie.find().populate(["director", "actors"]).exec();
            return data;
        },

        async getMovie(_, args: { id: string }) {
            const parsedId = objectIdParser.safeParse(args.id);

            if (!parsedId.success) throw new BadInputError();

            return await Movie.findById(parsedId.data).populate(["director", "actors"]).exec()
        },
    },
    Mutation: {
        async addMovie(_, args: { data: z.infer<typeof createMovieParser> }, ctx) {
            if (!ctx.authed || ctx.role !== "ADMIN") {
                throw new AuthorizationError();
            }

            const parseResult = createMovieParser.safeParse(args.data);

            if (!parseResult.success) {
                throw new BadInputError();
            }

            const newMovie = new Movie(parseResult.data);
            await newMovie.save();
            return newMovie;
        },
        async updateMovie(_, args: { id: string, data: z.infer<typeof updateMovieParser> }, ctx) {
            if (!ctx.authed || ctx.role !== "ADMIN") {
                throw new AuthorizationError();
            }

            const parseResult = updateMovieParser.safeParse(args.data);
            const parseId = objectIdParser.safeParse(args.id);

            if (!parseResult.success || !parseId.success) {
                throw new BadInputError()
            }

            const updMovie = await Movie.findOneAndUpdate({ _id: parseId.data }, parseResult.data, { new: true });
            return updMovie;
        },
        async deleteMovie(_, args: { id: string }, ctx) {
            if (!ctx.authed || ctx.role !== "ADMIN") {
                throw new AuthorizationError();
            }

            const parseId = objectIdParser.safeParse(args.id);

            if (!parseId.success) throw new BadInputError();

            await Movie.deleteOne({ _id: parseId.data });
            return args.id;
        },
    },

    Movie: {
        async director(parent: IMovie) {
            if (isValidObjectId(parent?.director)) {
                return await Celebrity.findById(parent.director).exec();
            }
            return parent.director;
        },

        async actors(parent: IMovie) {
            if (parent.actors.length && (isValidObjectId(parent.actors[0]))) {
                return await Celebrity.find({ _id: parent.actors }).exec();
            }
            return parent.actors;
        },

        async reviews(parent: IMovie) {
            return await Review.find({ movie: parent._id }).populate({ path: "user", select: ["username", "name"] }).exec();
        }
    },
}

export default movieResolvers;
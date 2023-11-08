import { ApolloServerOptionsWithTypeDefs, BaseContext } from '@apollo/server';
import mongoose from 'mongoose';
import Movie from './models/movie.js';
import Celebrity from './models/celebrity.js';
import { IMovie, ICelebrity, celebTitleEnum, objectIdType } from './types.js';

type createCelebData = {
    name: string,
    bio: string,
    titles: celebTitleEnum[]
};

type createMovieData = {
    name: string,
    year: number,
    director: objectIdType,
    plot: string,
    genre: string[],
    actors: objectIdType[]
}

const resolvers: ApolloServerOptionsWithTypeDefs<BaseContext>['resolvers'] = {
    Query: {
        async getMovies() {
            const data = await Movie.find().populate(["director", "actors"]).exec();
            return data;
        },

        async getMovie(_, args: { id: string }) {
            return await Movie.findById(args.id).populate(["director", "actors"]).exec()
        },

        async getCelebs() {
            const data = await Celebrity.find().exec();
            return data;
        },

        async getCeleb(_, args: { id: string }) {
            return await Celebrity.findById(args.id).exec();
        }
    },

    Mutation: {
        async addCelebrity(_, args: { data: createCelebData }) {
            const newCeleb = new Celebrity(args.data);
            await newCeleb.save();
            return newCeleb;
        },
        async addMovie(_, args: { data: createMovieData }) {
            const newMovie = new Movie(args.data);
            await newMovie.save();
            return newMovie;
        },
        async updateCelebrity(_, args: { id: string, data: createCelebData }) {
            const updCeleb = await Celebrity.findOneAndUpdate({ _id: args.id }, args.data, { new: true });
            return updCeleb;
        },
        async updateMovie(_, args: { id: string, data: createMovieData }) {
            const updMovie = await Movie.findOneAndUpdate({ _id: args.id }, args.data, { new: true });
            return updMovie;
        },
        async deleteCelebrity(_, args: { id: string }) {
            await Celebrity.deleteOne({ _id: args.id });
            return args.id;
        },
        async deleteMovie(_, args: { id: string }) {
            await Movie.deleteOne({ _id: args.id });
            return args.id;
        }
    },

    Movie: {
        async director(parent: IMovie) {
            if (mongoose.isValidObjectId(parent?.director)) {
                return await Celebrity.findById(parent.director).exec();
            }
            return parent.director;
        },

        async actors(parent: IMovie) {
            if (parent.actors.length && (mongoose.isValidObjectId(parent.actors[0]))) {
                return await Celebrity.find({ _id: parent.actors }).exec();
            }
            return parent.actors;
        }
    },

    Celebrity: {
        async movies(parent: ICelebrity) {
            return await Movie.find({ $or: [{ director: parent._id }, { actors: parent._id }] }).exec()
        }
    },

};

export default resolvers;
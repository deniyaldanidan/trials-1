import { ApolloServerOptionsWithTypeDefs } from "@apollo/server";
import { MyContext, objectIdType, IReview } from "../types.js";
import Review from "../models/review.js";
import AuthenticationError from "../errors/AuthenticationError.js";
import { isValidObjectId } from "../myValidator.js";
import BadInputError from "../errors/BadInputError.js";
import User from "../models/user.js";
import Movie from "../models/movie.js";

type createReviewData = {
    content: string,
    starRating: number,
    movie: objectIdType
}

type updateReviewData = {
    content?: string,
    starRating?: number
}

const reviewResolvers: ApolloServerOptionsWithTypeDefs<MyContext>['resolvers'] = {

    Query: {
        async getReviews() {
            const data = await Review.find().populate({ path: "user", select: ["username", "name"] }).populate("movie").exec();
            return data;
        },
        async getReview(_, args: { id: string }) {
            const data = await Review.findById(args.id).populate({ path: "user", select: ["username", "name"] }).populate("movie").exec();
            return data;
        }
    },

    Mutation: {
        async addReview(_, args: { data: createReviewData }, ctx) {
            if (!ctx.authed) {
                throw new AuthenticationError()
            }

            if (!isValidObjectId(args.data.movie)) {
                throw new BadInputError("Movie ID is not valid")
            }
            const newReview = new Review({ ...args.data, user: ctx._id });
            await newReview.save();
            return newReview;
        },
        async updateReview(_, args: { id: string, data: updateReviewData }, ctx) {
            if (!ctx.authed) {
                throw new AuthenticationError()
            }

            if (!isValidObjectId(args.id)) {
                throw new BadInputError("Review Id is not valid")
            }

            const updRev = await Review.findOneAndUpdate({ _id: args.id, user: ctx._id }, args.data, { new: true, runValidators: true });
            return updRev;
        },
        async deleteReview(_, args: { id: string }, ctx) {
            if (!ctx.authed) {
                throw new AuthenticationError()
            }

            if (!isValidObjectId(args.id)) {
                throw new BadInputError("Review Id is not valid")
            }
            await Review.deleteOne({ _id: args.id, user: ctx._id });
            return args.id;
        }
    },

    Review: {
        async user(parent: IReview) {
            if (isValidObjectId(parent?.user)) {
                return await User.findById(parent.user).select(["username", "name"]).exec();
            }
            return parent?.user;
        },
        async movie(parent: IReview) {
            if (isValidObjectId(parent?.movie)) {
                return await Movie.findById(parent.movie).exec();
            }
            return parent?.movie;
        }
    }
}

export default reviewResolvers;
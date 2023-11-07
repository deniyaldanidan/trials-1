import mongoose, { Schema } from "mongoose";
import { IMovie } from "../types.js";

const movieSchema = new Schema<IMovie>({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: "Celebrity",
        required: false
    },
    genre: {
        type: [String],
        required: true
    },
    actors: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Celebrity"
        }]
    }
}, {
    timestamps: false
});

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
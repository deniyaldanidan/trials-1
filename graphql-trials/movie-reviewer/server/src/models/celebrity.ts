import mongoose, { Schema } from "mongoose";
import { ICelebrity, celebTitles } from "../types.js";
import Movie from "./movie.js";

const celebritySchema = new Schema<ICelebrity>({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    titles: {
        type: [{
            type: String,
            enum: celebTitles
        }],
        default: ["ACTOR"]
    }
});
/*
! We can add virtual to improve performance but not gonna do it. Cuzz this is just a sample project and lack of time...
celebritySchema.virtual("directedMovies", {
    ref: "Movie",
    localField: "_id",
    foreignField: ""
})
*/

//* Adding pre for deleteOne to remove celeb id's from Movie collections

celebritySchema.pre("deleteOne", async function (next) {
    const { _id } = this.getFilter()

    await Movie.updateMany({ director: _id }, { $unset: { director: "" } });

    await Movie.updateMany({ actors: _id }, { $pull: { actors: _id } });

    return next();
})


const Celebrity = mongoose.model<ICelebrity>("Celebrity", celebritySchema);

export default Celebrity;
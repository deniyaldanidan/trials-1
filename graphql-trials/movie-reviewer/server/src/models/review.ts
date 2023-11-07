import mongoose, { Schema } from 'mongoose';
import { IReview } from '../types.js';


const reviewSchema = new Schema<IReview>({
    content: {
        type: String,
        required: true
    },
    starRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Review = mongoose.model<IReview>("Review", reviewSchema);
export default Review;
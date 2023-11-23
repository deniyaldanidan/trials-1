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

reviewSchema.index({ movie: 1, user: 1 }, { unique: true });

const Review = mongoose.model<IReview>("Review", reviewSchema);
export default Review;
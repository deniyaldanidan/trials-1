import { Schema, model } from 'mongoose';

interface IBook {
    _id?: String,
    title: String,
    author: String,
    year: Number
}

const BookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

const Book = model<IBook>('books', BookSchema);

export default Book;
import z from 'zod';
import mongoose from 'mongoose';

export const objectIdParser = z.string().trim().refine(val => mongoose.isObjectIdOrHexString(val));

export const createMovieParser = z.object({
    name: z.string().trim(),
    year: z.number(),
    director: objectIdParser.nullable().optional(),
    plot: z.string().trim(),
    genre: z.string().array().nonempty(),
    actors: z.array(objectIdParser)
});

export const updateMovieParser = createMovieParser.partial({
    year: true,
    director: true,
    plot: true,
    genre: true,
    actors: true
});


export function isValidObjectId(id: any) {
    return mongoose.isObjectIdOrHexString(id)
};
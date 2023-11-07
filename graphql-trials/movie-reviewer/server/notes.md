# steps to take

- [x] initiate it GQL + Apollo/server + Express
- [x] install mongoose
- [x] Setup initial mongoose connection
- [x] Write mongoose schema
- [x] write basic CRUD graphql endpoints for `Movie` & `Celebrity`.
- [ ] include an interface for Mutation-Responses


> Need to Rethink (populate() and let mongoose handle nested resolver and redesign mongoose schema no movie_id or director_id)

## Schema:
``` Ts

interface Celebrity {
    _id?: String,
    name: String,
    movies: String[],
    bio: String,
    titles: Array<"ACTOR" | "DIRECTOR">
}

interface Movie {
    _id?: String,
    name: String,
    year: number,
    director: String,
    genre: String[],
    actors: String[]
}

interface User {
    _id?: String,
    username: String,
    email: String,
    name: String,
    role: "admin" | "user",
    password: String,
    refresh: String
}

interface Review {
    _id?: String,
    content: String,
    starRating: Number,
    movieId: String,
    userId: String
}

```
# steps to take

- [x] initiate it GQL + Apollo/server + Express
- [x] install mongoose
- [x] Setup initial mongoose connection
- [x] Write mongoose schema
- [x] write basic CRUD graphql endpoints for `Movie` & `Celebrity`.
- [ ] include an interface for Mutation-Responses

> Will continue on coming Sunday

## Schema:
``` Ts

interface ICelebrity {
    _id?: objectIdType,
    name: string,
    bio: string,
    titles: Array<celebTitleEnum>
}

interface IMovie {
    _id?: objectIdType,
    name: string,
    year: number,
    plot: string,
    director: objectIdType,
    genre: string[],
    actors: Array<objectIdType>
}

interface IReview {
    _id?: objectIdType,
    content: string,
    starRating: Number,
    movie: objectIdType,
    user: objectIdType
}

interface IUser {
    _id?: objectIdType,
    username: string,
    email: string,
    name: string,
    role: userRoleEnum,
    password: string,
    refresh: string
}

```
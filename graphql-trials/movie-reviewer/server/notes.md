# steps to take

- [x] initiate it GQL + Apollo/server + Express
- [x] install mongoose
- [x] Setup initial mongoose connection
- [x] Write mongoose schema
- [x] write basic CRUD graphql endpoints for `Movie` & `Celebrity`.
- [x] Write an endpoint for registering users & `it doesn't need to return anything and it doesn't need to generate jwt's for now.`
- [x] Now add an crud for `Review`.
- [x] Add Reviews to Movie-Schema

- [x] Add Authentication using JWT.
- [x] Work on Context for authentication.

- [x] Authenticate Reviews Mutations (C | U | D).
- [x] throw custom-graphql errors with appropriate http-codes.

- [x] Add user-roles in Access-Token

- [x] Code Splitting on `resolver`.
- [x] Add Authorization & Authentication for resolvers.
- [x] Validation of resolver-args using `zod`
- [x] Fix Error Handlers with Custom Error Class-Objects.
- [x] Add 404 & Master-Error handlers

- [ ] include an interface for Mutation-Responses Escpecially to handle null responses.??


> use `password` for password value.

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

## CODES 
- 200 OK
- 201 Created
- 202 Accepted
- 204 No content
---
- 304 Not Modified
---
- 400 Bad Request
- 401 UnAuthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict
---
- 500 Internal Server Error
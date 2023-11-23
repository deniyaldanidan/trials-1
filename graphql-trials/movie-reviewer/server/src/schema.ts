const gqlSchema = `#graphql

    enum AllowedTitles{
        ACTOR
        DIRECTOR
    }

    type UserLimited{
        username: String!
        name: String!
    }

    type Celebrity{
        _id: ID!
        name: String!
        movies: [Movie!]
        bio: String!
        titles: [AllowedTitles!]!
    }

    type Movie{
        _id: ID!
        name: String!
        year: Int
        plot: String!
        director: Celebrity
        genre: [String!]!
        actors: [Celebrity!]
        reviews: [Review!]
    }

    type Review{
        _id: ID!
        content: String!
        starRating: Float!,
        movie: Movie!,
        user: UserLimited!
    }

    type Query{
        getCelebs: [Celebrity!]
        getMovies: [Movie!]
        getCeleb(id: ID!): Celebrity!
        getMovie(id: ID!): Movie!
        getReviews: [Review!]
        getReview(id: ID!): Review!
    }

    input CelebInput{
        name: String!
        bio: String!
        titles: [AllowedTitles!]!
    }

    input MovieInput{
        name: String!
        year: Int!
        director: ID
        plot: String!
        genre: [String!]!
        actors: [ID!]
    }

    input CelebUpdInp{
        name: String!
        bio: String
        title: [AllowedTitles!]
    }

    input MovieUpdInp{
        name: String!
        year: Int
        director: ID
        plot: String
        genre: [String!]
        actors: [ID!]
    }

    input ReviewInput{
        content: String!
        starRating: Float!
        movie: ID!
    }

    input ReviewUpdate{
        content: String
        starRating: Float
    }

    type Mutation{
        addCelebrity(data: CelebInput!): Celebrity
        updateCelebrity(id: ID!, data: CelebUpdInp!): Celebrity
        deleteCelebrity(id: ID!): String
        
        addMovie(data: MovieInput!): Movie
        updateMovie(id: ID!, data: MovieUpdInp!): Movie
        deleteMovie(id: ID!): String

        addReview(data: ReviewInput!): Review!
        updateReview(id: ID!, data: ReviewUpdate!): Review!
        deleteReview(id: ID!): String!
    }

`

export default gqlSchema;
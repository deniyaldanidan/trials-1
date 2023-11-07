const gqlSchema = `#graphql

    enum AllowedTitles{
        ACTOR
        DIRECTOR
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
    }

    type Query{
        getCelebs: [Celebrity!]
        getMovies: [Movie!]
        getCeleb(id: ID!): Celebrity!
        getMovie(id: ID!): Movie!
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

    type Mutation{
        addCelebrity(data: CelebInput!): Celebrity
        addMovie(data: MovieInput!): Movie
    }

`

export default gqlSchema;
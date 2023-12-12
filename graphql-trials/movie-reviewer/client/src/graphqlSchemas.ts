import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovies {
  getMovies {
    _id
    name
    genre
    year
    reviews {
      starRating
    }
  }
}
`;

export const celebQuery = gql`
    query getAllCelebs{
        getCelebs{
            _id
            name
            bio
            titles
        }
    }
`
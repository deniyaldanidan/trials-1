import { generateFakePosterSRC } from '@/lib/utils';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';

const GET_MOVIE = gql`
  query GetMovies($movieId: ID!) {
  getMovie(id: $movieId) {
    name
    year
    director {
      name
      _id
    }
    genre
    plot
    actors {
      name
      _id
    }
    _id
    reviews {
      starRating
      user {
        name
        username
      }
      content
    }
  }
}  
`;


export default function MovieInfo() {

    const { movieId } = useParams();

    const { data } = useQuery(GET_MOVIE, {
        variables: { movieId }
    });

    useEffect(() => {
        console.log(data)
    }, [data])


    return (
        <div className="max-w-[1150px] block mx-auto">
            {(typeof data !== "undefined" && data?.getMovie) ? (<>
                <img src={generateFakePosterSRC(movieId ?? "seed", 1250, 650)} alt='Movie Poster' className="w-full h-auto min-h-[650px] bg-secForeground rounded-[24px]" />
                <div className="text-4xl font-serif mt-5" >{data.getMovie.name}</div>
                <div className="text-2xl my-4">{data.getMovie.year}</div>
                {data.getMovie.director?.name?.length ? <div>Directed by {data.getMovie.director?.name}</div> : ""}
                <div className='text-xl capitalize my-5' >Genres: {data.getMovie.genre.join(" ")}</div>
                <div className='text-lg mb-7' >{data.getMovie.plot}</div>
            </>) : ""}
        </div>
    )
}
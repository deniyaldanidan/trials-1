import { gql, useMutation, useQuery } from "@apollo/client"
import { MdEdit } from 'react-icons/md';
import MovieForm from "@/components/MovieForm";


const fetchInfosSchema = gql`
    query Query($movieId: ID!) {
  getMovie(id: $movieId) {
    _id
    actors {
      _id
      name
    }
    genre
    director {
      _id
      name
    }
    name
    plot
    year
  }
}
`;

const updateMovieSchema = gql`
  mutation UpdateMovie($updateMovieId: ID!, $data: MovieUpdInp!) {
    updateMovie(id: $updateMovieId, data: $data) {
      _id
      name
      year
      plot
      genre
      actors {
        _id
        name
      }
      director {
        _id
        name
      }
      reviews {
        starRating
      }
    }
  }
`

type props = {
  movieId: string
}


export default function EditMovie({ movieId }: props) {
  const { data } = useQuery(fetchInfosSchema, {
    variables: { movieId }
  });

  const [updateMovie, { reset }] = useMutation(updateMovieSchema);

  const submitFN = async (values: movieFormData) => {
    // Logic comes here
    reset()
    // console.log(values)
    await updateMovie({
      variables: {
        updateMovieId: movieId,
        data: values
      }
    });
  }


  return (
    typeof data !== "undefined" ? <MovieForm buttonTrigger={<><MdEdit /><span>Edit</span></>} submitFN={submitFN} defaultValues={data?.getMovie} formTitle="Edit Movie" /> : ""
  )
}
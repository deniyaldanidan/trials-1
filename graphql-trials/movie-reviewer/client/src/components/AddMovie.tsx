import { gql, useMutation } from "@apollo/client";
import MovieForm from "./MovieForm";
import { FaPlus } from "react-icons/fa";
import { GET_MOVIES } from "@/graphqlSchemas";

const addMovieGQL = gql`
    mutation AddMovie($data: MovieInput!) {
        addMovie(data: $data) {
            _id
        }
    }  
`;


export default function AddMovie() {
    const [addMovie, { reset }] = useMutation(addMovieGQL, {
        refetchQueries: [
            GET_MOVIES
        ]
    })

    const submitFN = async (values: movieFormData) => {
        // Logic comes here
        reset();
        await addMovie({
            variables: {
                data: values
            }
        });
    }

    return (
        <MovieForm buttonTrigger={<><FaPlus /><span>Add Movie</span></>} submitFN={submitFN} formTitle="Add Movie" />
    )
}
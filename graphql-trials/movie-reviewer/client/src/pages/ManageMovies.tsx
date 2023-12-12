import MovieCard from "@/components/MovieCard";
import { GET_MOVIES } from "@/graphqlSchemas";
import { useQuery } from "@apollo/client";
import EditMovie from "@/components/EditMovie";
import AddMovie from "@/components/AddMovie";




export default function ManageMovies() {
    const { data } = useQuery(GET_MOVIES);

    return (
        <>
            <div className="flex justify-end mb-10">
                <AddMovie />
            </div>
            <div className="flex flex-wrap gap-8 min-h-[450px]">
                {
                    (typeof data !== "undefined" && data?.getMovies.length) ? data.getMovies.map((movie: movieDisplayer) => (
                        <MovieCard key={movie._id} movie={movie}>
                            <EditMovie movieId={movie._id} />
                        </MovieCard>
                    )) : "Movies are loading..."
                }
            </div>
        </>
    )
}
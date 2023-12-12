import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaSearch } from "react-icons/fa";
import { useQuery } from '@apollo/client';
import MovieCard from "@/components/MovieCard";
import { GET_MOVIES } from "@/graphqlSchemas";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";


const sortBY = ["a-z", "z-a", "recent", "oldest"];

function App() {

  const { data } = useQuery(GET_MOVIES);

  return (
    <div className="mx-myspace">
      {/* Header Text */}
      <div className="flex flex-col items-start gap-y-2">
        <div className="text-3xl font-serif">Unleash Your Cinematic Voice.</div>
        <div className="text-lg max-w-[620px] text-secForeground">Discover Pixel Ratings, the platform where your movie ratings become a powerful expression. Join us in shaping the narrative of cinema one rating at a time.</div>
      </div>
      {/* Search Bar & Sort Select */}
      <div className="flex gap-x-7 justify-between items-center mt-7 mb-4">
        <div className="flex gap-x-4 flex-grow">
          <Input className="bg-input max-w-[400px] text-base text-foreground" type="text" placeholder="Search for Movies..." />
          <Button className="text-base hover:bg-accent"><FaSearch className="mr-[6px]" /> Search</Button>
        </div>
        <Select onValueChange={val => console.log(val)}>
          <SelectTrigger className="max-w-[220px] text-base border-slate-600">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="bg-secondary">
            {sortBY.map(sort => <SelectItem className="cursor-pointer text-base" value={sort} key={sort} >Sort By: {sort.toUpperCase()}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      {/* Results Text */}
      <p className="text-xl font-medium text-secForeground mb-8">Showing results for: XXXX</p>
      {/* Movie Cards Lister */}
      <div className="flex flex-wrap gap-x-8 gap-y-7 min-h-[350px]">
        {(typeof data !== "undefined" && data?.getMovies.length) ? (
          data.getMovies.map((movie: movieDisplayer) => <MovieCard movie={movie} key={movie._id} ><Link to={`/movie/${movie._id}`}>View <FaAngleRight /></Link></MovieCard>)
        ) : <div className="text-red-600 text-2xl text-center flex-grow font-serif" >--No Movies to Show--</div>}
      </div>
    </div>
  )
}

export default App;
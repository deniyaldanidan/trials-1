import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { IoIosStar } from "react-icons/io";
import React, { useMemo } from 'react';
import { generateFakePosterSRC } from "@/lib/utils";

type props = {
    movie: movieDisplayer,
    children: React.ReactNode
}

export default function MovieCard({ movie, children }: props) {

    const movieRatings = useMemo(() => {
        return movie.reviews?.length ? (movie.reviews.reduce((sum, val) => val.starRating + sum, 0.0) / movie.reviews.length).toFixed(1) : 0.0
    }, [movie])

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="w-[250px] h-fit">
                    <img src={generateFakePosterSRC(movie._id, 250, 300)}
                        className="min-h-[300px] bg-slate-600 w-full h-auto rounded-[10px]" />
                    <div className="text-lg text-center mt-1 font-medium" >{movie.name}</div>
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-secBackground text-foreground">
                <div className="text-xl mb-1 font-medium">{movie.name}</div>
                <div className="flex justify-left items-center gap-x-4">
                    <div className="text-lg">{movie.year}</div>
                    <div className="flex gap-x-[6px] items-center text-lg text-accent font-medium"><IoIosStar /> {movieRatings}</div>
                </div>
                <Button asChild className="mt-4 text-lg gap-x-[4px] cursor-pointer hover:bg-accent duration-150 ease-in-out">
                    {children}
                </Button>
            </HoverCardContent>
        </HoverCard>
    )
}
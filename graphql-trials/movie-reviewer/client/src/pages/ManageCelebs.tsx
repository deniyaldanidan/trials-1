import { generateFakeAvatarSRC } from "@/lib/utils";
import { useQuery } from "@apollo/client"
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import EditCeleb from "@/components/EditCeleb";
import AddCeleb from "@/components/AddCeleb";
import { celebQuery } from "@/graphqlSchemas";




const btn_className = "text-lg hover:bg-accent hover:text-accent-foreground";

export default function ManageCelebs() {
    const { data } = useQuery(celebQuery);

    return (
        <>
            <div className="flex justify-end my-9">
                <Button asChild className={btn_className}><AddCeleb /></Button>
            </div>
            {((typeof data !== "undefined") && (data?.getCelebs?.length)) ? (
                <div className="flex flex-wrap gap-9">
                    {data.getCelebs.map((celeb: celebData) => (
                        <HoverCard key={celeb._id}>
                            <HoverCardTrigger>
                                <div className="flex flex-col gap-y-3 items-center">
                                    <img src={generateFakeAvatarSRC(celeb._id, 225)} alt={celeb.name} className="rounded-full w-[225px] h-[225px] bg-slate-800" />
                                    <div className="text-center text-lg font-medium capitalize">{celeb.name}</div>
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent asChild>
                                <div className="flex justify-center items-center gap-x-3 bg-secBackground">
                                    <Button asChild className={btn_className} ><EditCeleb celebData={celeb} /></Button>
                                    <Button variant="secondary" asChild className={btn_className}><Link to={`/celeb/${celeb._id}`}>View</Link></Button>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    ))}
                </div>
            ) : <div className="text-red-500 font-medium text-xl text-center">No Celebs to show Yet!</div>}
        </>
    )
}
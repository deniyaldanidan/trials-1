import { DialogHeader, DialogTitle, DialogContent, Dialog, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import clsx from "clsx";
import Select from 'react-select';
import { capitalize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import InpGrpShell from "./InpGrpShell";
import React, { useEffect, useState, useMemo } from 'react';
import { gql, useQuery } from "@apollo/client";

const movieParser = z.object({
    name: z.string().trim().min(1),
    year: z.number().min(1888).max(new Date().getFullYear()),
    director: z.string().trim().optional(),
    plot: z.string().trim().min(1),
    genre: z.string().array().nonempty(),
    actors: z.array(z.object({ value: z.string(), label: z.string() }))
});

const omittedParser = movieParser.omit({ actors: true, director: true });

const inputbaseClasses = "min-w-[245px] w-full text-lg bg-input px-2 py-1.5 rounded-[7.5px] outline-none border-slate-400 border-[1.5px] placeholder:text-slate-500 focus:border-slate-700 focus:shadow-sm";


const celebQuery = gql`
    query getCelebs{
        getCelebs {
            _id
            name
            titles
        }
    }
`

type props = {
    buttonTrigger: React.ReactNode,
    defaultValues?: z.infer<typeof omittedParser> & { director: celebSelector, actors: celebSelector[] },
    submitFN: (values: movieFormData) => Promise<void>
    formTitle: string
}


export default function MovieForm({ buttonTrigger, defaultValues, submitFN, formTitle }: props) {
    const { data } = useQuery(celebQuery);
    const [open, setOpen] = useState<boolean>(false);

    const { handleSubmit, control, setError, reset, formState } = useForm<z.infer<typeof movieParser>>({
        resolver: zodResolver(movieParser),
        mode: "onTouched",
        defaultValues: {
            name: defaultValues?.name ?? "",
            year: defaultValues?.year ?? 2000,
            plot: defaultValues?.plot ?? "",
            genre: defaultValues?.genre ?? [],
            director: defaultValues?.director?._id ?? "",
            actors: defaultValues?.actors?.map(celeb => ({ label: celeb?.name ?? "", value: celeb?._id ?? "" })) ?? []
        }
    });

    useEffect(() => {
        !open && reset()
    }, [open, reset])

    const celebsList: celebSelector[] = useMemo(() => data?.getCelebs ?? [], [data?.getCelebs]);
    const directorsList = useMemo(() => celebsList.filter(celeb => celeb.titles.includes("DIRECTOR")), [celebsList]);
    const actorsList = useMemo(() => celebsList.filter(celeb => celeb.titles.includes("ACTOR")), [celebsList]);


    const onSubmit = async (values: z.infer<typeof movieParser>) => {
        try {
            const formattedValues = { ...values, actors: values.actors.map(val => val.value) };
            await submitFN(formattedValues);
            setOpen(false)
        } catch (error) {
            setError("root", { message: "Process is Failed. Try Again." })
        }
    }

    return (
        <Dialog open={open} onOpenChange={val => setOpen(val)}>
            <DialogTrigger className="flex gap-x-1 justify-center items-center mt-4 text-lg px-6 py-1.5 rounded-[10px] text-primary-foreground bg-primary cursor-pointer duration-150 ease-in-out hover:bg-accent" >
                {buttonTrigger}
            </DialogTrigger>
            <DialogContent className="w-full max-w-3xl border-slate-400 overflow-y-auto max-h-screen">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">{formTitle}</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(onSubmit)}>
                    {/* name & year */}
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                        <Controller control={control} name="name"
                            render={({ field, fieldState: { error } }) => (
                                <InpGrpShell className="flex-grow" labelText="Movie Name" htmlFor="movie-name" error={error?.message}>
                                    <input id="movie-name" type="text" className={inputbaseClasses} {...field} autoComplete="off" />
                                </InpGrpShell>
                            )}
                        />
                        <Controller control={control} name="year"
                            render={({ field, fieldState: { error } }) => (
                                <InpGrpShell htmlFor="released-year" labelText="Released Year" error={error?.message} >
                                    <input id="released-year" type="text" className={inputbaseClasses} {...field} onChange={e => field.onChange(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))} />
                                </InpGrpShell>
                            )} />
                    </div>
                    {/* plot */}
                    <Controller control={control} name="plot"
                        render={({ field, fieldState: { error } }) => (
                            <InpGrpShell htmlFor="plot" labelText="Plot" error={error?.message}>
                                <textarea id="plot" className={clsx(inputbaseClasses, "min-h-[100px]")} {...field} />
                            </InpGrpShell>
                        )} />
                    {/* genres */}
                    <Controller
                        control={control}
                        name="genre"
                        render={({ field, fieldState: { error } }) => (
                            <InpGrpShell htmlFor="movie-genres" labelText="Genres" error={error?.message}>
                                <input type="text" id="movie-genres" className={clsx(inputbaseClasses)} {...field} value={field.value.join(",")} onChange={e => field.onChange(e.target.value.split(",").map(val => val.trim()))} />
                            </InpGrpShell>
                        )
                        }
                    />
                    {/* director */}
                    <Controller control={control} name="director"
                        render={({ field, fieldState: { error } }) => (
                            <InpGrpShell htmlFor="movie-director" labelText="Directed BY" error={error?.message}>
                                <select id="movie-director" className={inputbaseClasses} {...field}>
                                    <option value="" disabled>Select one</option>
                                    {directorsList.map(director => <option key={director._id} value={director._id} className="capitalize">{director.name}</option>)}
                                </select>
                            </InpGrpShell>
                        )}
                    />
                    {/* actors */}
                    <Controller control={control} name="actors"
                        render={({ field, fieldState: { error } }) => (
                            <InpGrpShell htmlFor="movie-casts" labelText="Actors" error={error?.message} >
                                <Select isMulti={true} inputId="movie-casts" options={actorsList.map(actor => ({ value: actor._id, label: capitalize(actor.name) }))} classNames={{ valueContainer: () => inputbaseClasses }}
                                    {...field}
                                />
                            </InpGrpShell>
                        )}
                    />
                    <Button type="submit" className="text-lg w-fit self-center px-10 hover:bg-accent">Submit</Button>
                </form>
                <DialogFooter className='block text-center text-red-500 h-[1.2rem] text-sm font-medium w-full' >
                    {formState.errors?.root?.message ?? ""}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
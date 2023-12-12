import { DialogHeader, DialogTitle, DialogContent, Dialog, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import clsx from "clsx";
import Select from 'react-select';
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import InpGrpShell from "./InpGrpShell";
import React, { useEffect, useState } from 'react';

const validTitles = ["ACTOR", "DIRECTOR"] as const;
const titleParser = z.enum(validTitles);

const celebParser = z.object({
    name: z.string().trim().min(1),
    bio: z.string().trim().min(3),
    titles: z
        .array(z.object({ label: titleParser, value: titleParser }))
        .nonempty()
        .max(2)
});

const inputbaseClasses = "min-w-[245px] w-full text-lg bg-input px-2 py-1.5 rounded-[7.5px] outline-none border-slate-400 border-[1.5px] placeholder:text-slate-500 focus:border-slate-700 focus:shadow-sm";

type props = {
    buttonTrigger: React.ReactNode,
    defaultValues?: celebFormData,
    submitFN: (values: celebFormData) => Promise<void>,
    formTitle: string
}


export default function CelebForm({ buttonTrigger, defaultValues, submitFN, formTitle }: props) {

    const [open, setOpen] = useState<boolean>(false);

    const { handleSubmit, control, setError, reset, formState } = useForm<z.infer<typeof celebParser>>({
        resolver: zodResolver(celebParser),
        mode: "onTouched",
        defaultValues: {
            name: defaultValues?.name ?? "",
            bio: defaultValues?.bio ?? "",
            titles: defaultValues?.titles.map(celeb => ({ label: celeb, value: celeb })) ?? []
        }
    });

    useEffect(() => {
        !open && reset()
    }, [open, reset])


    const onSubmit = async (values: z.infer<typeof celebParser>) => {
        try {
            const titlesFlattened = values.titles.map(title => title.value);
            const titlesSet = new Set(titlesFlattened);
            await submitFN({ name: values.name, bio: values.bio, titles: Array.from(titlesSet) });
            setOpen(false)
        } catch (error) {
            setError("root", { message: "Process is Failed. Try Again." })
        }
    }

    return (
        <Dialog open={open} onOpenChange={val => setOpen(val)}>
            <DialogTrigger className="flex gap-x-1 justify-center items-center text-lg px-6 py-1.5 rounded-[10px] text-primary-foreground bg-primary cursor-pointer duration-150 ease-in-out hover:bg-accent" >
                {buttonTrigger}
            </DialogTrigger>
            <DialogContent className="w-full max-w-3xl border-slate-400 overflow-y-auto max-h-screen">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">{formTitle}</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-y-2.5" onSubmit={handleSubmit(onSubmit)}>
                    {/* name */}
                    <Controller control={control} name="name"
                        render={({ field, fieldState: { error } }) => (
                            <InpGrpShell labelText="Celeb Name" htmlFor="celeb-name" error={error?.message}>
                                <input id="celeb-name" type="text" className={inputbaseClasses} {...field} autoComplete="off" />
                            </InpGrpShell>
                        )}
                    />
                    {/* bio */}
                    <Controller control={control} name="bio"
                        render={({ field, fieldState: { error } }) => (
                            <InpGrpShell htmlFor="bio" labelText="Bio" error={error?.message}>
                                <textarea id="bio" className={clsx(inputbaseClasses, "min-h-[100px]")} {...field} />
                            </InpGrpShell>
                        )} />
                    {/* actors */}
                    <Controller control={control} name="titles"
                        render={({ field, fieldState: { error } }) => (
                            <InpGrpShell htmlFor="celeb-titles" labelText="Titles" error={error?.message} >
                                <Select isMulti={true} inputId="celeb-titles" options={validTitles.map(title => ({ label: title, value: title }))} classNames={{ valueContainer: () => inputbaseClasses }}
                                    {...field}
                                />
                            </InpGrpShell>
                        )}
                    />
                    <Button type="submit" className="text-lg w-fit mt-1 self-center px-10 hover:bg-accent">Submit</Button>
                </form>
                <DialogFooter className='block text-center text-red-500 h-[1.25rem] text-sm font-medium w-full' >
                    {formState.errors?.root?.message ?? ""}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
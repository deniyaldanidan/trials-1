import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import validator from 'validator';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormItem, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import myAxios from '@/lib/myAxios';
import useAuthContext from '@/hooks/useAuthContext';

type props = {
    className: string
};

const formSchema = z.object({
    username: z.string().min(3).max(15).refine(val => validator.isAlphanumeric(val, "en-US", { ignore: "-_" })),
    email: z.string().email(),
    firstname: z.string().min(1).max(24).refine(val => validator.isAlpha(val)),
    lastname: z.string().min(1).max(24).refine(val => validator.isAlpha(val)),
    pwd: z.string().min(6).max(24)
})

export default function RegisterBTN({ className }: props) {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const { setAuthInfo } = useAuthContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
        defaultValues: { username: "", pwd: "", firstname: "", lastname: "", email: "" }
    });

    useEffect(() => {
        !dialogOpen && form.reset()
    }, [dialogOpen, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            form.clearErrors("root");
            const res = await myAxios.post("/register", values);
            const data = await res.data;
            setAuthInfo(data?.accessToken);
            setDialogOpen(false);
        } catch (error) {
            form.setError("root", { message: "User Registration failed" });
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={val => setDialogOpen(val)}>
            <DialogTrigger className={clsx(className)}>Register</DialogTrigger>
            <DialogContent className='bg-background max-w-[750px] w-fit overflow-y-auto max-h-screen'>
                <DialogHeader>
                    <DialogTitle className='text-center text-2xl font-serif' >Register</DialogTitle>
                    <DialogDescription className='text-center text-lg font-medium'>Register now to review your favorite movie</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-y-6'>
                        <div className='flex gap-x-5'>
                            <FormField
                                control={form.control}
                                name='firstname'
                                render={({ field }) => (
                                    <FormItem className='w-full min-w-[240px]'>
                                        <FormLabel className='text-lg'>FirstName</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter your firstname' {...field} className='bg-input fornt-medium text-lg placeholder:text-slate-800' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='lastname'
                                render={({ field }) => (
                                    <FormItem className='w-full min-w-[240px]'>
                                        <FormLabel className='text-lg'>LastName</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter your lastname' {...field} className='bg-input fornt-medium text-lg placeholder:text-slate-800' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-lg'>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter your username or email' {...field} className='bg-input font-medium text-lg placeholder:text-slate-800' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-lg'>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='example@example.com' {...field} className='bg-input font-medium text-lg placeholder:text-slate-800' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='pwd'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-lg'>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder='Enter your password' {...field} className='bg-input font-medium text-lg placeholder:text-slate-800' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='flex mx-auto mt-1 px-9 text-lg hover:bg-accent duration-150ms ease-in-out' >Register</Button>
                    </form>
                </Form>
                <DialogFooter>
                    <div className='flex-grow text-center text-red-500 h-[1.25rem] text-sm font-medium'>
                        {form.formState.errors?.root?.message ?? ""}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
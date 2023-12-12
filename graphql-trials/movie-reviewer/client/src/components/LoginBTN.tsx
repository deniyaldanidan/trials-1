import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import myAxios from '@/lib/myAxios';
import useAuthContext from '@/hooks/useAuthContext';

type props = {
    className: string
};

const formSchema = z.object({
    unameOrEmail: z.string().min(2).max(40),
    password: z.string().min(2).max(24)
})

export default function LoginBTN({ className }: props) {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const { setAuthInfo } = useAuthContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            unameOrEmail: "",
            password: ""
        }
    });

    useEffect(() => {
        !dialogOpen && form.reset()
    }, [dialogOpen, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            form.clearErrors("root")
            const res = await myAxios.post("/login", values);
            const data = await res.data;
            setAuthInfo(data?.accessToken);
            setDialogOpen(false);
        } catch (error) {
            form.setError("root", { message: "Login Failed" });
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={val => setDialogOpen(val)}>
            <DialogTrigger className={clsx(className)}>
                Login
            </DialogTrigger>
            <DialogContent className='bg-background overflow-y-auto max-h-screen'>
                <DialogHeader>
                    <DialogTitle className='text-center text-2xl font-serif' >Login</DialogTitle>
                    <DialogDescription className='text-center text-lg font-medium'>Login to review your favorite movie</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='unameOrEmail'
                            render={({ field }) => (
                                <FormItem className='mt-4 mb-7'>
                                    <FormLabel className='text-lg'>Username Or Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter your username or email' {...field} className='bg-input font-medium text-lg placeholder:text-slate-800' />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-lg'>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder='Enter your password' {...field} className='bg-input font-medium text-lg placeholder:text-slate-800' />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='flex mx-auto mt-8 px-9 text-lg hover:bg-accent duration-150ms ease-in-out' >Login</Button>
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
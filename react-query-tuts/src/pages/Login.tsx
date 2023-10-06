import '../styles/components/inpgrp.scss';
import { FormEventHandler, useState, useEffect } from 'react';
import { z } from 'zod';
import myValidators from '../helpers/validator';
import InpGrp from '../components/InpGrp';
import Form from '../components/Form';
import useAuth from '../hooks/useAuth';

const inpData = z.object({
    unameOrEmail: myValidators.spaceFilteredString.min(1).max(75),
    password: myValidators.spaceFilteredString.min(1).max(50)
})

export default function Login() {
    const [unameOrEmail, setUnameOrEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [err, setErr] = useState<string>("");

    const { isLoading, mutateAsync } = useAuth<z.infer<typeof inpData>>("login")

    useEffect(() => {
        setErr("");
    }, [unameOrEmail, pwd]);



    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        try {
            if (!inpData.safeParse({ unameOrEmail, password: pwd }).success) {
                return setErr("Invalid input");
            }
            await mutateAsync({ unameOrEmail, password: pwd });
        } catch (error) {
            return setErr("Login Failed");
        }
    }

    return (
        <Form
            handleSubmit={handleSubmit}
            err={err}
            isLoading={isLoading}
            formHeadText='Login'
        >
            <InpGrp
                id='unameOrEmail'
                type="text"
                placeholder='Enter your username or email here.'
                value={unameOrEmail}
                onChange={(e) => setUnameOrEmail(e.target.value)}
                label='Username Or Email'
            />
            <InpGrp
                id='password'
                type="password"
                placeholder='Enter your password here'
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                label='Password'
            />
        </Form>
    )
}
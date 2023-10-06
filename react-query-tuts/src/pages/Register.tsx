import Form from "../components/Form";
import { useState, FormEvent } from 'react';
import useAuth from "../hooks/useAuth";
import InpGrp from "../components/InpGrp";
import myValidators from "../helpers/validator";
import { z } from 'zod';
import { AxiosError } from "axios";

const userInput = z.object({
    username: myValidators.username,
    email: myValidators.email,
    password: myValidators.password,
    firstname: myValidators.nameInp,
    lastname: myValidators.nameInp
})

export default function Register() {

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");

    const [err, setErr] = useState<string>("");

    const { isLoading, mutateAsync } = useAuth<z.infer<typeof userInput>>("register");

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const parsin = userInput.safeParse({
                username,
                email,
                password,
                firstname,
                lastname
            });
            if (!parsin.success) {
                return setErr("Invalid inputs");
            }
            if (password !== confirm) {
                return setErr("Password and Confirm should match");
            }
            await mutateAsync(parsin.data);
        } catch (error) {
            if (error instanceof AxiosError && error?.response?.status === 409) {
                setErr(error?.response?.data?.error ?? "User registration failed.");
                return;
            }
            setErr("User registration failed. Try Again later");
            return;
        }
    }

    return (
        <Form
            handleSubmit={handleSubmit}
            err={err}
            isLoading={isLoading}
            formHeadText="Register"
            width="medium"
        >
            <div className="two-col">
                <InpGrp id="uname" type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} label="Username" />

                <InpGrp id="email" type="email" placeholder="example@sample.com" value={email} onChange={e => setEmail(e.target.value)} label="Email" />
            </div>
            <div className="two-col">
                <InpGrp id="pwd" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} label="Password" />

                <InpGrp id="cnfrm" type="password" placeholder="Retype your password here" value={confirm} onChange={e => setConfirm(e.target.value)} label="Confirm" />
            </div>
            <div className="two-col">
                <InpGrp id="fname" type="text" placeholder="Enter your first name" value={firstname} onChange={e => setFirstname(e.target.value)} label="Firstname" />

                <InpGrp id="lname" type="text" placeholder="Enter your lastname" value={lastname} onChange={e => setLastname(e.target.value)} label="Lastname" />
            </div>
        </Form>
    )
}
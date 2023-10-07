import { FormEventHandler, useEffect, useState } from "react";
import Form from "../components/Form";
import InpGrp from "../components/InpGrp";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthAxios } from "../helpers/myAxios";
import url from "../helpers/urldata";
import { useNavigate } from "react-router";




export default function CreateIdea() {
    const navigate = useNavigate();
    const myQueryClient = useQueryClient();
    const myAuthAxios = useAuthAxios()

    const { mutateAsync, isLoading, isSuccess } = useMutation({
        mutationFn: async (data: { content: string }) => {
            return await myAuthAxios.post("/ideas", data)
        },
        onSuccess: () => {
            myQueryClient.invalidateQueries(["ideas"]);
        }
    })

    const [content, setContent] = useState<string>("");
    const [err, setErr] = useState<string>("");

    useEffect(() => {
        setErr("");
    }, [content]);

    useEffect(() => {
        isSuccess && navigate(url.home.value);
    }, [isSuccess, navigate]);

    const handleSubmit: FormEventHandler = async e => {
        e.preventDefault();
        try {
            if (!z.string().min(1).safeParse(content).success) {
                return setErr("Invalid inputs");
            }
            await mutateAsync({ content });
        } catch (error) {
            setErr("Operation failed");
        }
    }

    return (
        <Form formHeadText="Create Idea" handleSubmit={handleSubmit} err={err} isLoading={isLoading} width="medium">
            <InpGrp value={content} onChange={e => setContent(e.target.value)} id="content" label="Content" type="text" placeholder="What's on your mind?" textarea />
        </Form>
    )
}
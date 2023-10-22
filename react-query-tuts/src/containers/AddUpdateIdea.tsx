import { FormEventHandler, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import InpGrp from "../components/InpGrp";
import url from "../helpers/urldata";
import myValidators from "../helpers/validator";


type createEditProps = {
    operation: "create",
    mutateFN: ({ content }: { content: string }) => Promise<any>,
    prevData?: undefined
} | {
    operation: "update",
    mutateFN: ({ id, content }: { id: number, content: string }) => Promise<any>,
    prevData: { id: number, content: string }
}

type props = {
    isLoading: boolean,
    isSuccess: boolean
} & createEditProps

export default function AddUpdateIdea({ mutateFN, operation, prevData, isLoading, isSuccess }: props) {
    const [content, setContent] = useState<string>(() => {
        return operation === "update" ? prevData.content : ""
    });
    const [err, setErr] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        setErr("");
    }, [content]);

    useEffect(() => {
        isSuccess && navigate(url.home.value);
    }, [isSuccess, navigate]);

    const handleSubmit: FormEventHandler = async e => {
        e.preventDefault();
        try {
            if (!myValidators.unEmptyString.safeParse(content).success) {
                return setErr("Invalid inputs");
            }
            if (operation === "create") {
                await mutateFN({ content })
            } else if (operation === "update") {
                await mutateFN({ id: prevData.id, content })
            }
        } catch (error) {
            setErr("Operation failed");
        }
    }

    return (
        <Form formHeadText={operation === "create" ? "Create Idea" : "Update Idea"} handleSubmit={handleSubmit} err={err} isLoading={isLoading} width="medium">
            <InpGrp value={content} onChange={e => setContent(e.target.value)} id="content" label="Content" type="text" placeholder="What's on your mind?" textarea />
        </Form>
    )
}
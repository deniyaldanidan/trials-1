import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useCreateOrUpdateIdea } from "../helpers/myAxios";
import url from "../helpers/urldata";
import myValidators from "../helpers/validator";
import AddUpdateIdea from "../containers/AddUpdateIdea";


const validState = z.object({
    id: myValidators.validIntId,
    content: myValidators.unEmptyString
})

export default function UpdateIdea() {
    const { state: myState }: { state: z.infer<typeof validState> } = useLocation();

    const navigate = useNavigate();
    const myQueryClient = useQueryClient();
    const mutationFn = useCreateOrUpdateIdea("update");

    const { mutateAsync, isLoading, isSuccess } = useMutation({
        mutationFn,
        onSuccess: () => {
            myQueryClient.invalidateQueries({ queryKey: ['ideas'], refetchType: "all" });
        }
    });

    useEffect(() => {
        if (!validState.safeParse(myState).success) {
            navigate(url.home.value);
            console.error("Invalid data");
        } /*else {
            console.info("state is valid", myState);
        } */
    }, [myState, navigate]);

    return (
        <AddUpdateIdea operation="update" mutateFN={mutateAsync} isLoading={isLoading} isSuccess={isSuccess} prevData={myState} />
    )
}
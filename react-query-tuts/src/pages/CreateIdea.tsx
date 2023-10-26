import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCreateOrUpdateIdea } from "../helpers/myAxios";
import AddUpdateIdea from "../containers/AddUpdateIdea";
import { allIdeasQKEY } from "../helpers/query-keys";


export default function CreateIdea() {
    const myQueryClient = useQueryClient();
    const mutationFn = useCreateOrUpdateIdea("create");

    const { mutateAsync, isPending, isSuccess } = useMutation({
        mutationFn,
        onSuccess: () => {
            myQueryClient.invalidateQueries({ queryKey: allIdeasQKEY, refetchType: "all" });
        }
    })

    return (
        <AddUpdateIdea mutateFN={mutateAsync} isLoading={isPending} isSuccess={isSuccess} operation="create" />
    );
}
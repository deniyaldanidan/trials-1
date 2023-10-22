import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCreateOrUpdateIdea } from "../helpers/myAxios";
import AddUpdateIdea from "../containers/AddUpdateIdea";


export default function CreateIdea() {
    const myQueryClient = useQueryClient();
    const mutationFn = useCreateOrUpdateIdea("create");

    const { mutateAsync, isLoading, isSuccess } = useMutation({
        mutationFn,
        onSuccess: () => {
            myQueryClient.invalidateQueries({ queryKey: ['ideas'], refetchType: "all" });
        }
    })

    return (
        <AddUpdateIdea mutateFN={mutateAsync} isLoading={isLoading} isSuccess={isSuccess} operation="create" />
    );
}
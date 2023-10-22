import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthAxios } from "../helpers/myAxios";


export function useDeleteIdea(id: number) {
    const myQueryClient = useQueryClient();
    const myAuthAxios = useAuthAxios();

    const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
            return await myAuthAxios.delete(`/ideas/${id}`)
        },
        onSuccess: () => {
            myQueryClient.invalidateQueries({ queryKey: ["ideas"], refetchType: "all" })
        }
    })

    return { isDeleting: isLoading, deleteFN: mutate }
}
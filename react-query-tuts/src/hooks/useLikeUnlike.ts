import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthAxios } from "../helpers/myAxios";
import { allIdeasQKEY, oneIdeaQKEY } from "../helpers/query-keys";

export function useLikeUnlike() {
    const myAuthAxios = useAuthAxios();
    const myQueryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: { value: likeVal, idea_id: number }) => {
            return await myAuthAxios.post("/ideas/like", data)
        },
        onSuccess: (_, { idea_id: id }) => {
            myQueryClient.prefetchQuery({ queryKey: oneIdeaQKEY(id) })
            myQueryClient.invalidateQueries({ queryKey: allIdeasQKEY, type: "all" });
        }
    })

    return { mutate, isLoading: isPending };
}
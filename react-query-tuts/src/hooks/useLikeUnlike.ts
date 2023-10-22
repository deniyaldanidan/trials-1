import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthAxios } from "../helpers/myAxios";


// ? Mutate the cache without invalidating it..
export function useLikeUnlike() {
    const myAuthAxios = useAuthAxios();

    const myQueryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: async (data: { value: likeVal, idea_id: number }) => {
            return await myAuthAxios.post("/ideas/like", data)
        },
        onSuccess: (_, { value, idea_id }) => {
            //! remove the below commented code.
            /*myQueryClient.invalidateQueries({
                queryKey: ["ideas"],
                refetchType: "all"
            }) */
            myQueryClient.setQueryData<Array<Idea1>>(
                ["ideas"],
                (prev) => {
                    if (prev?.length) {
                        /**
                         * Mutate it here
                         */
                    }
                    return prev
                }
            )
        }
    })

    return { mutate, isLoading };
}
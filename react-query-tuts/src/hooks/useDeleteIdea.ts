import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthAxios } from "../helpers/myAxios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import url from "../helpers/urldata";
import { allIdeasQKEY, oneIdeaQKEY } from "../helpers/query-keys";


export function useDeleteIdea() {
    const myQueryClient = useQueryClient();
    const myAuthAxios = useAuthAxios();
    const navigate = useNavigate()

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: async (id: number) => {
            return await myAuthAxios.delete(`/ideas/${id}`)
        },
        onSuccess: (_, id) => {
            myQueryClient.invalidateQueries({ queryKey: allIdeasQKEY, refetchType: "all" });
            myQueryClient.removeQueries({ queryKey: oneIdeaQKEY(id), exact: true })
        }
    });

    useEffect(() => {
        isSuccess && navigate(url.home.value)
    }, [isSuccess, navigate]);

    return { isDeleting: isPending, deleteFN: mutate }
}
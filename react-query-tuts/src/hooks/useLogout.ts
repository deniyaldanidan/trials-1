import { useMutation, useQueryClient } from "@tanstack/react-query";
import myAxios from "../helpers/myAxios";
import useAuthState from "../context/AuthContext";
import { accTokQKEY } from "../helpers/query-keys";


export default function useLogout() {
    const { resetAuth } = useAuthState();
    const myQueryClient = useQueryClient();

    const { mutate: logout } = useMutation({
        mutationFn: () => {
            return myAxios.post("/auth/logout");
        },
        onSuccess: () => {
            resetAuth();
            myQueryClient.setQueryData(accTokQKEY, null);
        }
    })


    return logout;
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import myAxios from "../helpers/myAxios";
import useAuthState from "../context/AuthContext";


export default function useLogout() {
    const { resetAuth } = useAuthState();
    const myQueryClient = useQueryClient();

    const { mutate: logout } = useMutation(() => {
        return myAxios.post("/auth/logout");
    }, {
        onSuccess: () => {
            resetAuth();
            myQueryClient.setQueryData(["accesstoken"], null);
        }
    })


    return logout;
}
import { useMutation, useQueryClient } from '@tanstack/react-query';
import myAxios from '../helpers/myAxios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import url from '../helpers/urldata';
import useAuthState from '../context/AuthContext';
import { accTokQKEY } from '../helpers/query-keys';

export default function useAuth<T>(action: "login" | "register") {
    const navigate = useNavigate();
    const { setAuth } = useAuthState();
    const myQueryClient = useQueryClient();
    const { isSuccess, isPending, mutateAsync } = useMutation({
        mutationFn: (inpdata: T) => {
            const path = action === "login" ? "/auth/login" : "/auth/register";
            return myAxios.post<{ success: string, token: string }>(path, inpdata);
        },
        onSuccess: (data) => {
            setAuth(data.data.token);
            myQueryClient.setQueryData(accTokQKEY, data.data.token);
        }
    });

    useEffect(() => {
        isSuccess && navigate(url.home.value, { replace: true });
    }, [isSuccess, navigate]);

    return { isSuccess, isLoading: isPending, mutateAsync };
}
import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { refreshClient } from '../helpers/myAxios';
import myValidators from '../helpers/validator';
import jwtdecode from 'jwt-decode';

const AuthContext = createContext<{ authState: authObject, setAuth: voidFN<string>, resetAuth: emptyVoidFN }>({
    authState: { status: "loading" },
    setAuth: () => { },
    resetAuth: () => { }
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<authObject>({ status: "loading" });

    const { isLoading, isSuccess, isError, data } = useQuery({
        queryKey: ["accesstoken"],
        queryFn: refreshClient,
        retry: 0,
        refetchInterval: 4 * 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        keepPreviousData: false
    });

    useEffect(() => {
        if (isSuccess) {
            setAuth(data);
            return;
        }
        if (isError) {
            setAuthState({ status: "unauth" });
            return;
        }
        if (isLoading) {
            setAuthState({ status: "loading" });
            return;
        }
    }, [isSuccess, data, isError, isLoading]);

    function setAuth(data: string) {
        try {
            const accToken = myValidators.isValidJWT.parse(data);
            const userInfo = jwtdecode<userInfo>(accToken);
            return setAuthState({
                status: "auth",
                userInfo
            })
        } catch (error) {
            return setAuthState({
                status: "unauth"
            })
        }
    }

    function resetAuth() {
        setAuthState({ status: "unauth" })
    }


    return <AuthContext.Provider value={{ authState, setAuth, resetAuth }} >
        {children}
    </AuthContext.Provider>
}

export default function useAuthState() {
    return useContext(AuthContext);
}
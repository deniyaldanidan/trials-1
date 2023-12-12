import React, { createContext, useEffect, useState } from "react";
import validator from "validator";
import { jwtDecode } from 'jwt-decode';
import { z } from "zod";
import myAxios from "@/lib/myAxios";
import { CanceledError } from "axios";

const defaultAuthObj: authInfo = {
    auth: false
}

const payloadParser = z.object({
    username: z.string(),
    _id: z.string(),
    name: z.string(),
    role: z.enum(["USER", "ADMIN"])
})

export const AuthContext = createContext<{ authInfo: authInfo, setAuthInfo: (token: string) => void, resetAuth: () => void, loadingAuth: boolean }>({
    authInfo: defaultAuthObj,
    setAuthInfo: () => { },
    resetAuth: () => { },
    loadingAuth: false
});

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<authInfo>(defaultAuthObj);
    const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

    useEffect(() => {
        setLoadingAuth(true)
        const abortSignaller = new AbortController();
        const fetchRefresh = async () => {
            try {
                const res = await myAxios.get("/refresh", {
                    signal: abortSignaller.signal
                });
                const token = res.data?.accessToken ?? "";
                setAuthInfo(token);
                setLoadingAuth(false)
            } catch (error) {
                if (error instanceof CanceledError) return;
                console.log(error)
                setLoadingAuth(false)
            }
        }

        setTimeout(() => fetchRefresh(), 50);

        return () => {
            abortSignaller.abort()
        }
    }, [])

    const setAuthInfo = (token: string) => {
        if (typeof token !== "string" || !validator.isJWT(token)) return;
        const decodedInfo = payloadParser.safeParse(jwtDecode(token));
        if (!decodedInfo.success) return;
        const userData = decodedInfo.data;
        setAuth({
            auth: true,
            username: userData.username,
            name: userData.name,
            role: userData.role,
            userId: userData._id,
            token
        });
    }

    const resetAuth = () => {
        setAuth(defaultAuthObj);
    }

    return (
        <AuthContext.Provider value={{ authInfo: auth, setAuthInfo, resetAuth, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
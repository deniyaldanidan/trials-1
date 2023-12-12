import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import React, { useMemo, useRef } from "react";
import { setContext } from '@apollo/client/link/context';
import useAuthContext from "@/hooks/useAuthContext";


export default function CustApolloProvider({ children }: { children: React.ReactNode }) {
    const { authInfo: { token } } = useAuthContext()
    const tokenRef = useRef<string>("");
    tokenRef.current = token ?? "";

    const client = useMemo(() => {
        const authLink = setContext((_, { headers }) => ({
            headers: {
                ...headers,
                authorization: tokenRef.current?.length ? `Bearer ${tokenRef.current}` : ""
            }
        }));

        const httpLink = createHttpLink({
            uri: "http://localhost:4000/graphql"
        });

        return new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
            connectToDevTools: true
        })
    }, [])

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}
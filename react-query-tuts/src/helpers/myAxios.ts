import axios, { AxiosResponse } from "axios";
import useAuthState from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const baseURL = "http://localhost:8123";

const myAxios = axios.create({
    baseURL,
    withCredentials: true
})

export default myAxios;

export const refreshClient = async () => {
    const res = await myAxios.get<{ accToken: string }>("/auth/refresh");
    return res.data.accToken;
}

export const fetchIdeasClient = async () => {
    try {
        const res = await myAxios.get<Idea1[]>("/ideas");
        return res.data;
    } catch (error) {
        throw new Error("Query failed");
    }
}

export function useAuthAxios() {
    const { myaccessToken } = useAuthState();

    if (myaccessToken !== null) {
        return axios.create({
            baseURL,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${myaccessToken}`
            }
        })
    }

    return myAxios;
}

// ! Function Overload1
export function useCreateOrUpdateIdea(operation: "create"): (createData: { content: string }) => Promise<AxiosResponse<any, any>>;
// ! Function Overload2
export function useCreateOrUpdateIdea(operation: "update"): (updateData: { id: number, content: string }) => Promise<AxiosResponse<any, any>>;
// ! The Actual Function
export function useCreateOrUpdateIdea(operation: "create" | "update") {
    const myAuthAxios = useAuthAxios();

    const createFN = async (createdata: { content: string }) => {
        return await myAuthAxios.post("/ideas", createdata)
    };

    const updateFN = async (updateData: { id: number, content: string }) => {
        return await myAuthAxios.put("/ideas", updateData)
    };

    return operation === "update" ? updateFN : createFN
}



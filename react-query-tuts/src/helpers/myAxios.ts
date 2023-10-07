import axios from "axios";
import useAuthState from "../context/AuthContext";

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
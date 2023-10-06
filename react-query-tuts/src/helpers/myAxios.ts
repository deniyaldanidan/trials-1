import axios from "axios";

const myAxios = axios.create({
    baseURL: "http://localhost:8123",
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
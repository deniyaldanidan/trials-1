import axios from 'axios';

const myAxios = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 5000,
    withCredentials: true
})

export default myAxios;
import axios from "axios";
import { BASE_URL } from "../constants";

export const apiClient = axios.create({
    baseURL: BASE_URL
})

apiClient.interceptors.request.use((req) => {
    const accesToken = localStorage.getItem("access_token")
    if (accesToken) {
        req.headers.Authorization = `Bearer: ${accesToken}`
    }
    return req 
})

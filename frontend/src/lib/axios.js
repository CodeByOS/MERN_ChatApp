import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:9000/api",   //? Base URL for all API requests
    withCredentials: true,  //? Send cookies (for authentication) with every request
})
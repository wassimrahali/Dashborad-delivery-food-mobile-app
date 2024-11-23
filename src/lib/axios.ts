import axios from "axios";

export const apiInstance = axios.create({
    baseURL: "https://foodie-back.up.railway.app/api",
    // baseURL: "http://localhost:8000/api",
});

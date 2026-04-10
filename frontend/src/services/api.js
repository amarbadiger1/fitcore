import axios from "axios"
const url = import.meta.env.VITE_API_URL
const API = axios.create({
    baseURL: url,
    withCredentials: true
})


export default API
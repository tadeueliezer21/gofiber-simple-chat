import axios from "axios"

const BASE_URL = "localhost:5000/";

const http = axios.create({
    baseURL: "http://" + BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export { http, BASE_URL };
import { ROUTES } from "@/constants/api.constants";
import axios from "axios"

export const addBlog = async (blog: AddBlog, token: string) => {
    const serverUrl = process.env.GO_SERVER_URL;
    if (!serverUrl) {
        console.log("out")
        throw new Error("No server URL");
    }
    const { blogs } = ROUTES;
    const endpoint = serverUrl + blogs.url + blogs.routes.addBlog;
    // const token = localStorage.getItem('token');
    if (!token || token == "" || token == "null") {
        console.log("out")
        throw new Error("No token");
    }

    return await axios.post(endpoint, blog, {
        headers: {
            'auth_token': token
        }
    })
}
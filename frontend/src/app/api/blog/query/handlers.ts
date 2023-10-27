import { ROUTES } from "@/constants/api.constants";
import axios from "axios"

export const allBlogs = async (token: string) => {
    const serverUrl = process.env.GO_SERVER_URL;
    if (!serverUrl) {
        console.log("out")
        throw new Error("No server URL");
    }
    const { feed } = ROUTES;
    const endpoint = serverUrl + feed.url + feed.routes.myPosts;
    if (!token || token == "" || token == "null") {
        throw new Error("No token");
    }
    console.log("endpoint" + endpoint)
    return await axios.get(endpoint, {
        headers: {
            'auth_token': token
        }
    })
}
import { ROUTES } from "@/constants/api.constants";
import axios from "axios";

export const getUserById = async (token: string) => {
    const serverUrl = process.env.GO_SERVER_URL;
    if (!serverUrl) {
        console.log("out")
        throw new Error("No server URL");
    }
    const { user } = ROUTES;
    const endpoint = serverUrl + user.url + user.routes.getById;
    if (!token || token == "" || token == "null") {
        throw new Error("No token");
    }
    return await axios.get(endpoint, {
        headers: {
            'auth_token': token
        }
    })
}

export const getUserByEmail = async (id: string, token: string) => {
    const serverUrl = process.env.GO_SERVER_URL;
    if (!serverUrl) {
        console.log("out")
        throw new Error("No server URL");
    }
    const { user } = ROUTES;
    const endpoint = serverUrl + user.url + user.routes.getByEmail;
    if (!token || token == "" || token == "null") {
        throw new Error("No token");
    }
    return await axios.get(endpoint, {
        headers: {
            'auth_token': token
        }
    })
}

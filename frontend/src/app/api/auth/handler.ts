import { ROUTES } from "@/constants/api.constants";
import axios from "axios";

export const login = async (input: LoginData) => {
    const serverUrl = process.env.GO_SERVER_URL;
    if (!serverUrl) {
        throw new Error("No server URL");
    }
    const {auth} = ROUTES
    const endpoint = serverUrl + auth.url + auth.routes.login
    return await axios.post(endpoint, input)
}

export const register = async (input: RegisterData) => {
    const serverUrl = process.env.GO_SERVER_URL;
    if (!serverUrl) {
        throw new Error("No server URL");
    }
    const { auth } = ROUTES
    const endpoint = serverUrl + auth.url + auth.routes.register
    return await axios.post(endpoint, input)
}
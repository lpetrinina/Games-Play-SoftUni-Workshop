import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { request } from "../utils/requester"


export default function useAuth() {
    const authData = useContext(UserContext)

    const requestWrapper = (method, url, data, options = {}) => {
        const optionWrapper = {
            ...options,
            headers: {
                'X-Authorization': authData.accessToken,
                ...options.headers
            }
        };

        return request(method, url, data, optionWrapper)
    };

    return {
        ...authData,
        request: requestWrapper
    }
};
import { request } from "../utils/requester"

const baseUrl = 'http://localhost:3030/users'

// use hook on event
export default function useLogin() {

    const login = async (email, password) => {

        const result = await request('POST', `${baseUrl}/login`, { email, password });
        return result;
    }

    return {
        login,
    }
}
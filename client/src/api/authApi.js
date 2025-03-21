import { useContext, useEffect, useRef } from "react";
import { request } from "../utils/requester"
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/users'

// use hook on event
export default function useLogin() {
    const abortRef = useRef(new AbortController());

    const login = async (email, password) => {

        const result = await request('POST', `${baseUrl}/login`, { email, password }, { signal: abortRef.current.signal });

        return result;
    }

    useEffect(() => {
        const abortCotroller = abortRef.current;

        return () => abortCotroller.abort();
    }, []);

    return {
        login,
    }
}

//use hook on event
export const useRegister = () => {

    const register = async (email, password) => {

        const result = await request('POST', `${baseUrl}/register`, { email, password });

        return result;
    }

    return {
        register
    }
}

//use hook on mount
export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext);

    useEffect(() => {

        if (!accessToken) {
            return;
        }

        const options = {
            headers: {
                'X-Authorization': accessToken
            }
        }

        request('GET', `${baseUrl}/logout`, null, options).then(() => userLogoutHandler());

    }, [accessToken, userLogoutHandler]);

    return {
        isLoggedOut: !!accessToken,
    }

}
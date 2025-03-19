import { useContext } from "react";
import { request } from "../utils/requester";
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/data/games';

// use hook on event
export const useCreateGame = () => {
    const { accessToken } = useContext(UserContext)

    const options = {
        headers: {
            'X-Authorization': accessToken
        }
    }

    const create = (gameData) => {
        return request('POST', baseUrl, gameData, options);
    }

    return { create }

}
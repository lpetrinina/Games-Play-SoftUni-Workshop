import { useContext, useEffect, useState } from "react";

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

//use hook on mount
export const useAllGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        request('GET', baseUrl)
            .then((result) => setGames(result));
    }, [])

    return {
        games
    }
}

export const useGame = (gameId) => {
    const [game, setGame] = useState({});

    useEffect(() => {
        request('GET', `${baseUrl}/${gameId}`)
            .then((data) => setGame(data))
    }, [gameId])

    return { game }
}
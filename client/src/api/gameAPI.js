import { useContext, useEffect, useState } from "react";

import { request } from "../utils/requester";
import { UserContext } from "../contexts/UserContext";
import useAuth from "../hooks/useAuth";

const baseUrl = 'http://localhost:3030/data/games';

// use hook on event
export const useCreateGame = () => {
    const { request } = useAuth();

    // const options = {
    //     headers: {
    //         'X-Authorization': accessToken
    //     }
    // }

    const create = (gameData) => {
        return request('POST', baseUrl, gameData);
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

//use hook on mount
export const useLatestGames = () => {
    const [latestGames, setLatestGames] = useState([]);
    const PAGE_SIZE = 3;

    useEffect(() => {

        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: PAGE_SIZE,
            select: '_id,imageUrl,title'
        });

        request('GET', `${baseUrl}?${searchParams.toString()}`)
            .then((result) => setLatestGames(result));

    }, [PAGE_SIZE])

    return {
        latestGames
    }

}

//use hook on mount
export const useGame = (gameId) => {
    const [game, setGame] = useState({});

    useEffect(() => {
        request('GET', `${baseUrl}/${gameId}`)
            .then((data) => setGame(data))
    }, [gameId])

    return { game }
}

//use hook on event
export const useEditGame = () => {
    const { request } = useAuth();

    const edit = (gameId, gameData) => {
        return request('PUT', `${baseUrl}/${gameId}`, { ...gameData, _id: gameId })

    }
    return { edit }
}

export const useDeleteGame = () => {
    const { request } = useAuth();

    const deleteGame = (gameId) => {
        return request('DELETE', `${baseUrl}/${gameId}`)
    }

    return { deleteGame }
}

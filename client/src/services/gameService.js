import { request } from "../utils/requester";


const baseUrl = 'http://localhost:3030/jsonstore/games'

export default {


    edit(gameId, gameData) {
        return request('PUT', `${baseUrl}/${gameId}`, { ...gameData, _id: gameId });
    },

    delete(gameId) {
        return request('DELETE', `${baseUrl}/${gameId}`);
    }
}
import { request } from "../utils/requester";


const baseUrl = 'http://localhost:3030/jsonstore/games'

export default {
    async getAll() {
        const result = await request('GET', baseUrl);

        const games = Object.values(result);

        return games;
    },

    getOne(gameId) {
        return request('GET', `${baseUrl}/${gameId}`);
    },


    edit(gameId, gameData) {
        return request('PUT', `${baseUrl}/${gameId}`, { ...gameData, _id: gameId });
    },

    delete(gameId) {
        return request('DELETE', `${baseUrl}/${gameId}`);
    }
}
import { request } from "../utils/requester";


const baseUrl = 'http://localhost:3030/jsonstore/games'

export default {
    async getAll() {
        const result = await request('GET', baseUrl);

        const games = Object.values(result);

        return games;
    },

    create(gameData) {
        return request('POST', baseUrl, gameData);
    }
}
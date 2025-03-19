import { request } from "../utils/requester";

const baseUrl = 'http://localhost:3030/jsonstore/comments';

export default {
    create(email, gameId, comment) {
        return request('POST', baseUrl, { email, gameId, comment })
    }
}
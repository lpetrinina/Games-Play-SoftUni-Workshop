
export const request = async (method, url, data, options = {}) => {

    if (method !== 'GET') {
        options.method = method
    }

    if (data) {
        options = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(data),
        }
    }

    const responce = await fetch(url, options);

    const result = await responce.json();

    return result;
}

// export default {
//     get: request.bind(null, 'GET'),
//     post: request.bind(null, 'POST'),
//     put: request.bind(null, 'PUT'),
//     delete: request.bind(null, 'DELETE'),
// }
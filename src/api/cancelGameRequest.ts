import { BACKEND_BASE_URL } from './endpoints';

/**
 * The response format of the server
 *
 * @property {string} message - Contains the error message or an empty string if OK
 * @property {number} status - The status of the message representing what went wrong on the backend
 */
export interface Response {
    message: string;
    status: number;
}

/**
 * Delete a game request on the backend
 *
 * @param {number} userId - The id of the user sending the request (typically the user logged in)
 * @param {gameId} gameId - The id of the game to delete
 * @param {string} token - The requesting user's API token
 */
const deleteGameRequest = async (
    userId: number,
    gameId: number,
    token: string,
): Promise<Response> => {
    const url = `${BACKEND_BASE_URL}/users/${userId}/games/${gameId}`;

    let response = await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },

    if (!response.ok) {
        throw new Error('Failed to connect');
    }

    return await response.json().then((data) => {
        if (data.status !== 200) {
            throw new Error(data);
        }
        return data;
    });
};

export default deleteGameRequest;

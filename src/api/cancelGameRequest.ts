import ApiRequest, { HTTPMethod } from './ApiRequest';

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
 * @param {number} gameId - The id of the game to delete
 * @param {string} token - The requesting user's API token
 */
const deleteGameRequest = async (userId: number, gameId: number, token: string): Promise<Response> => {
    const path = `/users/${userId}/games/${gameId}`;

    return await new ApiRequest(path).withMethod(HTTPMethod.DELETE).withToken(token).send<Response>();
};

export default deleteGameRequest;

import ApiRequest, { HTTPMethod } from './ApiRequest';

/**
 * The response from the server
 */
interface Response {
    message: string;
    status: number;
}

/**
 * The possible responses a user can make to a game request
 */
type Action = 'Accept' | 'Decline';

/**
 * Respond to a game request
 * @param userId The id of the user that is responding
 * @param gameId The id of the game they are responding to
 * @param action The action they want to take
 * @param token The user's API token
 */
const respondGameRequest = async (userId: number, gameId: number, action: Action, token: string): Promise<Response> => {
    const path = `/users/${userId}/games/${gameId}`;
    return await new ApiRequest(path).withMethod(HTTPMethod.PATCH).withToken(token).withBody(action).send<Response>();
};

export default respondGameRequest;

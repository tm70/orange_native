import ApiRequest, { HTTPMethod } from './ApiRequest';

/**
 * The response from the server
 */
export interface Response {
    message: string;
    status: number;
}

/**
 * Send a game request to another user
 * @param userId This user's id
 * @param opponentId The id of the user being challenged
 * @param gameType The type of game to initiate
 * @param token This user's token
 */
const sendGameRequest = async (
    userId: number,
    opponentId: number,
    gameType: string,
    token: string,
): Promise<Response> => {
    const path = `/users/${userId}/games`;
    const body = {
        game_type: gameType,
        opponent_id: opponentId,
    };

    return await new ApiRequest(path).withMethod(HTTPMethod.POST).withToken(token).withBody(body).send<Response>();
};

export default sendGameRequest;

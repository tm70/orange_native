import ApiRequest from './ApiRequest';

/**
 * All possible states that a game can be in
 */
export type GameState = 'Finished' | 'InProgress' | 'RequestSent' | 'RequestReceived' | 'Cancelled';

/**
 * A game request between this user and another
 * @property {string} game_type - What game is being played/requested
 * @property {number} id - The game id
 * @property {number} opponent_id - The opponent's user id
 * @property {string} status - The status of the game
 */
export interface GameRequest {
    game_type: string;
    id: number;
    opponent_id: number;
    status: GameState;
}

/**
 * The response from the backend
 */
interface Response {
    status: number;
    games: GameRequest[];
}

/**
 * Gets all game requests involving this user
 * @param {number} id - This user's id
 * @param {string} token - This user's token
 * @return {Promise<GameRequest[]>} Promise of all this user's game requests
 */
const getGames = async (id: number, token: string): Promise<GameRequest[]> => {
    const response = await new ApiRequest(`/users/${id}/games`).withToken(token).send<Response>();
    return response.games;
};

export default getGames;

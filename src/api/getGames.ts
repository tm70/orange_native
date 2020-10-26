import {BACKEND_BASE_URL} from "./endpoints";

/**
 * A game request between this user and another
 * @property {string} game_type - What game is being played/requested
 * @property {number} id - The game id
 * @property {number} opponent_id - The opponent's user id
 * @property {string} status - The status of the game request. Possible values are:
 *      "Finished", "InProgress", "RequestSent", "RequestReceived", "Cancelled"
 */
export interface GameRequest {
    game_type: string,
    id: number,
    opponent_id: number,
    status: string,
}

/**
 * Gets all game requests involving this user
 * @param {number} id - This user's id
 * @param {string} token - This user's token
 * @return {Promise<GameRequest[]>} Promise of all this user's game requests
 */
const getGames = async (id: number, token: string): Promise<GameRequest[]> => {
    const url = `${BACKEND_BASE_URL}/users/${id}/games`;
    
    let response = await fetch(url, {
        headers: {Authorization: `Bearer ${token}`},
    });
    
    if (!response.ok) {
        throw new Error('Failed to connect');
    }
    
    return await response.json().then((data) => {
        if (data.status !== 200) {
            throw new Error(data.message)
        }
        return data.games;
    })
};

export default getGames;
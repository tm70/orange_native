import {BACKEND_BASE_URL} from "./endpoints";

export interface Game {
    game_type: string,
    id: number,
    opponent_id: number,
    status: string,
}

const getGames = async (id: number, token: string): Promise<Game[]> => {
    const url = `${BACKEND_BASE_URL}/${id}/games`;
    
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
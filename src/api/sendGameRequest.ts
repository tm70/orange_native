import {BACKEND_BASE_URL} from "./endpoints";

export interface Response {
    message: string,
    status: number,
}

const sendGameRequest = async (userid: number, oppid: number, game: string, token: string): Promise<Response> => {
    const url = `${BACKEND_BASE_URL}/users/${userid}/games`;
    
    let response = await fetch(url, {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({'game_type': game, 'opponent_id': oppid}),
    });
    console.log("Send game request", response);
    
    if (!response.ok) {
        throw new Error('Failed to connect');
    }
    
    return await response.json().then((data) => {
        if (data.status !== 200) {
            throw new Error(data)
        }
        return data;
    })
};

export default sendGameRequest;
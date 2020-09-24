import {BACKEND_BASE_URL} from "./endpoints";

export interface Response {
    message: string,
    status: number,
}

const sendGameRequest = async (id: number, oppid: number, game: string, token: string): Promise<Response> => {
    const url = `${BACKEND_BASE_URL}/users/${id}/games`;
    
    let response = await fetch(url, {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`},
        body: {"game_type": {game}, "opponent_id": {oppid}},
    });
    
    console.log(response)
    
    if (!response.ok) {
        throw new Error('Failed to connect');
    }
    
    return await response.json().then((data) => {
        console.log("a")
        if (data.status !== 200) {
            throw new Error(data)
        }
        return data;
    })
};

export default sendGameRequest;
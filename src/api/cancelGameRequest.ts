import {BACKEND_BASE_URL} from "./endpoints";

export interface Response {
    message: string,
    status: number,
}

const deleteGameRequest = async (id: number, gameid: number, token: string): Promise<Response> => {
    const url = `${BACKEND_BASE_URL}/users/${id}/games/${gameid}`;
    
    let response = await fetch(url, {
        method: 'DELETE',
        headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    });
    
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

export default deleteGameRequest;
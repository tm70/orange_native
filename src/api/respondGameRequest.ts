import {BACKEND_BASE_URL} from "./endpoints";

export interface Response {
    message: string,
    status: number,
}

// action = 'Accept' or 'Decline'
const respondGameRequest = async (id: number, gameid: number, action: string, token: string): Promise<Response> => {
    const url = `${BACKEND_BASE_URL}/${id}/games/${gameid}`;
    
    let response = await fetch(url, {
        method: 'PATCH',
        headers: {Authorization: `Bearer ${token}`},
        body: action,
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

export default respondGameRequest;
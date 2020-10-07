import {BACKEND_BASE_URL} from "./endpoints";

export interface Relationship {
    user_first_id: number,
    user_second_id: number,
    relationship: string
}

const setRelationships = async (userid: number, id:number, token: string): Promise<Relationship[]> => {
    const url = `${BACKEND_BASE_URL}/users/${userid}/relationships/${id}`;

    let response = await fetch(url, {
        method: 'PUT',
        headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json',},
        body: JSON.stringify("SendFriendRequest"),
    });
    console.log("Send friend request", response)
    
    if (!response.ok) {
        throw new Error('Failed to connect');
    }

    return await response.json().then((data) => {
        if (data.status !== 200) {
            throw new Error(data.message)
        }
        return data.relationships;
    })
};

export default setRelationships;
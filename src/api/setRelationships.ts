import {BACKEND_BASE_URL} from "./endpoints";

export interface Relationship {
    user_first_id: number,
    user_second_id: number,
    relationship: string
}

const setRelationships = async (userid: number, id:number, token: string): Promise<Relationship[]> => {
    const url = `${BACKEND_BASE_URL}/api/v1/${userid}/relationships/${id}`;

    let response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(SendFriendRequest),
        headers: {Authorization: `Bearer ${token}`},
    });

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
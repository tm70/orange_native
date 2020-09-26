import { BACKEND_BASE_URL } from './endpoints';

export interface Relationship {
    user_first_id: number;
    user_second_id: number;
    relationship: string;
}

const getRelationships = async (
    id: number,
    token: string,
): Promise<Relationship[]> => {
    const url = `${BACKEND_BASE_URL}/${id}/relationships`;

    let response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error('Failed to connect');
    }

    return await response.json().then((data) => {
        if (data.status !== 200) {
            throw new Error(data.message);
        }
        return data.relationships;
    });
};

export default getRelationships;

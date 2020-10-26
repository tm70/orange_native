import { BACKEND_BASE_URL } from './endpoints';

/**
 * A relationship as represented by the server's raw return data
 * @property {number} user_first_id - The lower of the two ids in the relationship
 * @property {number} user_second_id - The higher of the two ids in the relationship
 * @property {string} relationship - The relationship status between the two users. Possible
 *      values are: "PendingFirstSecond", "PendingSecondFirst", "Friends", "BlockFirstSecond",
 *      "BlockSecondFirst", "BlockBoth", "No Relationship".
 */
export interface Relationship {
    user_first_id: number;
    user_second_id: number;
    relationship: string;
}

/**
 * Gets all relationships for this user
 * @param {number} id - This user's id
 * @param {string} token - This user's token
 * @return {Promise<Relationship[]>} Promise of all this user's relationships
 */
const getRelationships = async (id: number, token: string): Promise<Relationship[]> => {
    const url = `${BACKEND_BASE_URL}/users/${id}/relationships`;
    
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

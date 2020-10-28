import ApiRequest from './ApiRequest';

/**
 * All possible relationship types that may exist between users
 */
export type RelationshipType =
    | 'PendingFirstSecond'
    | 'PendingSecondFirst'
    | 'Friends'
    | 'BlockFirstSecond'
    | 'BlockSecondFirst'
    | 'BlockBoth'
    | 'No Relationship';

/**
 * A relationship as represented by the server's raw return data
 * @property {number} user_first_id - The lower of the two ids in the relationship
 * @property {number} user_second_id - The higher of the two ids in the relationship
 * @property {string} relationship - The relationship status between the two users.
 */
export interface Relationship {
    user_first_id: number;
    user_second_id: number;
    relationship: RelationshipType;
}

/**
 * The response from the server
 */
interface Response {
    status: number;
    relationships: Relationship[];
}

/**
 * Gets all relationships for this user
 * @param {number} id - This user's id
 * @param {string} token - This user's token
 * @return {Promise<Relationship[]>} Promise of all this user's relationships
 */
const getRelationships = async (id: number, token: string): Promise<Relationship[]> => {
    const response = await new ApiRequest(`/users/${id}/relationships`).withToken(token).send<Response>();
    return response.relationships;
};

export default getRelationships;

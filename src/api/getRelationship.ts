import { RelationshipType } from './getRelationships';
import ApiRequest, { HTTPMethod } from './ApiRequest';

/**
 * A relationship between two users
 * @property user_first_id - The lower of the two user ids in the relationship
 * @property user_second_id - The higher of the two user ids in the relationship
 * @property relationship - The type of relationship
 */
export interface Relationship {
    user_first_id: number;
    user_second_id: number;
    relationship: RelationshipType;
}

/**
 * The possible actions that can be taken by a user to alter a relationship status
 */
export enum FriendRequestAction {
    SendFriendRequest = 'SendFriendRequest',
    CancelFriendRequest = 'CancelFriendRequest',
    Block = 'Block',
    RemoveBlock = 'RemoveBlock',
}

/**
 * The response from the server
 * @property relationship - The new state of the relationship
 */
interface Response {
    status: number;
    relationship: RelationshipType;
}

/**
 * Get the relationship between users
 * @param fromUser This user
 * @param toUser The user that is being targeted
 * @param token The API token of this user
 */
const getRelationship = async (
    fromUser: number,
    toUser: number,
    token: string,
): Promise<string> => {
    const path = `/users/${fromUser}/relationships/${toUser}`;
    const response = await new ApiRequest(path).withToken(token).send<Response>();
    console.log(response);
    return response.relationship;
};

export default getRelationship;

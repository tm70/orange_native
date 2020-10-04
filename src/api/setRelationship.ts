import { BACKEND_BASE_URL } from './endpoints';

export interface Relationship {
    user_first_id: number;
    user_second_id: number;
    relationship: string;
}

export enum FriendRequestAction {
    SendFriendRequest = 'SendFriendRequest',
    CancelFriendRequest = 'CancelFriendRequest',
    Block = 'Block',
    RemoveBlock = 'RemoveBlock',
}

const setRelationship = async (
    fromUser: number,
    toUser: number,
    token: string,
    action: FriendRequestAction,
): Promise<Relationship[]> => {
    const url = `${BACKEND_BASE_URL}/users/${fromUser}/relationships/${toUser}`;

    let response = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.toString()),
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

export default setRelationship;

import {BACKEND_BASE_URL} from './endpoints';

export interface SearchedUser {
    id: number;
    firstname: string;
    surname: string;
}

// Get the list of users from the api
const getUsersSearch = async (
    query: string,
    limit: number = 20,
    token: string,
): Promise<SearchedUser[]> => {
    const url = `${BACKEND_BASE_URL}/users/search?query=${query}&limit=${limit}`;

    // Make the request with the token
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

        return data.results;
    });
};

export default getUsersSearch;

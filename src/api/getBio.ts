import { BACKEND_BASE_URL } from './endpoints';

/**
 * A user's bio
 * @property {number} id - user id
 * @property {string} bio - bio string
 * @property {string} country - country
 * @property {string} firstname - first name
 * @property {string[]} hobbies - list of hobbies
 * @property {string} surname - surname
 * @property {string | null} image_url - profile picture url
 */
export interface Bio {
    id: number;
    bio: string;
    country: string;
    firstname: string;
    hobbies: string[];
    surname: string;
    image_url: string | null;
}

const getBio = async (id: number, token: string): Promise<Bio> => {
    const url = `${BACKEND_BASE_URL}/users/${id}`;

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

        return data.info;
    });
};

export default getBio;

import {BACKEND_BASE_URL} from "./endpoints";

interface Bio {
    id: number,
    bio: string,
    country: string,
    firstname: string,
    hibbies: string[],
    surname: string
}

const getBio = async (
        query: string,
        token: string,
    ): Promise<Bio[]> => {
    const url = `${BACKEND_BASE_URL}/users/<user_id>`;

    let response = await fetch(url, {
        headers: {Authorization: `Bearer ${token}`},
    });

    if (!response.ok) {
        throw new Error('Failed to connect');
    }

    return await response
        .json()
        .then((data) => {
            if (data.status !== 200) {
                throw new Error(data.message)
            }
            return data.info;
        })
};

export default getBio;
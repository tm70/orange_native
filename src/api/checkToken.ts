import { BACKEND_BASE_URL } from './endpoints';

export interface TokenCheck {
    email: string;
    id: number;
}

const checkToken = async (token: string): Promise<TokenCheck> => {
    const url = `${BACKEND_BASE_URL}/users`;

    let response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error('Failed to check token');
    }

    return await response.json().then((data) => {
        if (data.status !== 200) {
            throw new Error(data.message);
        }

        return data;
    });
};

export default checkToken;

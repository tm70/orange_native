import { BACKEND_BASE_URL } from './endpoints';

export interface LoginParams {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    id: number;
}

const login: (userInfo: LoginParams) => Promise<LoginResponse> = async (
    userInfo,
) => {
    const url = `${BACKEND_BASE_URL}/signin`;

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to connect');
    }

    return await response.json().then((data) => {
        if (data.status !== 200) {
            throw new Error(data.message);
        }

        return data;
    });
};

export default login;

import { BACKEND_BASE_URL } from './endpoints';

export interface SignUpParams {
    email: string;
    firstname: string;
    surname: string;
    country_code: string;
    password: string;
    hobbies: string[];
}

export interface SignUpResponse {
    token: string;
    id: number;
    status: number;
}

const signup: (userInfo: SignUpParams) => Promise<SignUpResponse> = async (
    userInfo,
) => {
    const url = `${BACKEND_BASE_URL}/signup`;

    console.log(JSON.stringify(userInfo));

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

export default signup;

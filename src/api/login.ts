/**
 * Then information sent to the server to login a user
 * @property email - The user's email
 * @property password - The user's password
 */
import ApiRequest, { HTTPMethod } from './ApiRequest';

export interface LoginParams {
    email: string;
    password: string;
}

/**
 * The response the server sends on a successful login
 * @property token - The token the user will use from now on to access the API
 * @property id - The user's id
 */
export interface LoginResponse {
    token: string;
    id: number;
}

/**
 * Log a user in to the backend
 * @param userInfo The login details sent with the request
 */
const login: (userInfo: LoginParams) => Promise<LoginResponse> = async (userInfo) => {
    return await new ApiRequest('/signin').withMethod(HTTPMethod.POST).withBody(userInfo).send<LoginResponse>();
};

export default login;

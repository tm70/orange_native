import ApiRequest, { HTTPMethod } from './ApiRequest';

/**
 * The information required to sign up a new user
 * @property email - The user's email
 * @property firstname - The user's first name
 * @property surname - The user's last name
 * @property country_code - The country code for the country that the user selected
 * @property password - The password that the user set
 * @property hobbies - A list of hobbies that the user selected
 */
export interface SignUpParams {
    email: string;
    firstname: string;
    surname: string;
    country_code: string;
    password: string;
    hobbies: string[];
}

/**
 * The response after successful sign up
 * @property token - The token the user will use for future API requests
 * @property id - The user's id
 */
export interface SignUpResponse {
    token: string;
    id: number;
    status: number;
}

/**
 * Sign up a new user
 * @param userInfo - The user information used to construct their profile etc
 */
const signup: (userInfo: SignUpParams) => Promise<SignUpResponse> = async (userInfo) => {
    return await new ApiRequest('/signup').withMethod(HTTPMethod.POST).withBody(userInfo).send<SignUpResponse>();
};

export default signup;

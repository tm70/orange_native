import ApiRequest from './ApiRequest';

/**
 * The public information associated with a user
 * @property {number} id - Their ID
 * @property {string} bio - Their BIO description
 * @property {string} country - The country where the user lives
 * @property {string} firstname - Their first name
 * @property {string[]} hobbies - Their hobbies
 * @property {string} surname - Their surname
 * @property {string | null} image_url - Profile picture URL
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

/**
 * The response from the server
 */
interface Response {
    status: number;
    info: Bio;
}

/**
 * Gets the bio information of the specified user
 * @param {number} id - The user id for which to get the bio of
 * @param {string} token - This user's token (need to check for blocking relationships)
 * @return {Promise<Bio>} - The users bio information
 */
const getBio = async (id: number, token: string): Promise<Bio> => {
    const response = await new ApiRequest(`/users/${id}`).withToken(token).send<Response>();
    return response.info;
};

export default getBio;

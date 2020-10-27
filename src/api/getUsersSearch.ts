/**
 * The information returned from the backend in a search
 * @property {number} id - The id of the user
 * @property {string} firstname - The user's first name
 * @property {string} surname - The user's last name
 * @property {string | null} - A URL that points to the users profile picture if available
 */
import ApiRequest from './ApiRequest';

export interface SearchedUser {
    id: number;
    firstname: string;
    surname: string;
    image_url: string | null;
}

/**
 * The response from the user
 */
interface Response {
    status: number;
    results: SearchedUser[];
}

/**
 * Get a list of users from the API based on some search query
 * @param query The query to search for (searches through name and email)
 * @param limit The number of results to get (the backend defaults to 20)
 * @param token The requesting user's token (to filter out blocked and blocking users from the user)
 * @returns [The found users, abort trigger]
 */
const getUsersSearch = (query: string, limit: number = 20, token: string): [Promise<SearchedUser[]>, ApiRequest] => {
    const request = new ApiRequest('/users/search');
    const response = request
        .withToken(token)
        .withQuery('query', query)
        .withQuery('limit', limit)
        .sendNoWait<Response>()
        .then((data) => data.results);

    return [response, request];
};

export default getUsersSearch;

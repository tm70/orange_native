// The API backend base url for all requests
export const BACKEND_BASE_URL = 'https://orange-rs.herokuapp.com/api/v1';
// The websocket backend base url for all requests
export const WEBSOCKET_CONNECT = 'https://orange-ws.herokuapp.com/connect';

/**
 * Contains all the HTTP methods in use by the backend servers.
 */
export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

/**
 * The possible headers that can be sent with a request
 */
// interface Headers {
//     Authorization?: string;
//     'Content-Type'?: 'application/json';
// }

/**
 * For constructing and sending API requests to the API backend
 */
export default class ApiRequest {
    private path: string; // The path to be appended to the base url (excluding queries)
    private url: URL; // The full url including search params
    private headers: Headers; // The headers associated with the request
    private method: HTTPMethod; // The HTTP method to use (defaults to GET)
    private body: object | string | null; // The body to send with the request

    /**
     * Construct a new APIRequest with the given path
     * @param path - Appended to the BACKEND_BASE_URL when the request is made (exclude query strings, use withQuery)
     */
    constructor(path: string) {
        this.path = path;
        this.url = new URL(path, BACKEND_BASE_URL);
        this.headers = new Headers();
        this.method = HTTPMethod.GET;
        this.body = null;
    }

    /**
     * Set the HTTP method that will be used to send the request
     * @param method
     */
    withMethod(method: HTTPMethod): ApiRequest {
        this.method = method;
        return this;
    }

    /**
     * Add a token to this api request (required for requests that need authentication)
     */
    withToken(token: string): ApiRequest {
        this.headers.set('Authorization', `Bearer ${token}`);
        return this;
    }

    /**
     * Send a JSON encoded body along with the request
     */
    withBody(body: object | string): ApiRequest {
        this.body = body;
        this.headers.set('Content-Type', 'application/json');
        return this;
    }

    /**
     * Add a query parameter such (e.g. www.example.com/dogs?small=true&age=3&name=benny)
     *
     * @param key - The key for the query parameter
     * @param value - The value for the given key
     */
    withQuery(key: string, value: string | number | boolean): ApiRequest {
        this.url.searchParams.set(key, value.toString());
        return this;
    }

    /**
     * Send the constructed query and get the JSON response from the server
     *
     * @param containsStatus - Almost all the backend API requests contain a status property to indicate result.
     *                               Set to false if the one you are sending does not.
     * @type R - The type of the expected response from the server (in case of success)
     * @throws Error if the server returns an error
     */
    async send<R>(containsStatus: boolean = true): Promise<R> {
        // Make the request
        const response = await fetch(this.url.href, {
            method: this.method,
            headers: this.headers,
            body: this.body === null ? undefined : JSON.stringify(this.body),
        });

        // Check that we got a response
        if (!response.ok) {
            throw new Error('Server responded with: ' + response.status);
        }

        // Convert the response to JSON
        let data;
        try {
            data = await response.json();
        } catch {
            throw new Error('Problem converting the response to JSON');
        }

        // Check the result from the server
        if (containsStatus && data.status !== 200) {
            throw new Error(data.message);
        }

        // Everything is good, return the result
        return data;
    }
}

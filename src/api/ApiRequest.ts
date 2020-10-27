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
 * For constructing and sending API requests to the API backend
 */
export default class ApiRequest {
    private path: string; // The path to be appended to the base url (excluding queries)
    private url: URL; // The full url including search params
    private readonly headers: Headers; // The headers associated with the request
    private method: HTTPMethod; // The HTTP method to use (defaults to GET)
    private body: object | string | null; // The body to send with the request
    private params: { [key: string]: string }; // The query parameters
    private abortController: AbortController | null; // Used to abort fetch request before completion

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
        this.params = {};
        this.abortController = null;
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
        this.params[key] = value.toString();
        return this;
    }

    /**
     * Used to abort the request before it is complete
     */
    abort() {
        if (this.abortController !== null && !this.abortController.signal.aborted) {
            this.abortController.abort();
        }
    }

    /**
     * Get the url by adding query parameters if required
     */
    private getUrl(): string {
        // Build the query parameters (hacky but url.searchParams doesn't work in React Native)
        let url = this.url.href;
        let searchParams = '?';

        for (const key in this.params) {
            searchParams += key + '=' + this.params[key] + '&';
        }

        if (searchParams.length > 1) {
            searchParams = searchParams.slice(0, -1); // Remove last '&'
            url += searchParams;
        }

        return url;
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
        this.abortController = new AbortController();
        const response = await fetch(this.getUrl(), {
            method: this.method,
            headers: this.headers,
            body: this.body === null ? undefined : JSON.stringify(this.body),
            signal: this.abortController.signal,
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

    sendNoWait<R>(): Promise<R> {
        // Make the request
        this.abortController = new AbortController();
        const request = fetch(this.getUrl(), {
            method: this.method,
            headers: this.headers,
            body: this.body === null ? undefined : JSON.stringify(this.body),
            signal: this.abortController.signal,
        });

        return request.then((response) => {
            // Check that we got a response
            if (!response.ok) {
                throw new Error('Server responded with: ' + response.status);
            }

            // Convert the response to JSON
            return response.json().then((data) => {
                // Check the result from the server
                if (data.status !== 200) {
                    throw new Error(data.message);
                }

                // Everything is good, return the result
                return data;
            });
        });
    }
}

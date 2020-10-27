import React, { useEffect, useRef, useState } from 'react';
import getUserSearch, { SearchedUser } from '../api/getUsersSearch';
import AuthContext from '../context/AuthContext';
import ApiRequest from '../api/ApiRequest';

/**
 * Stores state about the current in progress API search so that it can be aborted before starting the next one
 */
class APISearcher {
    private readonly limit: number;
    private readonly token: string;
    private request: null | ApiRequest;

    /**
     * @param limit The maximum number of users to return
     * @param token The querying users token
     */
    constructor(limit: number, token: string) {
        this.limit = limit;
        this.token = token;
        this.request = null;
    }

    /***
     * Start a new search, aborting the old one if required
     * @param query
     */
    search(query: string): Promise<SearchedUser[]> {
        // Honestly, it works better without aborting unfinished requests
        // Abort the previous search if it exists
        // if (this.request !== null) {
        //     this.request.abort();
        // }

        const [responsePromise, request] = getUserSearch(query, this.limit, this.token);
        this.request = request;
        return responsePromise;
    }
}

/**
 * [Search Function, Results Array, Error Message]
 */
type ReturnType = [(query: string) => void, SearchedUser[], string];

/**
 * Hook to keep the list of searched users updated with each call to the searchAPI function
 * @param limit - The maximum number of users to get
 */
function useUserSearch(limit: number = 40): ReturnType {
    const [users, setUsers] = useState([] as SearchedUser[]);
    const [errorMessage, setErrorMessage] = useState('');
    const searcher = useRef(null as null | APISearcher);

    // Get the user token
    const { token } = React.useContext(AuthContext);

    // Construct the searcher
    useEffect(() => {
        searcher.current = new APISearcher(limit, token);
    }, []);

    const searchAPI = async (query: string) => {
        try {
            searcher.current
                ?.search(query)
                .then(setUsers)
                .catch((err) => {
                    if (err.message !== 'Aborted') {
                        throw err;
                    }
                });
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
        return null;
    };

    useEffect(() => {
        searchAPI('');
    }, []);

    return [searchAPI, users, errorMessage];
}

export default useUserSearch;

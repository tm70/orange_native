import React, { useEffect, useState } from 'react';
import getUserSearch, { SearchedUser } from '../api/getUsersSearch';
import AuthContext from '../context/AuthContext';

const useUserSearch: (
    limit: number,
) => [(query: string) => void, SearchedUser[], string] = (
    limit: number = 20,
) => {
    const [users, setUsers] = useState([] as SearchedUser[]);
    const [errorMessage, setErrorMessage] = useState('');

    // Get the user token
    const { token } = React.useContext(AuthContext);

    const searchAPI = async (query: string) => {
        try {
            const results = await getUserSearch(query, limit, token);
            setUsers(results);
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    };

    useEffect(() => {
        searchAPI('');
    }, []);

    return [searchAPI, users, errorMessage];
};

export default useUserSearch;

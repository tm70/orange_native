import React, { useEffect, useState } from 'react';
import getRelationships, { Relationship } from '../api/getRelationships';
import AuthContext from '../context/AuthContext';

const useGetRelationships: (
    id: number,
) => [() => void, Relationship[], string] = (id: number) => {
    const [relationships, setRelationships] = useState([] as Relationship[]);
    const [errorMessage, setErrorMessage] = useState('');

    // Get the user token
    const { token } = React.useContext(AuthContext);

    const searchAPI = async () => {
        try {
            const results = await getRelationships(id, token);
            setRelationships(results);
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    };

    useEffect(() => {
        searchAPI('');
    }, []);

    return [searchAPI, relationships, errorMessage];
};

export default useGetRelationships;

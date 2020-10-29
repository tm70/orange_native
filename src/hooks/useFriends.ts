import React, { useEffect, useState } from 'react';
import getRelationships from '../api/getRelationships';
import { Bio } from '../api/getBio';
import getBios from '../api/getBios';
import AuthContext from '../context/AuthContext';

/**
 * Gets all friends for this user and returns a list of their bios
 * Returns [bio list, loading, error message]
 */
const useFriends: () => [Bio[], boolean, string] = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState([] as Bio[]);

    // Get the user token
    const { token, id: userid } = React.useContext(AuthContext);

    const trigger = async () => {
        try {
            const relationships = await getRelationships(userid, token);
            const ids = [];

            // Get the friend relationships
            for (const r of relationships) {
                if (r.relationship === 'Friends') {
                    let id = r.user_first_id === userid ? r.user_second_id : r.user_first_id;
                    ids.push(id);
                }
            }

            // Get the bios for the friends
            const bios = await getBios(ids, token);
            const results = [];
            for (const i of ids) {
                results.push(bios[i]);
            }

            // All done
            setFriends(results);
            setLoading(false);
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    };

    useEffect(() => {
        trigger();
    }, []);

    return [friends, loading, errorMessage];
};

export default useFriends;

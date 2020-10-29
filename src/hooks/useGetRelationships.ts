import React, { useEffect, useState } from 'react';
import getRelationships from '../api/getRelationships';
import { Bio } from '../api/getBio';
import getBio from '../api/getBio';
import AuthContext from '../context/AuthContext';

/**
 * An easier to work with representation for a relationship, with all information
 * about the other user contained within.
 * @property {Bio} bio - The full bio of the user
 * @property {string} relationship - The relationship status with the other user. Possible
 *      values are: "Request Sent", "Request Received", "Friends"
 */
export interface Relation {
    bio: Bio;
    relationship: string;
}

/**
 * Gets all relationships for this user and returns them in a more useable format
 * @returns [reload trigger, relations, error message]
 */
const useGetRelationships: () => [() => void, Relation[], string] = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [relations, setRelations] = useState([] as Relation[]);

    // Get the user token
    const { token, id: userid } = React.useContext(AuthContext);

    const trigger = async () => {
        try {
            const relationships = await getRelationships(userid, token);
            const results = [];

            const promises = [];
            for (const r of relationships) {
                // check if blocked
                if (['BlockFirstSecond', 'BlockSecondFirst', 'BlockBoth'].includes(r.relationship)) {
                    continue;
                }

                // Convert the relationship to a more user friendly word
                if (r.relationship == 'PendingFirstSecond') {
                    if (userid == r.user_first_id) {
                        r.relationship = 'Request Sent';
                    } else {
                        r.relationship = 'Request Received';
                    }
                } else if (r.relationship == 'PendingSecondFirst') {
                    if (userid == r.user_second_id) {
                        r.relationship = 'Request Sent';
                    } else {
                        r.relationship = 'Request Received';
                    }
                }

                // Get the bio for this user and add to results
                const id = r.user_first_id === userid ? r.user_second_id : r.user_first_id;
                const p = getBio(id, token).then((b) => {
                    results.push({ bio: b, relationship: r.relationship });
                });
                promises.push(p);
            }

            // Wait for all the promises to resolve
            await Promise.all(promises);

            setRelations(results);
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    };

    useEffect(() => {
        trigger();
    }, []);

    return [trigger, relations, errorMessage];
};

export default useGetRelationships;

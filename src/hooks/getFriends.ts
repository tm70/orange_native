import React, {useEffect, useState} from 'react';
import getRelationships from '../api/getRelationships';
import getBios, {Bio} from '../api/getBios';
import AuthContext from '../context/AuthContext';

/**
 * Gets all friends for this user and returns a list of their bios
 */
const getFriends: () => [() => void, Bio[], string] = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [friends, setFriends] = useState([] as Bio[]);

    // Get the user token
    const { token, id: userid } = React.useContext(AuthContext);

    const searchAPI = async () => {
        try {
            const relationships = await getRelationships(userid, token);
            const ids = [];
            //console.log("rels", relationships);

            for (r of relationships) {
                //console.log("r", r);
                if (r.relationship == 'Friends') {
                    let id = r.user_first_id == userid ? r.user_second_id : r.user_first_id;
                    ids.push(id);
                }
            }

            const bios = await getBios(ids, token);
            const results = [];
            for (i of ids) {
                results.push(bios[i]);
            }
            setFriends(results);
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    };

    useEffect(() => {
        searchAPI('');
    }, []);

    return [searchAPI, friends, errorMessage];
};

export default getFriends;

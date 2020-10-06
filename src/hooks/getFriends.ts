import React, {useEffect, useState} from 'react';
import getRelationships, {Relationship} from '../api/getRelationships';
import getBio, {Bio} from '../api/GetBio';
import AuthContext from '../context/AuthContext';

const getFriends: (userid: number) => [() => void, Bio[], string] = (id: number) => {
    const [relationships, setRelationships] = useState([] as Relationship[]);
    const [errorMessage, setErrorMessage] = useState('');

    // Get the user token
    const {token} = React.useContext(AuthContext);

    const searchAPI = async () => {
        try {
            const results = await getRelationships(userid, token);
            setRelationships(results);
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    };

    useEffect(() => {
        searchAPI('');
    }, []);
    
    const friends = [];
    
    for (r in relationships) {
        if (r.relationship == "Friends") {
            let bio = await ((r.user_first_id == userid) ? getBio(r.user_second_id, token) : getBio(r.user_first_id, token));
            
            friends.push(bio);
        }
    }

    return [searchAPI, friends, errorMessage];
};

export default getFriends;

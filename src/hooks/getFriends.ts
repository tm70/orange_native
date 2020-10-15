import React, {useEffect, useState} from 'react';
import getRelationships, {Relationship} from '../api/getRelationships';
import getBios, {Bio} from '../api/getBios';
import AuthContext from '../context/AuthContext';

const getFriends: () => [() => void, Bio[], string] = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [friends, setFriends] = useState([] as Bio[]);

    // Get the user token
    const {token, id: userid} = React.useContext(AuthContext);

    const searchAPI = async () => {
        try {
            const relationships = await getRelationships(userid, token);
            const ids = [];
            //console.log("rels", relationships);
            
            for (r of relationships) {
                //console.log("r", r);
                //if (r.relationship == "Friends") {
                    let id = (r.user_first_id == userid) ? r.user_second_id : r.user_first_id;
                    ids.push(id);
                //}
            }
            
            const results = await getBios(ids, token);
            //console.log("friends", results);
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

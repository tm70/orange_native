import React, {useEffect, useState} from 'react';
import getRelationships, {Relationship} from '../api/getRelationships';
//import getBio, {Bio} from '../api/GetBio';
import getBios, {Bio} from '../api/getBios';
import AuthContext from '../context/AuthContext';

const getFriends: (userid: number) => [() => void, Bio[], string] = (userid: number) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [friends, setFriends] = useState([] as Bio[]);

    // Get the user token
    const {token} = React.useContext(AuthContext);

    const searchAPI = async () => {
        try {
            const relationships = await getRelationships(userid, token);
            console.log("rels", relationships);
            const ids = [];
            for (r of relationships) {
                console.log("r", r);
                //if (r.relationship == "Friends") {
                    let id = (r.user_first_id == userid) ? r.user_second_id : r.user_first_id;
                    ids.push(id);
                //}
            }
            console.log(ids);
            const results = await getBios(ids, token);
            console.log("bbb", results);
            setFriends(results);
            
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    };
    
    useEffect(() => {
        searchAPI('');
    }, []);
    
    console.log(friends);

    return [searchAPI, friends, errorMessage];
};

export default getFriends;

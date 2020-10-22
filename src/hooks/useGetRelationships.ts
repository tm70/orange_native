import React, {useEffect, useState} from 'react';
import getRelationships, {Relationship} from '../api/getRelationships';
import getBios, {Bio} from '../api/getBios';
import AuthContext from '../context/AuthContext';

export interface Relation {
    bio: Bio;
    relationship: string;
}

const getFriends: () => [() => void, Relation[], string] = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [relations, setRelations] = useState([] as Relation[]);

    // Get the user token
    const {token, id:userid} = React.useContext(AuthContext);

    const searchAPI = async () => {
        try {
            const relationships = await getRelationships(userid, token);
            const ids = [];
            
            for (r of relationships) {
                // check if blocked
                if (["BlockFirstSecond", "BlockSecondFirst", "BlockBoth"].includes(r.relationship)){
                    continue;
                }
                let id = (r.user_first_id == userid) ? r.user_second_id : r.user_first_id;
                
                ids.push(id);
                
                // make pending relationships more understandable
                if (r.relationship == "PendingFirstSecond") {
                    if (userid == r.user_first_id) {
                        r.relationship = "Request Sent";
                    } else {
                        r.relationship = "Request Received";
                    }
                } else if (r.relationship == "PendingSecondFirst") {
                    if (userid == r.user_second_id) {
                        r.relationship = "Request Sent";
                    } else {
                        r.relationship = "Request Received";
                    }
                }
            }
            
            const bios = await getBios(ids, token);
            
            const results = [];
            for (i in ids) {
                results.push({bio:bios[ids[i]], relationship:relationships[i].relationship});
            }
            
            setRelations(results);
            
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    };
    
    useEffect(() => {
        searchAPI('');
    }, []);
    
    return [searchAPI, relations, errorMessage];
};

export default getFriends;

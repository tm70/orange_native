import React, {useEffect, useState} from 'react';
import getGames, {GameRequest} from '../api/getGames';
import getBios, {Bio} from '../api/getBios';
import AuthContext from '../context/AuthContext';

const useGetGames: () => [() => void, Bio[], string] = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [games, setGames] = useState([] as GameRequest[]);
    const [bios, setBios] = useState({});

    // Get the user token
    const {token, id:userid} = React.useContext(AuthContext);

    const searchAPI = async () => {
        try {
            const requests = await getGames(userid, token);
            
            const ids = [];
            for (r of requests) {
                ids.push(r.opponent_id);
            }
            const b = await getBios(ids, token);
            
            // set bios before games to guarentee that it is non-empty whenever games is
            setBios(b);
            setGames(requests);
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    };
    
    useEffect(() => {
        searchAPI('');
    }, []);
    
    return [searchAPI, games, bios, errorMessage];
};

export default useGetGames;

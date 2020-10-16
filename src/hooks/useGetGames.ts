import React, {useEffect, useState} from 'react';
import getGames, {GameRequest} from '../api/getGames';
import getBios, {Bio} from '../api/getBios';
import AuthContext from '../context/AuthContext';

export interface Game {
    game: string,
    id: number,
    opponent_id: number,
    opponent_name: string,
    status: string,
}

const useGetGames: () => [() => void, Bio[], string] = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [games, setGames] = useState([] as Game[]);

    // Get the user token
    const {token, id:userid} = React.useContext(AuthContext);

    const searchAPI = async () => {
        try {
            const requests = await getGames(userid, token);
            
            const ids = [];
            for (r of requests) {
                ids.push(r.opponent_id);
            }
            
            const bios = await getBios(ids, token);
            for (i in bios) {
                requests[i].opponent_name = bios[i].firstname;
            }
            
            setGames(requests);
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    };
    
    useEffect(() => {
        searchAPI('');
    }, []);
    
    return [searchAPI, games, errorMessage];
};

export default useGetGames;

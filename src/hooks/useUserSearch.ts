import {useEffect, useState} from 'react';
import getUserSearch, {SearchedUser} from '../api/getUsersSearch';

const useUserSearch: (
  limit: number,
) => [(query: string) => void, SearchedUser[], string] = (
  limit: number = 20,
) => {
  const [users, setUsers] = useState([] as SearchedUser[]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchAPI = async (query: string) => {
    try {
      const results = await getUserSearch(query, limit);
      setUsers(results);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    searchAPI('');
  }, []);

  return [searchAPI, users, errorMessage];
};

export default useUserSearch;

import {BACKEND_BASE_URL} from './endpoints';

export interface SearchedUser {
  id: number;
  firstname: string;
  surname: string;
}

// Get the list of countries from the api
const getUsersSearch: (
  query: string,
  limit: number,
) => Promise<SearchedUser[]> = async (query, limit = 20) => {
  const url = `${BACKEND_BASE_URL}/users/search?query=${query}&limit=${limit}`;

  let response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to connect');
  }

  return await response.json().then((data) => {
    if (data.status !== 200) {
      throw new Error(data.message);
    }

    return data.results;
  });
};

export default getUsersSearch;

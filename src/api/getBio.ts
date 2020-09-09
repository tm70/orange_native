import {BACKEND_BASE_URL} from './endpoints';

export interface BioData {
  id: number;
  bio: string;
  country: string;
  firstname: string;
  hobbies: string[];
  surname: string;
}

const getBio = async (id: number, token: string): Promise<BioData> => {
  const url = `${BACKEND_BASE_URL}/users/${id}`;

  let response = await fetch(url, {
    headers: {Authorization: `Bearer ${token}`},
  });

  if (!response.ok) {
    throw new Error('Failed to connect');
  }

  return await response.json().then((data) => {
    if (data.status !== 200) {
      throw new Error(data.message);
    }
    return data.info;
  });
};

export default getBio;

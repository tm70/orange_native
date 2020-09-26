import {BACKEND_BASE_URL} from './endpoints';

interface Country {
    id: number;
    code: string;
    name: string;
}

// Get the list of countries from the api
const getCountries: () => Promise<Country[]> = async () => {
    const url = `${BACKEND_BASE_URL}/countries`;

    let response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to connect');
    }

    return await response.json().then((data) => {
        if (data.status !== 200) {
            throw new Error(data.message);
        }

        return data.countries;
    });
};

export default getCountries;

import {BACKEND_BASE_URL} from "./endpoints";

export interface Bio {
    id: number,
    bio: string,
    country: string,
    firstname: string,
    hobbies: string[],
    surname: string
}

const getBios = async (ids: number[], token: string): Promise<Bio[]> => {
    const bios = [];
    
    for (id of ids) {
        let url = `${BACKEND_BASE_URL}/users/${id}`;

        let response = await fetch(url, {
            headers: {Authorization: `Bearer ${token}`},
        });

        if (!response.ok) {
            throw new Error('Failed to connect');
        }
        
        let js = await response.json();
        //console.log(js);
        bios.push(js.info);
    }
    
    return bios;
};

export default getBios;
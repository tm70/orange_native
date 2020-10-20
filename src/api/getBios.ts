import { BACKEND_BASE_URL } from "./endpoints";
import {Bio} from "./getBio";

const getBios = async (ids: number[], token: string): Promise<Bio[]> => {
    const bios = {};
    
    for (id of ids) {
        if (id in bios) {
            continue;
        }
        
        let url = `${BACKEND_BASE_URL}/users/${id}`;

        let response = await fetch(url, {
            headers: {Authorization: `Bearer ${token}`},
        });

        if (!response.ok) {
            throw new Error('Failed to connect');
        }
        
        let js = await response.json();
        //console.log(js);
        bios[id] = js.info;
    }
    
    return bios;
};

export default getBios;
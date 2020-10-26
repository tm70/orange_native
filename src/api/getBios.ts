import { BACKEND_BASE_URL } from "./endpoints";
import {Bio} from "./getBio";

/**
 * Gets the bios for a list of user ids
 * @param {number[]} ids - The list of ids for which to get bios for
 * @param {string} token - This user's token
 * @return {Promise<Bio[]>} Promise of the list of bios
 */
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
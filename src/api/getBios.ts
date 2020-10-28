import getBio, { Bio } from './getBio';

/**
 * Gets the bios for a list of user ids
 * @param {number[]} ids - The list of ids for which to get bios for
 * @param {string} token - This user's token
 * @return {{ [key: number]: Bio }} Promise of the list of bios
 */
const getBios = async (ids: number[], token: string): Promise<{ [key: number]: Bio }> => {
    const bios = {} as { [key: number]: Bio };

    for (const id of ids) {
        if (id in bios) {
            continue;
        }

        bios[id] = await getBio(id, token);
    }

    return bios;
};

export default getBios;

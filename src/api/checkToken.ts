import ApiRequest from './ApiRequest';

export interface TokenCheck {
    email: string;
    id: number;
}

const checkToken = async (token: string): Promise<TokenCheck> => {
    return await new ApiRequest('/users').withToken(token).send<TokenCheck>();
};

export default checkToken;

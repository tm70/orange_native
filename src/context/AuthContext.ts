import React from 'react';
import signup, { SignUpParams } from '../api/signup';
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import login, { LoginParams } from '../api/login';

interface ContextData {
    token: string;
    id: number;
    signUp: (userInfo: SignUpParams) => Promise<void>;
    login: (userInfo: LoginParams) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = React.createContext({ token: '', id: -1 } as ContextData);

interface State {
    token: string;
    id: number;
}

type Action =
    | { type: 'RESTORE_TOKEN'; token: string; id: number }
    | { type: 'SIGN_UP'; token: string; id: number }
    | { type: 'LOGIN'; token: string; id: number }
    | { type: 'CLEAR_TOKEN' };

const updateToken = (
    dispatch: React.Dispatch<Action>,
    type: 'RESTORE_TOKEN' | 'SIGN_UP' | 'LOGIN',
    token: string,
    id: number,
) => {
    dispatch({
        type,
        token: token,
        id: id,
    });
    RNSecureKeyStore.set('orange_user_token', token, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
    RNSecureKeyStore.set('orange_user_id', id.toString(), {
        accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
};

export const useAuth = () => {
    const [state, dispatch] = React.useReducer(
        (prevState: State, action: Action): State => {
            switch (action.type) {
                case 'RESTORE_TOKEN': {
                    return {
                        token: action.token,
                        id: action.id,
                    };
                }
                case 'SIGN_UP': {
                    return {
                        token: action.token,
                        id: action.id,
                    };
                }
                case 'CLEAR_TOKEN':
                    return {
                        token: '',
                        id: -1,
                    };
                case 'LOGIN':
                    return {
                        token: action.token,
                        id: action.id,
                    };
                default:
                    return prevState;
            }
        },
        {
            token: '',
            id: -1,
        },
    );

    const actions = React.useMemo(
        () => ({
            signUp: async (userInfo: SignUpParams) => {
                signup(userInfo)
                    .then((response) => {
                        // Store the token and id
                        updateToken(
                            dispatch,
                            'SIGN_UP',
                            response.token,
                            response.id,
                        );
                    })
                    .catch((err) => {
                        // TODO: Sign up failed we should display an error
                        console.log(err.toString());
                    });
            },
            logout: async () => {
                await RNSecureKeyStore.remove('orange_user_token');
                await RNSecureKeyStore.remove('orange_user_id');
                dispatch({ type: 'CLEAR_TOKEN' });
            },
            login: async (userInfo: LoginParams) => {
                login(userInfo)
                    .then((response) => {
                        updateToken(
                            dispatch,
                            'LOGIN',
                            response.token,
                            response.id,
                        );
                    })
                    .catch((err) => {
                        // TODO: Login failed we should display an error
                        console.log(err.toString());
                    });
            },
        }),
        [],
    );

    return { state, dispatch, actions };
};

export default AuthContext;

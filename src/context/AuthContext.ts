import React from 'react';
import signup, {SignUpParams} from '../api/signup';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';

interface ContextData {
    token: string;
    id: number;
    signUp: (userInfo: SignUpParams) => Promise<void>;
}

const AuthContext = React.createContext({ token: '', id: -1 } as ContextData);

interface State {
    token: string;
    id: number;
}

type Action =
    | { type: 'RESTORE_TOKEN'; token: string; id: number }
    | { type: 'SIGN_UP'; token: string; id: number };

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
                        dispatch({
                            type: 'SIGN_UP',
                            token: response.token,
                            id: response.id,
                        });
                        RNSecureKeyStore.set(
                            'orange_user_token',
                            response.token,
                            {
                                accessible:
                                    ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
                            },
                        );
                        RNSecureKeyStore.set(
                            'orange_user_id',
                            response.id.toString(),
                            {
                                accessible:
                                    ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
                            },
                        );
                    })
                    .catch((err) => {
                        console.log(err.toString());
                        // TODO: Sign up failed we should display an error
                    });
            },
        }),
        [],
    );

    return { state, dispatch, actions };
};

export default AuthContext;

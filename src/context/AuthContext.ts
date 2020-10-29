import React from 'react';
import signup, { SignUpParams } from '../api/signup';
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import login, { LoginParams } from '../api/login';

/**
 * The information stored in this context and thus available to all screens
 *
 * @property token - This users API token or '' if no user is logged in
 * @property id - This users id number
 * @property signUp - A function that will sign up a new user and update the context to match
 * @property login - A function that will log in a user and update the context to match
 * @property logout - A function that will log out a user and update the context to match
 */
interface ContextData {
    token: string;
    id: number;
    signUp: (userInfo: SignUpParams) => Promise<void>;
    login: (userInfo: LoginParams) => Promise<void>;
    logout: () => Promise<void>;
}

// Create the context itself with defaults representing no user logged in
const AuthContext = React.createContext({ token: '', id: -1 } as ContextData);

/**
 * Represents the current state of the Auth system
 *
 * @property token - The API token of the logged in user else ''
 * @property id - The id of the currently logged in user else -1
 */
interface State {
    token: string;
    id: number;
}

/**
 * Possible payloads that can be dispatched to update the context state
 */
type Action =
    | { type: 'RESTORE_TOKEN'; token: string; id: number }
    | { type: 'SIGN_UP'; token: string; id: number }
    | { type: 'LOGIN'; token: string; id: number }
    | { type: 'CLEAR_TOKEN' };

/**
 * Update the token and store in locally to keep the user logged in beyond this session
 * @param dispatch - the dispatch function to trigger the AuthContext update
 * @param type - The type of update to perform
 * @param token - The new token
 * @param id - The new id
 */
const updateToken = (
    dispatch: React.Dispatch<Action>,
    type: 'RESTORE_TOKEN' | 'SIGN_UP' | 'LOGIN',
    token: string,
    id: number,
) => {
    // Dispatch to update the AuthContext
    dispatch({
        type,
        token: token,
        id: id,
    });

    // Securely store the token and id on the device
    RNSecureKeyStore.set('orange_user_token', token, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
    RNSecureKeyStore.set('orange_user_id', id.toString(), {
        accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
};

/**
 * A hook used to initialise the AuthContext when the app starts
 */
export const useAuth = () => {
    // Create a reducer to handle the state updates
    const [state, dispatch] = React.useReducer(
        (prevState: State, action: Action): State => {
            // Perform the correct action depending on the type of action
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

    // Initialise the functions used to change the AuthContext state from other screens
    const actions = React.useMemo(
        () => ({
            signUp: async (userInfo: SignUpParams) => {
                // Send to server then update the context
                signup(userInfo)
                    .then((response) => {
                        // Store the token and id
                        updateToken(dispatch, 'SIGN_UP', response.token, response.id);
                    })
                    .catch((err) => {
                        console.log(err.toString());
                    });
            },
            logout: async () => {
                // Just clear the token data locally and then update the context to match
                await RNSecureKeyStore.remove('orange_user_token');
                await RNSecureKeyStore.remove('orange_user_id');
                dispatch({ type: 'CLEAR_TOKEN' });
            },
            login: async (userInfo: LoginParams) => {
                // Send to server then update the context on success
                login(userInfo)
                    .then((response) => {
                        updateToken(dispatch, 'LOGIN', response.token, response.id);
                    })
                    .catch((err) => {
                        console.log('Login Error ' + err.toString());
                    });
            },
        }),
        [],
    );

    return { state, dispatch, actions };
};

export default AuthContext;

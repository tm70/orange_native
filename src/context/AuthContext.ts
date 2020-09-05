import React from 'react';
import signup, {SignUpParams} from '../api/signup';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';

interface ContextData {
  token: string | null;
  signUp: (userInfo: SignUpParams) => Promise<void>;
}

const AuthContext = React.createContext({token: null} as ContextData);

interface State {
  token: string | null;
}

type Action =
  | {type: 'RESTORE_TOKEN'; token: string}
  | {type: 'SIGN_UP'; token: string};

export const useAuth = () => {
  const [state, dispatch] = React.useReducer(
    (prevState: State, action: Action): State => {
      switch (action.type) {
        case 'RESTORE_TOKEN': {
          return {
            token: action.token,
          };
        }
        case 'SIGN_UP': {
          return {
            token: action.token,
          };
        }
        default:
          return prevState;
      }
    },
    {
      token: null,
    },
  );

  const actions = React.useMemo(
    () => ({
      signUp: async (userInfo: SignUpParams) => {
        signup(userInfo)
          .then((token) => {
            // Store the token
            dispatch({type: 'SIGN_UP', token});
            RNSecureKeyStore.set('orange_user_token', token, {
              accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
            });
          })
          .catch((err) => {
            console.log(err.toString());
            // TODO: Sign up failed we should display an error
          });
      },
    }),
    [],
  );

  return {state, dispatch, actions};
};

export default AuthContext;

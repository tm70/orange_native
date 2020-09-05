import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from './src/screens/WelcomeScreen';
import NameScreen from './src/screens/signup/NameScreen';
import CountryScreen from './src/screens/signup/CountryScreen';
import SignUpCompleteScreen from './src/screens/signup/SignUpCompleteScreen';
import {SignUpParams} from './src/api/signup';
import AuthContext, {useAuth} from './src/context/AuthContext';
import RNSecureKeyStore from 'react-native-secure-key-store';
import PasswordScreen from './src/screens/signup/PasswordScreen';

import FriendFindScreen from './src/screens/FriendFindScreen';

import GameList from './src/screens/GameList';
import Chess from './src/screens/Chess';
import TicTacToe from './src/screens/TicTacToe';
import VideoChat from "./src/screens/VideoChat";

const Stack = createStackNavigator();

// These are used whenever when we need to type the navigation and route props into our components
export type StackParamList = {
  Welcome: SignUpParams;
  Name: SignUpParams;
  Country: SignUpParams;
  Complete: SignUpParams;
  Password: SignUpParams;
  Temp: undefined;
  TempLoggedIn: undefined;
  FriendFind: undefined;
  GameList: undefined;
  TicTacToe: undefined;
  Chess: undefined;
};

// Create a placeholder stack navigator for now
const welcomeScreens = () => {
  const defaultParams = {
    email: '',
    firstname: '',
    surname: '',
    country_code: '',
    password: '',
    hobbies: [],
  };

  return (
    <>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        initialParams={defaultParams}
      />
      <Stack.Screen
        name="Name"
        component={NameScreen}
        initialParams={defaultParams}
      />
      <Stack.Screen
        name="Country"
        component={CountryScreen}
        initialParams={{country_code: '', password: '', hobbies: []}}
      />
      <Stack.Screen
        name="Password"
        component={PasswordScreen}
        initialParams={{password: '', hobbies: []}}
      />
      <Stack.Screen name="Complete" component={SignUpCompleteScreen} />
    </>
  );
};

const RootStack = (loggedIn: boolean) => {
  return (
    // Display the signup and welcome if the user isn't logged in otherwise normal screens
    <Stack.Navigator screenOptions={{headerShown: true}}>
      {!loggedIn ? (
        <>{welcomeScreens()}</>
      ) : (
          // The video chat screen should be later moved to an appropriate place.
        <>
          {/*<Stack.Screen name="FriendFind" component={FriendFindScreen} />*/}
          <Stack.Screen name="GameList" component={GameList} />
          <Stack.Screen name="TicTacToe" component={TicTacToe} />
          <Stack.Screen name="Chess" component={Chess} />

          <Stack.Screen name="VideoChat" component={VideoChat} />

        </>
      )}
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  const {state, dispatch, actions} = useAuth();

  // Attempt to load a saved token
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const loadKeyFromStore = async () => {
      let token;
      try {
        token = await RNSecureKeyStore.get('orange_user_token');

        if (token !== null) {
          // TODO: Validate the token with the server
          dispatch({type: 'RESTORE_TOKEN', token});
        }
      } catch (e) {
        // Failed to log the user in
      }
    };

    loadKeyFromStore();
  }, []);

  return (
    <AuthContext.Provider value={{token: state.token, ...actions}}>
      <NavigationContainer>
        {RootStack(state.token !== null)}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

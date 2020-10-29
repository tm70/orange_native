// Navigation
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Auth
import { SignUpParams } from './src/api/signup';
import AuthContext, { useAuth } from './src/context/AuthContext';
import RNSecureKeyStore from 'react-native-secure-key-store';

// Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import NameScreen from './src/screens/signup/NameScreen';
import CountryScreen from './src/screens/signup/CountryScreen';
import SignUpCompleteScreen from './src/screens/signup/SignUpCompleteScreen';
import PasswordScreen from './src/screens/signup/PasswordScreen';
import MainScreen from './src/screens/MainScreen';
import FriendFindScreen from './src/screens/FriendFindScreen';
import GameMenu from './src/screens/GameMenu';
import GameRequests from './src/screens/GameRequests';
import GameList from './src/screens/GameList';
import GameInviteFriends from './src/screens/GameInviteFriends';
import Chess from './src/screens/Chess';
import TicTacToe from './src/screens/TicTacToe';
import BioScreen from './src/screens/BioScreen';
import EditBio from './src/screens/EditBio';
import FriendList from './src/screens/FriendList';
import checkToken from './src/api/checkToken';
import LoginScreen from './src/screens/LoginScreen';

// ConnectyCube
import { AuthService } from './src/services';
import AuthScreen from './src/components/AuthScreen';
import VideoScreen from './src/components/VideoScreen';

const Stack = createStackNavigator();

/**
 * Used to type the route and navigation props for react-navigation
 * Basically tells the router what params each screen requests
 */
export type StackParamList = {
    Welcome: SignUpParams;
    Name: SignUpParams;
    Country: SignUpParams;
    Complete: SignUpParams;
    Password: SignUpParams;
    Temp: undefined;
    Login: undefined;
    TempLoggedIn: undefined;
    FriendFind: undefined;
    GameMenu: undefined;
    GameList: undefined;
    GameInviteFriends: { game: string };
    TicTacToe: { game_id: number; opponent_id: number; opponent_name: string };
    Chess: undefined;
    MainScreen: undefined;
    Bio: { id: number };
    EditBio: undefined;
    FriendList: undefined;
    AuthScreen: undefined;
    VideoScreen: undefined;
};

/**
 * Screens that welcome a user and are not blocked behind authentication
 *
 * Things such as login and signup etc
 */
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
            <Stack.Screen name="Welcome" component={WelcomeScreen} initialParams={defaultParams} />
            <Stack.Screen name="Name" component={NameScreen} initialParams={defaultParams} />
            <Stack.Screen
                name="Country"
                component={CountryScreen}
                initialParams={{ country_code: '', password: '', hobbies: [] }}
            />
            <Stack.Screen name="Password" component={PasswordScreen} initialParams={{ password: '', hobbies: [] }} />
            <Stack.Screen name="Complete" component={SignUpCompleteScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </>
    );
};

/**
 * Properties passed to the RootStack components
 *
 * See RoostStack for more information
 */
interface RootStackProps {
    loggedIn: boolean;
}

/**
 * The root navigation stack
 *
 * @param loggedIn Whether or not the user is logged in
 * @constructor
 */
const RootStack: React.FC<RootStackProps> = ({ loggedIn }) => {
    return (
        // Display the signup and welcome if the user isn't logged in otherwise normal screens
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!loggedIn ? (
                <>{welcomeScreens()}</>
            ) : (
                <>
                    {/* <Stack.Screen name="VideoScreenContainer" component={VideoScreenContainer} /> */}
                    <Stack.Screen name="MainScreen" component={MainScreen} />
                    <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ title: 'My app' }} />
                    <Stack.Screen name="VideoScreen" component={VideoScreen} />
                    <Stack.Screen name="FriendFind" component={FriendFindScreen} />
                    <Stack.Screen name="GameMenu" component={GameMenu} />
                    <Stack.Screen name="GameRequests" component={GameRequests} />
                    <Stack.Screen name="GameList" component={GameList} />
                    <Stack.Screen
                        name="GameInviteFriends"
                        component={GameInviteFriends}
                        initialParams={{ game: 'error' }}
                    />
                    <Stack.Screen name="TicTacToe" component={TicTacToe} />
                    <Stack.Screen name="Chess" component={Chess} />
                    <Stack.Screen name="Bio" component={BioScreen} />
                    <Stack.Screen name="EditBio" component={EditBio} />
                    <Stack.Screen name="FriendList" component={FriendList} />
                </>
            )}
        </Stack.Navigator>
    );
};

/**
 * Construct the app itself, define and add all contexts and initialise the authentication systems
 * @constructor
 */
const App: React.FC = () => {
    const { state, dispatch, actions } = useAuth();

    // ConnectyCube Initialise.
    AuthService.init();

    // Attempt to load a saved token
    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const loadKeyFromStore = async () => {
            let token = '';
            let id = -1;
            try {
                token = await RNSecureKeyStore.get('orange_user_token');
                id = parseInt(await RNSecureKeyStore.get('orange_user_id'), 10);

                if (token !== '' && id !== -1) {
                    // Validate the token with the server
                    checkToken(token)
                        .catch(() => {
                            dispatch({ type: 'CLEAR_TOKEN' });
                        })
                        .then(() => {
                            dispatch({ type: 'RESTORE_TOKEN', token, id });
                        });
                }
            } catch (e) {
                // Failed to log the user in
            }
        };

        loadKeyFromStore();
    }, []);

    // Initialise ConnectyCube authentication
    AuthService.init();

    // Return the RootStack wrapped by the authentication providers
    return (
        <AuthContext.Provider value={{ token: state.token, id: state.id, ...actions }}>
            <NavigationContainer>
                <RootStack loggedIn={state.token !== ''} />
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default App;

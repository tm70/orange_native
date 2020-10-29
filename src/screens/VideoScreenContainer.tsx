// import React, {useContext} from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import AuthContext from '../context/AuthContext';
// import ConnectyCube from "react-native-connectycube";
// import {RTCView} from 'react-native-connectycube';
// import {AuthService} from '../services';
// import VideoScreen from '../components/VideoScreen';
// import AuthScreen from '../components/AuthScreen';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';

// //const StackVideoCall = createStackNavigator();

// function RootStackVideoCall() {
//     return (
//       <Stack.Navigator
//         initialRouteName="AuthScreen"
//         screenOptions={{ gestureEnabled: false }}
//       >
//         <Stack.Screen
//           name="AuthScreen"
//           component={AuthScreen}
//           options={{ title: 'My app' }}
//         />
//         <Stack.Screen
//           name="VideoScreen"
//           component={VideoScreen}
//         />
//       </Stack.Navigator>
//     );
//   }

// // Placeholder screen for now
// const VideoScreenContainer: React.FC = () => {

//     // const {token, id: userid} = React.useContext(AuthContext);
//     // loginWithToken(token, userid);

//   return (<NavigationContainer><RootStackVideoCall/></NavigationContainer>)
// };

// const styles = StyleSheet.create({});

// export default VideoScreenContainer;

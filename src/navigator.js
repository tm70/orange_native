import AuthScreen from './components/AuthScreen';
import VideoScreen from './components/VideoScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// const StackNavigator = createStackNavigator(
//   {
//     AuthScreen: {
//       screen: AuthScreen,
//     },
//     VideoScreen: {
//       screen: VideoScreen,
//     },
//   },
//   {
//     initialRouteName: 'AuthScreen',
//     headerMode: 'none',
//   },
// );


function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AuthScreen"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{ title: 'My app' }}
      />
      <Stack.Screen
        name="VideoScreen"
        component={VideoScreen}
      />
    </Stack.Navigator>
  );
}

export default function Navigator() {
  return <NavigationContainer><StackNavigator/></NavigationContainer>;
}

//export default createAppContainer(StackNavigator);

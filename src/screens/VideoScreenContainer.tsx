import React, {useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthContext from '../context/AuthContext';
import ConnectyCube from "react-native-connectycube";
import {RTCView} from 'react-native-connectycube';
import {AuthService} from '../services';
import VideoScreen from '../components/VideoScreen';

// const signInCC = async (userid, token1, sesh_token) => {

//     console.log(userid, token1)  
//     try {
//         let response = await fetch(`https://api.connectycube.com/login?login=${userid}&password=${token1}`, {
//             method: 'POST',
//             headers: {
//                 login: userid,
//                 password: token1,
//                 token: sesh_token
//             }
//             // body: JSON.stringify({
//             //     login: userid,
//             //     password: token1,
//             //     token: sesh_token
//             // })
//         });
//         let json = await response.json();
//         console.log("Response is: ");
//         console.log(json);
//         return response;
//     } catch (error) {
//         console.error(error)
//     }
// }


const loginWithToken = (token: string, userid: number) => {
  const _onSuccessLogin = () => {
    // const {navigation} = this.props;
    // const opponentsIds = users
    //   .filter(opponent => opponent.id !== currentUser.id)
    //   .map(opponent => opponent.id);

    // navigation.push('VideoScreen', {opponentsIds});
    console.log("Auth Service login succesful.")
  };

  const _onFailLogin = (error = {}) => {
    console.log(`Error.\n\n${JSON.stringify(error)}`);
  };

  // this.setIsLogging(true);

  AuthService.loginWithToken(token, userid)
    .then(() => console.log("authenticating connectycube..."))
    .then(_onSuccessLogin)
    .catch(_onFailLogin)
    .then(() => console.log("authentication tried!"));
};

// Placeholder screen for now
const VideoScreenContainer: React.FC = () => {

    const {token, id: userid} = React.useContext(AuthContext);
    loginWithToken(token, userid);

    return(<View>

            {/* <Text>How are you today?</Text> */}
            <VideoScreen></VideoScreen>
        </View>)
};

const styles = StyleSheet.create({});

export default VideoScreenContainer;

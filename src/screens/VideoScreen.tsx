import React, {useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthContext from '../context/AuthContext';
import ConnectyCube from "react-native-connectycube";
import {RTCView} from 'react-native-connectycube';


const signInCC = async (userid, token1, sesh_token) => {

    console.log(userid, token1)
    
    try {
        let response = await fetch(`https://api.connectycube.com/login?login=${userid}&password=${token1}`, {
            method: 'POST',
            headers: {
                login: userid,
                password: token1,
                token: sesh_token
            }
            // body: JSON.stringify({
            //     login: userid,
            //     password: token1,
            //     token: sesh_token
            // })
        });
        let json = await response.json();
        console.log(json)
    } catch (error) {
        console.error(error)
    }
    
}

const createVideoChatSession = async() => {
    const calleesIds = [2108104]; // User's ids
    const sessionType = ConnectyCube.videochat.CallType.VIDEO; // AUDIO is also possible
    const additionalOptions = {};
    
    const session = ConnectyCube.videochat.createNewSession(calleesIds, sessionType, additionalOptions);
      
    const mediaParams = {
        audio: true,
        video: true,
        options: {
          muted: true,
          mirror: true,
        },
      };
      
      // JS SDK v2+
    return session
        .getUserMedia(mediaParams)
        .then((localStream) => {
            return localStream
            })
        .catch((error) => {});
}

// Placeholder screen for now
const VideoScreen: React.FC = () => {

    const {token, id: userid} = useContext(AuthContext);
    const APP_CREDENTIALS = {
        appId: 3367,
        authKey: "44He7gb23uTxg2b",
        authSecret: "36A4gRn2uSydAjR"
      };
      const CONFIG = {
        debug: { mode: 1 } // enable DEBUG mode (mode 0 is logs off, mode 1 -> console.log())
      };
      ConnectyCube.init(APP_CREDENTIALS, CONFIG);

    ConnectyCube.createSession()
    .then((session) => {signInCC(userid, token, session.token)})
    .catch((error) => {});
    
      // get current ConnectyCube session token and set as user's password
    
    
    // const url = `https://api.connectycube.com/login`;
    
    // const userCredentials = {
    //     userId: 2108098,
    //     password: "password",
    //   };
      
            
    // JS SDK v2+
    // localStream =  ConnectyCube.chat
    //                 .connect(userCredentials)
    //                 .then(() => {
    //                 // connected
    //                 const isConnected = ConnectyCube.chat.isConnected;
    //                 console.log("################")
    //                 console.log(isConnected);
    //                 localStream = createVideoChatSession()
    //                 return localStream
    //                 })
    //                 .catch((error) => {});

    // const tokenConnectyCube = ConnectyCube.service.sdkInstance.session.token;
    // console.log(tokenConnectyCube)
    // const userCredentials = {
    //     userId: 4448514,
    //     password: tokenConnectyCube
    // };

    return(<View>
            <Text>How are you today?</Text>
        </View>)

    // if (localStream) {                
    // return (
    //     <View>
    //         <Text>How are you today?</Text>
    //         <RTCView  objectFit="cover" style={styles.rtcView} key={2108098} streamURL={localStream.toURL()} />
    //     </View>
    // );
    // }
};

const styles = StyleSheet.create({});

export default VideoScreen;

// import React from 'react';
// import {StyleSheet, Text, View} from 'react-native';
//
// // Placeholder screen for now
// const VideoChat: React.FC = () => {
//     return (
//         <View>
//             <Text>Placeholder</Text>
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({});
//
// export default VideoChat;

// This code is from the video chat example:

import React, { Component } from 'react';
import {View, SafeAreaView, Button, StyleSheet} from 'react-native';
import Navigator from '../../src/navigator';
import {AuthService} from '../../src/services';

// @ts-ignore
import ConnectyCube from 'react-native-connectycube';

// @ts-ignore
import {RTCPeerConnection, RTCView, mediaDevices} from 'react-native-webrtc';

export default class VideoChatApp extends Component{
    constructor(props) {
        super(props);
    
        AuthService.init();
      }
    
      render = () => <Navigator />;
}

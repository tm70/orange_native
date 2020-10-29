import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { StackParamList } from '../../App';
import fontScaler from '../util/fontScaler';
import ProfileButton from '../components/ProfileIcon';
import getFriends from '../hooks/getFriends';
import sendGameRequest from '../api/sendGameRequest';
import ArrowButton, { Direction } from '../components/ArrowButton';
import AuthContext from '../context/AuthContext';

// To get the navigation prop typed
type GameInviteFriendsNavigationProp = StackNavigationProp<StackParamList, 'GameInviteFriends'>;
type GameInviteFriendsRouteProp = RouteProp<StackParamList, 'GameInviteFriends'>;
type Props = {
    navigation: GameInviteFriendsNavigationProp;
    route: GameInviteFriendsRouteProp;
};

/**
 * Screen for sending game requests to friends. The game for which to send requests for
 * should be passed to the route.
 * @constructor
 */
const GameInviteFriends: React.FC<Props> = ({ navigation, route }) => {
    const game = route.params.game;
    const { token, id: userid } = useContext(AuthContext);

    const [searchAPI, friends, errorMessage] = getFriends();

    const renderItem = ({ item }) => {
        return (
            <ProfileButton
                text={item.firstname + ' ' + item.surname}
                onPress={() => {
                    sendGameRequest(userid, item.id, game, token);
                    Alert.alert('Request Sent!');
                }}
                image_url={item.image_url}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Invite Friend</Text>

                style={styles.list}
                data={friends}
                renderItem={renderItem}
                numColumns={3}
                keyExtractor={(item, index) => item.id}
            />

            <ArrowButton
                text="Game Requests"
                color="#94d361"
                direction={Direction.Right}
                onPress={() => navigation.navigate('GameRequests')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '2%',
        paddingBottom: '10%',
        fontWeight: 'bold',
    },
    header: {
        fontSize: fontScaler(25),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: '10%',
        marginTop: '5%',
        marginBottom: '5%',
    },
    list: {
        width: '100%',
    },
    item: {
        padding: '2%',
        marginVertical: '1%',
        backgroundColor: 'white',
        marginHorizontal: '5%',
        flex: 1 / 3,
        maxWidth: '23.5%',
    },
    tile: {
        aspectRatio: 1,
    },
    title: {
        fontSize: fontScaler(10),
        textAlign: 'center',
    },
});

export default GameInviteFriends;

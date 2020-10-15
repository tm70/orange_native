import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Alert} from 'react-native';
import getGames from "../api/getGames";
import useGetGames from "../hooks/useGetGames";
import cancelGameRequest from "../api/cancelGameRequest";
import respondGameRequest from "../api/respondGameRequest";
import AuthContext from '../context/AuthContext';
import fontScaler from "../util/fontScaler";

type GameRequestsNavigationProp = StackNavigationProp<StackParamList, 'GameRequests'>
type Props = { navigation: GameRequestsNavigationProp };

const states = {
    "Finished": "Finished",
    "Cancelled": "Cancelled",
    "InProgress": "Game in Progress",
    "RequestSent": "Request Sent",
    "RequestReceived": "Accept Request?",
}

const Item = ({ game, oppname, status, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text>{game} with {oppname}</Text>
        <Text>{states[status]}</Text>
    </TouchableOpacity>
);

const GameRequests: React.FC = () => {
    const {token, id: userid} = React.useContext(AuthContext);
    
    const [searchAPI, games, errorMessage] = useGetGames(userid);
    
    const renderItem = ({ item }) => {
        if (item.status == "Finished" || item.status == "Cancelled") {
            return null
        } else {
            var onPress = null;
            
            if (item.status == "InProgress") {
                // in progress -> go to game
                onPress = null;
            } else if (item.status == "RequestSent") {
                // requestsent -> prompt to cancel game
                onPress = () => Alert.alert(
                        "Cancel Request?",
                        "Would you like to cancel this game request?",
                        [
                            {
                                text: "Yes",
                                onPress: () => cancelGameRequest(userid, item.id, token),
                            },
                            {
                                text: "No",
                                onPress: null,
                            },
                        ]
                    );
            } else if (item.status == "RequestReceived") {
                // requestreceived -> prompt to accept or decline request
                onPress = () => Alert.alert(
                        "Respond to Request?",
                        "How would you like to respond to this game request?",
                        [
                            {
                                text: "Accept",
                                onPress: () => respondGameRequest(userid, "Accept", item.id, token),
                            },
                            {
                                text: "Decline",
                                onPress: () => respondGameRequest(userid, "Decline", item.id, token),
                            },
                            {
                                text: "Back",
                                onPress: null,
                            },
                        ]
                    );
            }
            
            return <Item
                    game={item.game_type}
                    oppname={item.opponent_name}
                    status={item.status}
                    onPress={onPress}
                />
        }
    };
    
    return (
        <View>
            <FlatList
                data={games}
                renderItem={renderItem}
                keyExtractor={({ id }, _index) => id.toString()}
                numColumns={1}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loadtext: {
        fontSize: fontScaler(25),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: '10%',
        marginTop: '5%',
        marginBottom: '5%',
    },
    item: {
        padding: '2%',
        marginVertical: '2%',
        backgroundColor: '#3498DB',
        marginHorizontal: '5%',
        flex: 1,
    },
});

export default GameRequests;

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import getGames from "../api/getGames";
import useGetGames from "../hooks/useGetGames";
import cancelGameRequest from "../api/cancelGameRequest";
import respondGameRequest from "../api/respondGameRequest";
import AuthContext from '../context/AuthContext';
import fontScaler from "../util/fontScaler";

type GameRequestsNavigationProp = StackNavigationProp<StackParamList, 'GameRequests'>
type GameRequestsRouteProp = RouteProp<StackParamList, 'GameRequests'>
type Props = { navigation: GameRequestsNavigationProp; route: GameRequestsRouteProp; };

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

const GameRequests: React.FC<Props> = ({navigation, route}) => {
    const {token, id: userid} = React.useContext(AuthContext);
    const [r, rerender] = React.useState(false);
    
    // refresh on focus, for navigating back to this page
    const [refresh, setRefresh] = React.useState(false);
    useEffect(() => {
        console.log("refresh");
    }, [refresh]);
    navigation.addListener('focus', () => {
        setRefresh(!refresh);
    });
    
    const [searchAPI, games, bios, errorMessage] = useGetGames();
    
    const renderItem = ({ item }) => {
        if (item.status == "Finished" || item.status == "Cancelled") {
            return null
        } else {
            var onPress = null;
            
            if (item.status == "InProgress") {
                // in progress -> go to game
                onPress = () => navigation.navigate(item.game_type,
                    {
                        game_id: item.id,
                        opponent_id: item.opponent_id,
                        opponent_name: item.opponent_name,
                    });
            } else if (item.status == "RequestSent") {
                // requestsent -> prompt to cancel game
                onPress = () => Alert.alert(
                        "Cancel Request?",
                        "Would you like to cancel this game request?",
                        [
                            {
                                text: "Yes",
                                onPress: () => { cancelGameRequest(userid, item.id, token); item.status = "Cancelled"; rerender(!r); },
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
                                onPress: () => { respondGameRequest(userid, item.id, "Accept", token); item.status = "InProgress"; rerender(!r); },
                            },
                            {
                                text: "Decline",
                                onPress: () => { respondGameRequest(userid, item.id, "Decline", token); item.status = "Cancelled"; rerender(!r); },
                            },
                        ]
                    );
            }
            
            return (
                <Item
                    game={item.game_type}
                    oppname={(bios[item.opponent_id]).firstname}
                    status={item.status}
                    onPress={onPress}
                />
            );
        }
    };
    
    if (games.length == 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadtext}>Loading</Text>
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <Text style={styles.header}>Game Requests</Text>
                    </>
                }
                data={games}
                renderItem={renderItem}
                keyExtractor={({ id }, _index) => id.toString()}
                numColumns={1}
                extraData={r}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        marginHorizontal: 8,
        justifyContent: 'center',
        paddingBottom: "10%",
        flex: 1,
    },
    header: {
        fontSize: fontScaler(25),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: '10%',
        marginTop: '5%',
        marginBottom: '5%',
    },
    loadtext: {
        fontSize: fontScaler(25),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: '10%',
        marginTop: '5%',
        marginBottom: '15%',
    },
    item: {
        padding: '2%',
        marginVertical: '2%',
        backgroundColor: '#3498DB',
        marginHorizontal: '2%',
        flex: 1,
    },
});

export default GameRequests;

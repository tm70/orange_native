import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import getGames from "../api/getGames";
import useGetGames from "../hooks/useGetGames";
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

const Item = ({ game, oppid, oppname, status, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text>{game} with {oppname}</Text>
        <Text>{states[status]}</Text>
    </TouchableOpacity>
);

const GameRequests: React.FC = () => {
    const {token, id} = React.useContext(AuthContext);
    
    const [searchAPI, games, errorMessage] = useGetGames(id);
    
    const renderItem = ({ item }) => {
        if (item.status == "Finished" || item.status == "Cancelled") {
            return null
        } else {
            return <Item
                    game={item.game_type}
                    oppid={item.opponent_id}
                    oppname={item.opponent_name}
                    status={item.status}
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

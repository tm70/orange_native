import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import getGames from "../api/getGames";
import AuthContext from '../context/AuthContext';
import fontScaler from "../util/fontScaler";

type GameRequestsNavigationProp = StackNavigationProp<StackParamList, 'GameRequests'>
type Props = { navigation: GameRequestsNavigationProp };

const Item = ({ oppid, game, status, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text>{game} with {oppid}</Text>
        <Text>{status}</Text>
    </TouchableOpacity>
);

const GameRequests: React.FC = () => {
    const [games, setGames] = useState(null)
    const {token, id} = React.useContext(AuthContext);
    
    const renderItem = ({ item }) => (
        <Item oppid={item.opponent_id} game={item.game_type} status={item.status}/>
    );
    
    useEffect(() => {
        const b = getGames(id, token).catch(console.log).then(setGames);
    }, []);
    if (games === null) {
        return <Text style={styles.loadtext}>Loading</Text>;
    }
    
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
});

export default GameRequests;

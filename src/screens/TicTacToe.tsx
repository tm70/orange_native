import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackParamList} from '../../App';
import fontScaler from '../util/fontScaler';

type TicTacToeNavigationProp = StackNavigationProp<StackParamList, 'TicTacToe'>
type TicTacToeRouteProp = RouteProp<StackParamList, 'TicTacToe'>
type Props = { navigation: GameRequestsNavigationProp; route: GameRequestsRouteProp; };

const DATA = [
    { key: '1', },
    { key: '2', },
    { key: '3', },
    { key: '4', },
    { key: '5', },
    { key: '6', },
    { key: '7', },
    { key: '8', },
    { key: '9', },
];

const Item = ({}) => <TouchableOpacity style={styles.item} />;

const TicTacToe: React.FC<Props> = ({navigation, route}) => {
    const {game_id, opponent_id, opponent_name} = route.params;
    
    const renderItem = () => <Item />;
    
    return (
        <View style={styles.container}>
            <FlatList data={DATA} renderItem={renderItem} numColumns={3} />

            <Text style={styles.turntext}>Your Turn!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        marginHorizontal: 8,
        fontWeight: 'bold',
    },
    item: {
        flex: 1,
        padding: 10,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
    },
    turntext: {
        marginTop: 30,
        fontSize: fontScaler(20),
        textAlign: 'center',
    },
});

export default TicTacToe;

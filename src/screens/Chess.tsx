import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackParamList} from '../../App';
import fontScaler from '../util/fontScaler';

type TicTacToeNavigationProp = StackNavigationProp<StackParamList, 'TicTacToe'>;
type TicTacToeRouteProp = RouteProp<StackParamList, 'TicTacToe'>;
type Props = { navigation: GameRequestsNavigationProp; route: GameRequestsRouteProp };

// probably a nicer way to do it
const DATA = [
    { key: 'A8', row: 8, column: 1 },
    { key: 'B8', row: 8, column: 2 },
    { key: 'C8', row: 8, column: 3 },
    { key: 'D8', row: 8, column: 4 },
    { key: 'E8', row: 8, column: 5 },
    { key: 'F8', row: 8, column: 6 },
    { key: 'G8', row: 8, column: 7 },
    { key: 'H8', row: 8, column: 8 },
    { key: 'A7', row: 7, column: 1 },
    { key: 'B7', row: 7, column: 2 },
    { key: 'C7', row: 7, column: 3 },
    { key: 'D7', row: 7, column: 4 },
    { key: 'E7', row: 7, column: 5 },
    { key: 'F7', row: 7, column: 6 },
    { key: 'G7', row: 7, column: 7 },
    { key: 'H7', row: 7, column: 8 },
    { key: 'A6', row: 6, column: 1 },
    { key: 'B6', row: 6, column: 2 },
    { key: 'C6', row: 6, column: 3 },
    { key: 'D6', row: 6, column: 4 },
    { key: 'E6', row: 6, column: 5 },
    { key: 'F6', row: 6, column: 6 },
    { key: 'G6', row: 6, column: 7 },
    { key: 'H6', row: 6, column: 8 },
    { key: 'A5', row: 5, column: 1 },
    { key: 'B5', row: 5, column: 2 },
    { key: 'C5', row: 5, column: 3 },
    { key: 'D5', row: 5, column: 4 },
    { key: 'E5', row: 5, column: 5 },
    { key: 'F5', row: 5, column: 6 },
    { key: 'G5', row: 5, column: 7 },
    { key: 'H5', row: 5, column: 8 },
    { key: 'A4', row: 4, column: 1 },
    { key: 'B4', row: 4, column: 2 },
    { key: 'C4', row: 4, column: 3 },
    { key: 'D4', row: 4, column: 4 },
    { key: 'E4', row: 4, column: 5 },
    { key: 'F4', row: 4, column: 6 },
    { key: 'G4', row: 4, column: 7 },
    { key: 'H4', row: 4, column: 8 },
    { key: 'A3', row: 3, column: 1 },
    { key: 'B3', row: 3, column: 2 },
    { key: 'C3', row: 3, column: 3 },
    { key: 'D3', row: 3, column: 4 },
    { key: 'E3', row: 3, column: 5 },
    { key: 'F3', row: 3, column: 6 },
    { key: 'G3', row: 3, column: 7 },
    { key: 'H3', row: 3, column: 8 },
    { key: 'A2', row: 2, column: 1 },
    { key: 'B2', row: 2, column: 2 },
    { key: 'C2', row: 2, column: 3 },
    { key: 'D2', row: 2, column: 4 },
    { key: 'E2', row: 2, column: 5 },
    { key: 'F2', row: 2, column: 6 },
    { key: 'G2', row: 2, column: 7 },
    { key: 'H2', row: 2, column: 8 },
    { key: 'A1', row: 1, column: 1 },
    { key: 'B1', row: 1, column: 2 },
    { key: 'C1', row: 1, column: 3 },
    { key: 'D1', row: 1, column: 4 },
    { key: 'E1', row: 1, column: 5 },
    { key: 'F1', row: 1, column: 6 },
    { key: 'G1', row: 1, column: 7 },
    { key: 'H1', row: 1, column: 8 },
];

// probably want to make the controls for this one drag and drop rather than tap
const Item = ({ row, column, t }) => (
    <TouchableOpacity style={(row + column) % 2 == 0 ? styles.blacktile : styles.whitetile}>
        <Text>{t}</Text>
    </TouchableOpacity>
);

const Chess: React.FC<Props> = ({ navigation, route }) => {
    const { game_id, opponent_id, opponent_name } = route.params;

    const renderItem = ({ item }) => <Item row={item.row} column={item.column} t={item.key} />;

    return (
        <View style={styles.container}>
            <FlatList
                //inverted // invert if player is black
                data={DATA}
                renderItem={renderItem}
                numColumns={8}
            />

            <Text style={styles.turntext}>Your Turn!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginHorizontal: 8,
        fontWeight: 'bold',
    },
    blacktile: {
        backgroundColor: '#663300',
        flex: 1,
        padding: 10,
        aspectRatio: 1,
        justifyContent: 'center',
    },
    whitetile: {
        backgroundColor: '#CC9900',
        flex: 1,
        padding: 10,
        aspectRatio: 1,
        justifyContent: 'center',
    },
    turntext: {
        marginTop: 30,
        fontSize: fontScaler(20),
        textAlign: 'center',
    },
});

export default Chess;

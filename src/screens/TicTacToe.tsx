import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import fontScaler from '../util/fontScaler';

const DATA = [
    {
        key: '1',
    },
    {
        key: '2',
    },
    {
        key: '3',
    },
    {
        key: '4',
    },
    {
        key: '5',
    },
    {
        key: '6',
    },
    {
        key: '7',
    },
    {
        key: '8',
    },
    {
        key: '9',
    },
];

const Item = ({}) => <TouchableOpacity style={styles.item} />;

const TicTacToe: React.FC = () => {
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

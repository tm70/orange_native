import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { StackParamList } from '../../App';
import MenuButton from '../components/MenuButton';
import fontScaler from '../util/fontScaler';

// To get the navigation prop typed
type GameListNavigationProp = StackNavigationProp<StackParamList, 'GameList'>;
type Props = { navigation: GameListNavigationProp };

// Games to be listed
// 'title' is the name to be displayed on its button
// 'game' is the screen to navigate to when the button is pressed
// 'icon' is the image source for the background image on its button
const DATA = [
    {
        title: 'Tic Tac Toe',
        game: 'TicTacToe',
        icon: require('../../assets/tictactoeicon.png'),
    },
    {
        title: 'Chess',
        game: 'Chess',
        icon: require('../../assets/chessicon.png'),
    },
];

/**
 * Screen listing all the games, navigating to sending new invites for them
 * @constructor
 */
const GameList: React.FC<Props> = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <MenuButton
            title={item.title}
            onPress={() => navigation.navigate('GameInviteFriends', { game: item.game })}
            icon={item.icon}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <Text style={styles.header}>Games</Text>
                    </>
                }
                data={DATA}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={(item, index) => item.game}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        marginHorizontal: 8,
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
});

export default GameList;

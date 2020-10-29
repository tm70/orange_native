import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { StackParamList } from '../../App';
import { RouteProp } from '@react-navigation/native';
import MenuButton from '../components/MenuButton';
import fontScaler from '../util/fontScaler';

type GameMenuNavigationProp = StackNavigationProp<StackParamList, 'GameMenu'>;
type GameMenuRouteProp = RouteProp<StackParamList, 'GameMenu'>;
type Props = { navigation: GameMenuNavigationProp; route: GameMenuRouteProp };

const DATA = [
    {
        key: 'newgame',
        title: 'New game',
        screen: 'GameList',
        icon: require('../../assets/newgameicon.png'),
    },
    {
        key: 'existinggames',
        title: 'Current games and requests',
        screen: 'GameRequests',
        icon: require('../../assets/existinggamesicon.png'),
    },
];

/**
 * Screen for picking between starting a new game (GameList to send new invites) or
 * viewing existing games/requests (GameRequests).
 * @constructor
 */
const GameMenu: React.FC<Props> = ({ navigation, route }) => {
    const renderItem = ({ item }) => (
        <MenuButton
            title={item.title}
            onPress={() => navigation.navigate(item.screen)}
            icon={item.icon}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                ListHeaderComponent={
                    <>
                        <Text style={styles.header}>Start a new game?</Text>
                    </>
                }
                data={DATA}
                renderItem={renderItem}
                numColumns={2}
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
        paddingBottom: '20%',
        fontWeight: 'bold',
    },
    list: {
        width: '100%',
        flexGrow: 0,
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

export default GameMenu;

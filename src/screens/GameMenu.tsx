import React from 'react'
import {StyleSheet, Text, ImageBackground, ScrollView, View, FlatList, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {StackParamList} from "../../App";
import {RouteProp} from "@react-navigation/native";
import fontScaler from "../util/fontScaler";

type GameMenuNavigationProp = StackNavigationProp<StackParamList, 'GameMenu'>
type GameMenuRouteProp = RouteProp<StackParamList, 'GameMenu'>
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
        screen: '',
        icon: require('../../assets/existinggamesicon.png'),
    },
];

const Item = ({ title, onPress, icon }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <ImageBackground source={icon} style={{}}>
            <View style={styles.tile}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </ImageBackground>
    </TouchableOpacity>
);

const GameMenu: React.FC<Props> = ({navigation, route}) => {
    const renderItem = ({ item }) => (
        <Item
            title={item.title}
            onPress={() => navigation.navigate(item.screen)}
            icon={item.icon}
        />
    );
    
    return (
        <View style={styles.container}>
            <FlatList style={styles.list}
                ListHeaderComponent={<>
                    <Text style={styles.header}>Start a new game?</Text>
                </>}
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
        flexGrow:0,
    },
    header: {
        fontSize: fontScaler(25),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: '10%',
        marginTop: '5%',
        marginBottom: '5%',
    },
    item: {
        backgroundColor: '#3498DB',
        flex: 1,
        padding: '2%',
        marginVertical: '2%',
        marginHorizontal: '2%',
    },
    tile: {
        flex: 1,
        justifyContent: 'flex-end',
        aspectRatio: 1,
    },
    title: {
        color: 'white',
        fontSize: fontScaler(16),
        textAlign: 'center',
    },
});

export default GameMenu;

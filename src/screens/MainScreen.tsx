import React, { useEffect, useState } from 'react';
import {
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { StackParamList } from '../../App';
import { RouteProp } from '@react-navigation/native';
import fontScaler from '../util/fontScaler';
import AuthContext from '../context/AuthContext';
import getBio from '../api/getBio';

type MainScreenNavigationProp = StackNavigationProp<
    StackParamList,
    'MainScreen'
>;
type MainScreenRouteProp = RouteProp<StackParamList, 'MainScreen'>;
type Props = {
    navigation: MainScreenNavigationProp;
    route: MainScreenRouteProp;
};

const DATA = [
    {
        key: 'friends',
        title: 'View friends list',
        screen: 'FriendList',
        icon: require('../../assets/friendslisticon.png'),
    },
    {
        key: 'friendfind',
        title: 'Make new friends',
        screen: 'FriendFind',
        icon: require('../../assets/friendfindicon.png'),
    },
    {
        key: 'games',
        title: 'Play Games',
        screen: 'GameMenu',
        icon: require('../../assets/gameslisticon.png'),
    },
    {
        key: 'profile',
        title: 'Edit my Details',
        screen: 'EditBio',
        icon: require('../../assets/profileicon.png'),
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

const Main: React.FC<Props> = ({ route, navigation }) => {
    const { id, token } = React.useContext(AuthContext);
    const [bio, setBio] = useState("")
    useEffect(() => {
        getBio(id, token).catch(console.log).then(setBio);
    }, []);

    const renderItem = ({ item }) => (
        <Item
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
                        <Text style={styles.header}>
                            Hello {bio.firstname}, what would you like to do?
                        </Text>
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
        paddingBottom: '5%',
        fontWeight: 'bold',
    },
    list: {
        flexGrow: 0,
        width: '100%',
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

export default Main;
